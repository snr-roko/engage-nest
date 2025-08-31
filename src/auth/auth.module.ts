import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import 'dotenv/config'
import { JwtModule } from '@nestjs/jwt'; 
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Profile } from 'src/entities/profile.entity';

@Module({
  imports: [JwtModule.register({
    secret: process.env.SECRET_KEY,
    signOptions: {
      expiresIn: "1d"
    }
  }), TypeOrmModule.forFeature([Profile, User])],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersService],
})
export class AuthModule {}
