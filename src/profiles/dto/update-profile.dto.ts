import { IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from 'src/entities/profile.entity';

export class UpdateProfileDto {
  @ApiProperty({ description: 'User bio', example: 'Software developer with 5 years experience', required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ description: 'Profile picture URL', example: 'https://example.com/profile.jpg', required: false })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @ApiProperty({ description: 'Date of birth', example: '1990-01-01', required: false })
  @IsOptional()
  @IsDateString()
  dateOfbirth?: string;

  @ApiProperty({ description: 'Gender', enum: Gender, example: Gender.MALE, required: false })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;
}
