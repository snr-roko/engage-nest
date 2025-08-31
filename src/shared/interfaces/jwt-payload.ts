import { Role } from "src/entities/user.entity";

export interface JwtPayload {
  sub: string,
  role: Role 
}