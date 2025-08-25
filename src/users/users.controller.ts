import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body() newUser: createUserDto) {
    return this.userService.createUser(newUser)
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers()
  }
}
