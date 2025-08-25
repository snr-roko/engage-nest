import { Controller, Get, ParseUUIDPipe, Param } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {

  constructor(private profileService: ProfilesService) {

  }

  @Get(':userId')
  getProfile(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.profileService.getProfile(userId)
  }
}
