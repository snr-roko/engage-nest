import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PaginationDto } from 'src/shared/pagination/pagination.dto';

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

  async getAllProfiles(pagination: PaginationDto) {
    const { offset = 0, limit = 10 } = pagination;
    
    const [profiles, total] = await this.profileRepostory.findAndCount({
      relations: ['user'],
      skip: offset,
      take: limit
    });
    
    return {
      profiles,
      total,
      offset,
      limit
    };
  }

  async getOneProfile(id: string) {
    const profile = await this.profileRepostory.findOne({
      where: { id },
      relations: ['user']
    });
    
    if (!profile) throw new NotFoundException('Profile not found');
    
    return profile;
  }

  async updateProfile(id: string, updateData: UpdateProfileDto) {
    const profile = await this.profileRepostory.findOne({ where: { id } });
    
    if (!profile) throw new NotFoundException('Profile not found');
    
    if (updateData.bio !== undefined) profile.bio = updateData.bio;
    if (updateData.profilePicture !== undefined) profile.profilePicture = updateData.profilePicture;
    if (updateData.dateOfbirth !== undefined) profile.dateOfbirth = new Date(updateData.dateOfbirth);
    if (updateData.gender !== undefined) profile.gender = updateData.gender;
    
    return await this.profileRepostory.save(profile);
  }

  async deleteProfile(id: string) {
    const profile = await this.profileRepostory.findOne({ where: { id } });
    
    if (!profile) throw new NotFoundException('Profile not found');
    
    await this.profileRepostory.remove(profile);
    
    return { message: 'Profile deleted successfully' };
  }

  async getStatistics() {
    const [totalProfiles, totalUsers] = await Promise.all([
      this.profileRepostory.count(),
      this.userRepository.count()
    ]);

    const profilesByGender = await this.profileRepostory
      .createQueryBuilder('profile')
      .select('profile.gender', 'gender')
      .addSelect('COUNT(*)', 'count')
      .where('profile.gender IS NOT NULL')
      .groupBy('profile.gender')
      .getRawMany();

    const profilesWithBio = await this.profileRepostory
      .createQueryBuilder('profile')
      .where('profile.bio IS NOT NULL')
      .getCount();

    const profilesWithPicture = await this.profileRepostory
      .createQueryBuilder('profile')
      .where('profile.profilePicture IS NOT NULL')
      .getCount();

    return {
      totalProfiles,
      totalUsers,
      profilesByGender,
      profilesWithBio,
      profilesWithPicture,
      completionRate: totalProfiles > 0 ? Math.round((profilesWithBio / totalProfiles) * 100) : 0,
      lastUpdated: new Date()
    };
  }
}
