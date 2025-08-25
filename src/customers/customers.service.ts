import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { UpdateCustomerDto } from './dto/updateCustomer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepository: Repository<Customer>
  ) {}

  async createCustomer(newCustomer: CreateCustomerDto) {
    return await this.customerRepository.save(newCustomer)
  }

  async getOneCustomer(id: number) {
    const customer = await this.customerRepository.findOne({
      where: {
        id
      }
    })

    if (!customer) throw new NotFoundException("Customer Not Found")
    
    return customer
  }

  async getAllCustomers() {
    return await this.customerRepository.find()
  }

  async updateCustomer(id: number, customerDetails: UpdateCustomerDto) {

    const customerToUpdate = await this.customerRepository.findOne({
      where: {
        id
      }
    })

    if (!customerToUpdate) throw new NotFoundException("Customer Not Found")

    return this.customerRepository.update(id, customerDetails)
  }

  async deleteCustomer(id: number) {

    const customerToDelete = await this.customerRepository.findOne({
      where: {
        id
      }
    })

    if (!customerToDelete) throw new NotFoundException("Customer Not Found")
    
    return await this.customerRepository.delete({
      id
    })

  }

}
