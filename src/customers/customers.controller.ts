import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { UpdateCustomerDto } from './dto/updateCustomer.dto';
import { PaginationDto } from 'src/shared/pagination/pagination.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/shared/decorators/role.decorator';
import { Role } from 'src/entities/user.entity';

@Controller('customers')
export class CustomersController {
  
  constructor(private customerService: CustomersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createCustomer(@Body() newCustomer: CreateCustomerDto) {
    return this.customerService.createCustomer(newCustomer)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOneCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.getOneCustomer(id)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllCustomers(@Query() pagination: PaginationDto) {
    return this.customerService.getAllCustomers(pagination)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateCustomer(@Param('id', ParseIntPipe) id: number, @Body() customerDetails: UpdateCustomerDto) {
    return this.customerService.updateCustomer(id, customerDetails)
  }

  @Roles(Role.ADMIN, Role.SALESMANAGER) 
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  deleteCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.deleteCustomer(id)
  }
}
