import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerInteraction, InteractionType } from 'src/entities/interaction.entity';
import { Repository } from 'typeorm';
import { addCustomerInteractionDto } from './dto/add-custmer-interaction.dto';
import { Customer } from 'src/entities/customer.entity';
import { User } from 'src/entities/user.entity';

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


}
