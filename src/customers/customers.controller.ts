import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { UpdateCustomerDto } from './dto/updateCustomer.dto';

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

  @Patch(':id')
  updateCustomer(@Param('id', ParseIntPipe) id: number, @Body() customerDetails: UpdateCustomerDto) {
    return this.customerService.updateCustomer(id, customerDetails)
  }

  @Delete(':id')
  deleteCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.deleteCustomer(id)
  }
}
