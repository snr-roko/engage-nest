import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/createUser.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/shared/decorators/role.decorator';
import { Role } from 'src/entities/user.entity';

@Controller('register')
export class UsersController {

  constructor(private userService: UsersService) {}

  @Roles(Role.ADMIN, Role.SALESMANAGER)
  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  @Post('sales-rep')
  registerSalesRep(@Body() newUser: createUserDto) {
    return this.userService.createSalesRep(newUser)
  }

  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  @Post('sales-manager')
  registerSalesManager(@Body() newUser: createUserDto) {
    return this.userService.createSalesManager(newUser)
  }
}
