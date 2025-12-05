import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export interface TokenPayload {
  sub: string;
  email: string;
  roles: string[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * Authentication service for user validation and token management.
 *
 * IMPORTANT: The validateUser method contains a mock implementation for development.
 * Before production deployment, this must be replaced with:
 * 1. Database user lookup via Prisma/TypeORM
 * 2. Proper password verification against stored hashes
 * 3. Account lockout logic for brute force protection
 */
@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 12;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  /**
   * Validate user credentials.
   *
   * WARNING: This is a development mock implementation.
   * Production implementation must query the user database.
   */
  async validateUser(email: string, password: string): Promise<TokenPayload | null> {
    // TODO: Replace with database lookup before production deployment
    // Example production implementation:
    // const user = await this.usersService.findByEmail(email);
    // if (!user || !await bcrypt.compare(password, user.passwordHash)) {
    //   return null;
    // }

    // Development mock - DO NOT use in production
    if (this.configService.get<string>('NODE_ENV') === 'production') {
      throw new Error('Mock authentication cannot be used in production');
    }

    const mockUser = {
      id: uuidv4(),
      email: email,
      passwordHash: await bcrypt.hash('demo123', this.SALT_ROUNDS),
      roles: ['advisor'],
    };

    const isPasswordValid = await bcrypt.compare(password, mockUser.passwordHash);

    if (!isPasswordValid) {
      return null;
    }

    return {
      sub: mockUser.id,
      email: mockUser.email,
      roles: mockUser.roles,
    };
  }

  async generateTokens(payload: TokenPayload): Promise<AuthTokens> {
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: 900, // 15 minutes in seconds
    };
  }

  async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const newPayload: TokenPayload = {
        sub: payload.sub,
        email: payload.email,
        roles: payload.roles,
      };
      return this.generateTokens(newPayload);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
