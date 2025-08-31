import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/entities/user.entity';
import { JwtPayload } from 'src/shared/interfaces/jwt-payload';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      "roles", [context.getHandler(), context.getClass()]
    )

    const user:JwtPayload  = context.switchToHttp().getRequest().user

    return requiredRoles.some((role) => user.role === role)
  }
}
