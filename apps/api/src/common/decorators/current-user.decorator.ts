import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

interface UserPayload {
  sub: string;
  email: string;
  roles: string[];
  [key: string]: unknown;
}

/**
 * Current User decorator
 *
 * Extracts the current user from the request after JWT authentication.
 * Use this to get the authenticated user's details in route handlers.
 *
 * Example:
 *   @Get('profile')
 *   getProfile(@CurrentUser() user: TokenPayload) {
 *     return this.userService.findById(user.sub);
 *   }
 *
 * You can also extract specific properties:
 *   @Get('profile')
 *   getProfile(@CurrentUser('email') email: string) {
 *     return this.userService.findByEmail(email);
 *   }
 */
export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request['user'] as UserPayload | undefined;

    if (!user) {
      return null;
    }

    return data ? user[data] : user;
  }
);
