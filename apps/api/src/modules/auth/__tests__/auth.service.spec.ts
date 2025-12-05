import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService, TokenPayload, AuthTokens } from '../auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let configService: ConfigService;

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string, defaultValue?: string) => {
      const config: Record<string, string> = {
        NODE_ENV: 'test',
        JWT_REFRESH_EXPIRES_IN: '7d',
      };
      return config[key] ?? defaultValue;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return null for invalid password', async () => {
      const result = await service.validateUser('test@example.com', 'wrongpassword');
      expect(result).toBeNull();
    });

    it('should return token payload for valid credentials with demo password', async () => {
      const result = await service.validateUser('test@example.com', 'demo123');

      expect(result).not.toBeNull();
      expect(result?.email).toBe('test@example.com');
      expect(result?.roles).toEqual(['advisor']);
      expect(result?.sub).toBeDefined();
    });

    it('should throw error in production environment', async () => {
      mockConfigService.get.mockImplementation((key: string, defaultValue?: string): string => {
        if (key === 'NODE_ENV') {
          return 'production';
        }
        return defaultValue ?? '';
      });

      await expect(service.validateUser('test@example.com', 'demo123')).rejects.toThrow(
        'Mock authentication cannot be used in production'
      );
    });
  });

  describe('generateTokens', () => {
    it('should generate access and refresh tokens', async () => {
      const mockPayload: TokenPayload = {
        sub: 'test-uuid',
        email: 'test@example.com',
        roles: ['advisor'],
      };

      mockJwtService.sign
        .mockReturnValueOnce('mock-access-token')
        .mockReturnValueOnce('mock-refresh-token');

      const result = await service.generateTokens(mockPayload);

      expect(result).toEqual({
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: 900,
      });

      expect(mockJwtService.sign).toHaveBeenCalledTimes(2);
      expect(mockJwtService.sign).toHaveBeenNthCalledWith(1, mockPayload);
      expect(mockJwtService.sign).toHaveBeenNthCalledWith(2, mockPayload, {
        expiresIn: '7d',
      });
    });
  });

  describe('refreshTokens', () => {
    it('should generate new tokens from valid refresh token', async () => {
      const mockPayload: TokenPayload = {
        sub: 'test-uuid',
        email: 'test@example.com',
        roles: ['advisor'],
      };

      mockJwtService.verify.mockReturnValue(mockPayload);
      mockJwtService.sign
        .mockReturnValueOnce('new-access-token')
        .mockReturnValueOnce('new-refresh-token');

      const result = await service.refreshTokens('valid-refresh-token');

      expect(result).toEqual({
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
        expiresIn: 900,
      });

      expect(mockJwtService.verify).toHaveBeenCalledWith('valid-refresh-token');
    });

    it('should throw UnauthorizedException for invalid refresh token', async () => {
      mockJwtService.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(service.refreshTokens('invalid-token')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('hashPassword', () => {
    it('should hash password with bcrypt', async () => {
      const password = 'testPassword123!';
      const hash = await service.hashPassword(password);

      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);
      expect(hash.startsWith('$2')).toBe(true); // bcrypt hash prefix
    });

    it('should generate different hashes for same password', async () => {
      const password = 'testPassword123!';
      const hash1 = await service.hashPassword(password);
      const hash2 = await service.hashPassword(password);

      expect(hash1).not.toBe(hash2); // Different salt each time
    });
  });

  describe('verifyPassword', () => {
    it('should return true for matching password and hash', async () => {
      const password = 'testPassword123!';
      const hash = await service.hashPassword(password);

      const result = await service.verifyPassword(password, hash);

      expect(result).toBe(true);
    });

    it('should return false for non-matching password', async () => {
      const password = 'testPassword123!';
      const hash = await service.hashPassword(password);

      const result = await service.verifyPassword('wrongPassword', hash);

      expect(result).toBe(false);
    });
  });
});
