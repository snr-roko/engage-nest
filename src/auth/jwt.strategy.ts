import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import 'dotenv/config'
import { JwtPayload } from "src/shared/interfaces/jwt-payload";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY!
    })
  }

  validate(payload: JwtPayload) {
      return {
        id: payload.sub
      }
  }
}