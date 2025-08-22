import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/createCustomer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepository: Repository<Customer>
  ) {}

  async createCustomer(newCustomer: CreateCustomerDto) {
    return await this.customerRepository.save(newCustomer)
  }

}
