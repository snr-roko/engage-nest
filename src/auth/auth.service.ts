import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findUserByEmail(email)

        if(!user) throw new UnauthorizedException("Invalid credentials")

        const isPasswordMatched = await compare(password, user.password)

        if(!isPasswordMatched) throw new UnauthorizedException("Invalid credentials")

        return user
    }
}
