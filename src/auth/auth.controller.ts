import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  async loginUser(@Body() userData: LoginDto) {
    const userId = await this.authService.validateUser(userData.email, userData.password)

    const token = await this.authService.createToken(userId)

    return {userId, token}
  }
}
