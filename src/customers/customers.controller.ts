import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/createCustomer.dto';

@Controller('customers')
export class CustomersController {
  
  constructor(private customerService: CustomersService) {}

  @Post()
  createCustomer(@Body() newCustomer: CreateCustomerDto) {
    return this.customerService.createCustomer(newCustomer)
  }

  @Get(':id')
  getOneCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.getOneCustomer(id)
  }

  @Get()
  getAllCustomers() {
    return this.customerService.getAllCustomers()
  }

}
