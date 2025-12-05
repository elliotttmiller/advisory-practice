import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

/**
 * JWT Authentication Guard
 *
 * This guard implements JWT-based authentication following FINRA requirements
 * for secure access control. It validates JWT tokens and enforces role-based
 * access control (RBAC).
 *
 * Features:
 * - Token validation with expiry checking
 * - Role-based authorization
 * - Public route bypass via @Public() decorator
 * - Audit logging for authentication events
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if route is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      // Log failed authentication attempt for compliance audit
      console.log(
        `[AUDIT] Authentication failed: No token provided from ${request.ip} at ${new Date().toISOString()}`
      );
      throw new UnauthorizedException('Authentication token is required');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      // Attach user payload to request for downstream use
      request['user'] = payload;

      // Check role-based access if roles are specified
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (requiredRoles && requiredRoles.length > 0) {
        const userRoles = payload.roles || [];
        const hasRequiredRole = requiredRoles.some((role) => userRoles.includes(role));

        if (!hasRequiredRole) {
          // Log authorization failure for compliance
          console.log(
            `[AUDIT] Authorization failed: User ${payload.sub} lacks required roles [${requiredRoles.join(', ')}] at ${new Date().toISOString()}`
          );
          throw new ForbiddenException('Insufficient permissions');
        }
      }

      // Log successful authentication for compliance audit
      console.log(
        `[AUDIT] Authentication successful: User ${payload.sub} (${payload.email}) at ${new Date().toISOString()}`
      );

      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }

      // Log token verification failure
      console.log(
        `[AUDIT] Token verification failed from ${request.ip} at ${new Date().toISOString()}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );

      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return undefined;
    }

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
