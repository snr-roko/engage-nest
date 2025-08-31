import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/createUser.dto';
import { Profile } from 'src/entities/profile.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>
) {}

  async createUser(newUser: createUserDto) {
    const userProfile = this.profileRepository.create()

    const user = this.userRepository.create({
      ...newUser,
      profile: userProfile
    })

    return await this.userRepository.save(user)
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email
      }
    })
  }
}
