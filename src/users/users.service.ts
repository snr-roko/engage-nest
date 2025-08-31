import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/createUser.dto';
import { Profile } from 'src/entities/profile.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>
) {}

  async createSalesRep(newUser: createUserDto) {
    const userProfile = this.profileRepository.create()

    const user = this.userRepository.create({
      ...newUser,
      profile: userProfile
    })

    return await this.userRepository.save(user)
  }

  async createSalesManager(newUser: createUserDto) {
    const userProfile = this.profileRepository.create()

    const user = this.userRepository.create({
      ...newUser,
      role: Role.SALESMANAGER,
      profile: userProfile
    })
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email
      }
    })
  }
}
