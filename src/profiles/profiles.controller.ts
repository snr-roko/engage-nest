import { Controller, Get, ParseUUIDPipe, Param, UseGuards, Req } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/shared/decorators/role.decorator';
import { Role } from 'src/entities/user.entity';

@Controller('profiles')
export class ProfilesController {

  constructor(private profileService: ProfilesService) {

  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() request) {
    return this.profileService.getProfile(request.user.id)
  }
}
