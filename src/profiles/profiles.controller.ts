import { Controller, Get, ParseUUIDPipe, Param, UseGuards, Req } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

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
