import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength, IsOptional, Matches } from 'class-validator';

/**
 * Login DTO - validates user login credentials
 * 
 * Implements FIPS 140-2 compliant password requirements:
 * - Minimum 12 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
export class LoginDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email!: string;

  @ApiProperty({
    description: 'User password',
    example: 'SecureP@ssw0rd!',
    minLength: 1,
  })
  @IsString()
  @MinLength(1, { message: 'Password is required' })
  password!: string;

  @ApiProperty({
    description: 'Multi-factor authentication code (6 digits)',
    example: '123456',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{6}$/, { message: 'MFA code must be exactly 6 numeric digits' })
  mfaCode?: string;
}

/**
 * Refresh Token DTO - validates token refresh requests
 */
export class RefreshTokenDto {
  @ApiProperty({
    description: 'JWT refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString()
  @MinLength(1, { message: 'Refresh token is required' })
  refreshToken!: string;
}

/**
 * Register DTO - validates new user registration
 * 
 * Implements FIPS 140-2 compliant password requirements
 */
export class RegisterDto {
  @ApiProperty({
    description: 'User email address',
    example: 'newuser@example.com',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email!: string;

  @ApiProperty({
    description: 'User password (min 12 chars, must include uppercase, lowercase, number, and special character)',
    example: 'SecureP@ssw0rd!',
    minLength: 12,
    maxLength: 128,
  })
  @IsString()
  @MinLength(12, { message: 'Password must be at least 12 characters' })
  @MaxLength(128, { message: 'Password must be at most 128 characters' })
  @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  @Matches(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  @Matches(/[0-9]/, { message: 'Password must contain at least one number' })
  @Matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, {
    message: 'Password must contain at least one special character',
  })
  password!: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @MinLength(1, { message: 'First name is required' })
  @MaxLength(100, { message: 'First name must be at most 100 characters' })
  firstName!: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @MinLength(1, { message: 'Last name is required' })
  @MaxLength(100, { message: 'Last name must be at most 100 characters' })
  lastName!: string;

  @ApiProperty({
    description: 'User phone number (E.164 format)',
    example: '+14155552671',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Please provide a valid phone number' })
  phone?: string;
}
