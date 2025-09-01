import { Controller, Get, ParseUUIDPipe, Param, UseGuards, Req, Patch, Delete, Query, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProfilesService } from './profiles.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { ProfileOwnerGuard } from 'src/auth/profile-owner.guard';
import { Roles } from 'src/shared/decorators/role.decorator';
import { Role } from 'src/entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PaginationDto } from 'src/shared/pagination/pagination.dto';

@ApiTags('Profiles')
@ApiBearerAuth('JWT-auth')
@Controller('profiles')
export class ProfilesController {

  constructor(private profileService: ProfilesService) {

  }

  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() request) {
    return this.profileService.getProfile(request.user.id)
  }

  @ApiOperation({ summary: 'Get all profiles' })
  @ApiResponse({ status: 200, description: 'Profiles retrieved successfully' })
  @Roles(Role.ADMIN, Role.SALESMANAGER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  getAllProfiles(@Query() pagination: PaginationDto) {
    return this.profileService.getAllProfiles(pagination);
  }

  @ApiOperation({ summary: 'Get profiles statistics' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  @Roles(Role.ADMIN, Role.SALESMANAGER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('statistics/overview')
  getStatistics() {
    return this.profileService.getStatistics();
  }

  @ApiOperation({ summary: 'Get one profile by ID' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  @Roles(Role.ADMIN, Role.SALESMANAGER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  getOneProfile(@Param('id', ParseUUIDPipe) id: string) {
    return this.profileService.getOneProfile(id);
  }

  @UseGuards(JwtAuthGuard, ProfileOwnerGuard)
  @Patch(':id')
  updateProfile(@Param('id', ParseUUIDPipe) id: string, @Body() updateData: UpdateProfileDto) {
    return this.profileService.updateProfile(id, updateData);
  }

  @UseGuards(JwtAuthGuard, ProfileOwnerGuard)
  @Delete(':id')
  deleteProfile(@Param('id', ParseUUIDPipe) id: string) {
    return this.profileService.deleteProfile(id);
  }
}
