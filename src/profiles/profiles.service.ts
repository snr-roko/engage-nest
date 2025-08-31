import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ProfilesService {

  constructor(
    @InjectRepository(Profile) private readonly profileRepostory: Repository<Profile>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({where: {id: userId}, relations: {profile: true}})

    if (!user) throw new NotFoundException('User not found')
    
    return await this.profileRepostory.findOne({
      where: {id: user.profile.id},
      relations: {user: true}
    })

  }
}
