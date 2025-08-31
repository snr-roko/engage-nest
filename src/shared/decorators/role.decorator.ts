import { SetMetadata } from "@nestjs/common";
import { Role } from "src/entities/user.entity";

export const Roles = (...roles: [Role, ...Role[]]) => SetMetadata("roles", roles)