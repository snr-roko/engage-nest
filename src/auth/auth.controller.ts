import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from 'src/shared/interfaces/jwt-payload';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  async loginUser(@Body() userData: LoginDto) {
    const tokenPayload: JwtPayload = await this.authService.validateUser(userData.email, userData.password)

    const token = await this.authService.createToken(tokenPayload)

    return {
      id: tokenPayload.sub,
      role: tokenPayload.role,
      token: token
    }
  }
}
