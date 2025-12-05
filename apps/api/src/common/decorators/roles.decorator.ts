import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Roles decorator for RBAC authorization
 *
 * Use this decorator on controllers or route handlers to require
 * specific roles for access. Works with JwtAuthGuard.
 *
 * Example:
 *   @Roles('admin', 'compliance_officer')
 *   @Get('reports')
 *   getReports() { ... }
 *
 * Available roles:
 * - admin: Full system access
 * - compliance_officer: Compliance review and approval
 * - advisor: Client management and advisory
 * - associate: Limited read access
 * - client: Client portal access
 * - viewer: Read-only access
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
