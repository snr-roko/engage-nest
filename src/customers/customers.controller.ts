import { Body, Controller, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/createCustomer.dto';

@Controller('customers')
export class CustomersController {
  
  constructor(private customerService: CustomersService) {}

  @Post()
  createCustomer(@Body() newCustomer: CreateCustomerDto) {
    return this.customerService.createCustomer(newCustomer)
  }
}
