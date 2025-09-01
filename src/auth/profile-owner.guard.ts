import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Profile } from 'src/entities/profile.entity';
import { Role } from 'src/entities/user.entity';

@Injectable()
export class ProfileOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const profileId = request.params.id;

    if (user.role === Role.ADMIN) {
      return true;
    }

    const profile = await this.profileRepository.findOne({
      where: { id: profileId },
      relations: ['user']
    });

    if (!profile) {
      throw new ForbiddenException('Profile not found');
    }

    if (profile.user.id === user.id) {
      return true;
    }

    throw new ForbiddenException('Only Admin and Owner of profiles can modify and delete profiles');
  }
}
