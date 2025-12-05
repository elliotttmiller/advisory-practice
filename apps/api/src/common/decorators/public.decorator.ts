import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Public decorator to bypass JWT authentication
 * 
 * Use this decorator on routes that should be accessible
 * without authentication (e.g., health checks, public API endpoints).
 * 
 * Example:
 *   @Public()
 *   @Get('health')
 *   healthCheck() { ... }
 * 
 * Note: Be cautious when marking routes as public.
 * All authenticated routes are logged for FINRA compliance.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
