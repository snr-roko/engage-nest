import { Controller, Get, ParseUUIDPipe, Param } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {

  constructor(private profileService: ProfilesService) {

  }

  @Get(':id')
  getProfile(@Param('id', ParseUUIDPipe) id: string) {
    return this.profileService.getProfile(id)
  }
}
