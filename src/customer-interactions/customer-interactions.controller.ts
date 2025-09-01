import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CustomerInteractionsService } from './customer-interactions.service';
import { addCustomerInteractionDto } from './dto/add-custmer-interaction.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/shared/decorators/role.decorator';
import { Role } from 'src/entities/user.entity';
import { PaginationDto } from 'src/shared/pagination/pagination.dto';

@ApiTags('Customer Interactions')
@ApiBearerAuth('JWT-auth')
@Controller('customer-interactions')
export class CustomerInteractionsController {
  
  constructor(private customerInteractionsService: CustomerInteractionsService) {}

  @ApiOperation({ summary: 'Add new customer interaction' })
  @ApiResponse({ status: 201, description: 'Customer interaction created successfully' })
  @UseGuards(JwtAuthGuard)
  @Post()
  addCustomerInteraction(@Body() interaction: addCustomerInteractionDto, @Req() request) {
    return this.customerInteractionsService.addCustomerInteraction(interaction, request.user.id);
  }

  @ApiOperation({ summary: 'Get all customer interactions' })
  @ApiResponse({ status: 200, description: 'Customer interactions retrieved successfully' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllCustomerInteractions(@Query() pagination: PaginationDto) {
    return this.customerInteractionsService.getAllCustomerInteractions(pagination);
  }

  @ApiOperation({ summary: 'Get interactions for a specific customer' })
  @ApiResponse({ status: 200, description: 'Customer interactions retrieved successfully' })
  @UseGuards(JwtAuthGuard)
  @Get('customer/:customerId')
  getCustomerInteractions(@Param('customerId', ParseIntPipe) customerId: number, @Query() pagination: PaginationDto) {
    return this.customerInteractionsService.getCustomerInteractions(customerId, pagination);
  }

  @ApiOperation({ summary: 'Get customer interactions statistics' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  @Roles(Role.ADMIN, Role.SALESMANAGER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('statistics/overview')
  getStatistics() {
    return this.customerInteractionsService.getStatistics();
  }

  @ApiOperation({ summary: 'Get one customer interaction by ID' })
  @ApiResponse({ status: 200, description: 'Customer interaction retrieved successfully' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOneCustomerInteraction(@Param('id', ParseIntPipe) id: number) {
    return this.customerInteractionsService.getOneCustomerInteraction(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateCustomerInteraction(@Param('id', ParseIntPipe) id: number, @Body() updateData: Partial<addCustomerInteractionDto>) {
    return this.customerInteractionsService.updateCustomerInteraction(id, updateData);
  }

  @Roles(Role.ADMIN, Role.SALESMANAGER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  deleteCustomerInteraction(@Param('id', ParseIntPipe) id: number) {
    return this.customerInteractionsService.deleteCustomerInteraction(id);
  }
}
