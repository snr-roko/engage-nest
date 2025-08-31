import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { JwtPayload } from 'src/shared/interfaces/jwt-payload';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findUserByEmail(email)

        if(!user) throw new UnauthorizedException("Invalid credentials")

        const isPasswordMatched = await compare(password, user.password)

        if(!isPasswordMatched) throw new UnauthorizedException("Invalid credentials")

        const tokenPayload: JwtPayload = {
            sub: user.id,
            role: user.role
        }

        return tokenPayload
    }

    async createToken(payload: JwtPayload) {
        return await this.jwtService.signAsync(payload)
    }
}
