import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async createUser(newUser: createUserDto) {
    return this.userRepository.save(newUser)
  }

  async getAllUsers() {
    return this.userRepository.find()
  }

}
