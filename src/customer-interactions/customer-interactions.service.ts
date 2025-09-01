import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerInteraction, InteractionType } from 'src/entities/interaction.entity';
import { Repository } from 'typeorm';
import { addCustomerInteractionDto } from './dto/add-custmer-interaction.dto';
import { Customer } from 'src/entities/customer.entity';
import { User } from 'src/entities/user.entity';
import { PaginationDto } from 'src/shared/pagination/pagination.dto';

@Injectable()
export class CustomerInteractionsService {
  constructor(
    @InjectRepository(CustomerInteraction) private customerInteractionRepository: Repository<CustomerInteraction>,
    @InjectRepository(Customer) private customerRepository: Repository<Customer>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async addCustomerInteraction(interactions: addCustomerInteractionDto, salesRepId: string) {
    const [customer, salesRep] = await Promise.all([
      this.customerRepository.findOne({ where: { id: interactions.customerId } }),
      this.userRepository.findOne({ where: { id: salesRepId } })
    ]);
    
    if (!customer) throw new NotFoundException("Customer Not Found");
    if (!salesRep) throw new NotFoundException("Something went wrong: User Not Found");
    
    const interactionPayload = {
      customer,
      salesRep,
      subject: interactions.subject,
      note: interactions.note,
      interactionType: interactions.interactionType
    };
    
    return await this.customerInteractionRepository.save(interactionPayload);
  }

  async getAllCustomerInteractions(pagination: PaginationDto) {
    const { offset = 0, limit = 10 } = pagination;
    
    const [interactions, total] = await this.customerInteractionRepository.findAndCount({
      relations: ['customer', 'salesRep'],
      skip: offset,
      take: limit,
      order: { createdAt: 'DESC' }
    });
    
    return {
      interactions,
      total,
      offset,
      limit
    };
  }

  async getOneCustomerInteraction(id: number) {
    const interaction = await this.customerInteractionRepository.findOne({
      where: { id },
      relations: ['customer', 'salesRep']
    });
    
    if (!interaction) throw new NotFoundException("Customer Interaction Not Found");
    
    return interaction;
  }

  async updateCustomerInteraction(id: number, updateData: Partial<addCustomerInteractionDto>) {
    const interaction = await this.customerInteractionRepository.findOne({
      where: { id },
      relations: ['customer']
    });
    
    if (!interaction) throw new NotFoundException("Customer Interaction Not Found");
    
    if (updateData.customerId) {
      const customer = await this.customerRepository.findOne({ where: { id: updateData.customerId } });
      if (!customer) throw new NotFoundException("Customer Not Found");
      interaction.customer = customer;
    }
    
    if (updateData.subject) interaction.subject = updateData.subject;
    if (updateData.note) interaction.note = updateData.note;
    if (updateData.interactionType) interaction.interactionType = updateData.interactionType;
    
    return await this.customerInteractionRepository.save(interaction);
  }

  async deleteCustomerInteraction(id: number) {
    const interaction = await this.customerInteractionRepository.findOne({ where: { id } });
    
    if (!interaction) throw new NotFoundException("Customer Interaction Not Found");
    
    await this.customerInteractionRepository.remove(interaction);
    
    return { message: "Customer Interaction deleted successfully" };
  }

  async getCustomerInteractions(customerId: number, pagination: PaginationDto) {
    const { offset = 0, limit = 10 } = pagination;
    
    const [interactions, total] = await this.customerInteractionRepository.findAndCount({
      where: { customer: { id: customerId } },
      relations: ['customer', 'salesRep'],
      skip: offset,
      take: limit,
      order: { createdAt: 'DESC' }
    });
    
    return {
      interactions,
      total,
      offset,
      limit
    };
  }

  async getStatistics() {
    const [totalInteractions, totalCustomers, totalUsers] = await Promise.all([
      this.customerInteractionRepository.count(),
      this.customerRepository.count(),
      this.userRepository.count()
    ]);

    // Get interactions by type
    const interactionsByType = await this.customerInteractionRepository
      .createQueryBuilder('interaction')
      .select('interaction.interactionType', 'type')
      .addSelect('COUNT(*)', 'count')
      .groupBy('interaction.interactionType')
      .getRawMany();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentInteractions = await this.customerInteractionRepository
      .createQueryBuilder('interaction')
      .where('interaction.createdAt >= :sevenDaysAgo', { sevenDaysAgo })
      .getCount();

    return {
      totalInteractions,
      totalCustomers,
      totalUsers,
      interactionsByType,
      recentInteractions,
      lastUpdated: new Date()
    };
  }
}
