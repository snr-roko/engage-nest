import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile.entity';
import { User } from 'src/entities/user.entity';
import { ProfileOwnerGuard } from 'src/auth/profile-owner.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User])],
  providers: [ProfilesService, ProfileOwnerGuard],
  controllers: [ProfilesController]
})
export class ProfilesModule {}
