import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsArray,
  IsNumber,
  Min,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

// Status and type enums
export enum ClientStatus {
  LEAD = 'lead',
  PROSPECT = 'prospect',
  CLIENT = 'client',
  INACTIVE = 'inactive',
}

export enum RiskTolerance {
  CONSERVATIVE = 'conservative',
  MODERATE = 'moderate',
  AGGRESSIVE = 'aggressive',
}

export enum InvestmentObjective {
  GROWTH = 'growth',
  INCOME = 'income',
  CAPITAL_PRESERVATION = 'capital_preservation',
  SPECULATION = 'speculation',
  TAX_EFFICIENCY = 'tax_efficiency',
}

/**
 * Create Client DTO - validates new client creation
 *
 * Implements KYC/AML requirements for client onboarding
 */
export class CreateClientDto {
  @ApiProperty({
    description: 'Client first name',
    example: 'John',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @MinLength(1, { message: 'First name is required' })
  @MaxLength(100, { message: 'First name must be at most 100 characters' })
  firstName!: string;

  @ApiProperty({
    description: 'Client last name',
    example: 'Doe',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @MinLength(1, { message: 'Last name is required' })
  @MaxLength(100, { message: 'Last name must be at most 100 characters' })
  lastName!: string;

  @ApiProperty({
    description: 'Client email address',
    example: 'client@example.com',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email!: string;

  @ApiPropertyOptional({
    description: 'Client phone number (E.164 format)',
    example: '+14155552671',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Please provide a valid phone number' })
  phone?: string;

  @ApiProperty({
    description: 'Client status in the relationship lifecycle',
    enum: ClientStatus,
    example: ClientStatus.LEAD,
  })
  @IsEnum(ClientStatus, { message: 'Invalid client status' })
  status!: ClientStatus;

  @ApiProperty({
    description: 'Client risk tolerance level',
    enum: RiskTolerance,
    example: RiskTolerance.MODERATE,
  })
  @IsEnum(RiskTolerance, { message: 'Invalid risk tolerance level' })
  riskTolerance!: RiskTolerance;

  @ApiProperty({
    description: 'Client investment objectives',
    enum: InvestmentObjective,
    isArray: true,
    example: [InvestmentObjective.GROWTH, InvestmentObjective.INCOME],
  })
  @IsArray()
  @IsEnum(InvestmentObjective, { each: true, message: 'Invalid investment objective' })
  investmentObjectives!: InvestmentObjective[];

  @ApiProperty({
    description: 'Total assets under management in USD',
    example: 500000,
    minimum: 0,
  })
  @IsNumber()
  @Min(0, { message: 'Assets under management cannot be negative' })
  assetsUnderManagement!: number;
}

/**
 * Update Client DTO - validates partial client updates
 *
 * All fields are optional for PATCH requests
 */
export class UpdateClientDto {
  @ApiPropertyOptional({
    description: 'Client first name',
    example: 'John',
    minLength: 1,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'First name cannot be empty' })
  @MaxLength(100, { message: 'First name must be at most 100 characters' })
  firstName?: string;

  @ApiPropertyOptional({
    description: 'Client last name',
    example: 'Doe',
    minLength: 1,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Last name cannot be empty' })
  @MaxLength(100, { message: 'Last name must be at most 100 characters' })
  lastName?: string;

  @ApiPropertyOptional({
    description: 'Client email address',
    example: 'client@example.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email?: string;

  @ApiPropertyOptional({
    description: 'Client phone number (E.164 format)',
    example: '+14155552671',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Please provide a valid phone number' })
  phone?: string;

  @ApiPropertyOptional({
    description: 'Client status in the relationship lifecycle',
    enum: ClientStatus,
    example: ClientStatus.CLIENT,
  })
  @IsOptional()
  @IsEnum(ClientStatus, { message: 'Invalid client status' })
  status?: ClientStatus;

  @ApiPropertyOptional({
    description: 'Client risk tolerance level',
    enum: RiskTolerance,
    example: RiskTolerance.MODERATE,
  })
  @IsOptional()
  @IsEnum(RiskTolerance, { message: 'Invalid risk tolerance level' })
  riskTolerance?: RiskTolerance;

  @ApiPropertyOptional({
    description: 'Client investment objectives',
    enum: InvestmentObjective,
    isArray: true,
    example: [InvestmentObjective.GROWTH],
  })
  @IsOptional()
  @IsArray()
  @IsEnum(InvestmentObjective, { each: true, message: 'Invalid investment objective' })
  investmentObjectives?: InvestmentObjective[];

  @ApiPropertyOptional({
    description: 'Total assets under management in USD',
    example: 750000,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Assets under management cannot be negative' })
  assetsUnderManagement?: number;
}

/**
 * Client Response DTO - standard API response format
 */
export class ClientResponseDto {
  @ApiProperty({ description: 'Client unique identifier' })
  id!: string;

  @ApiProperty({ description: 'Client first name' })
  firstName!: string;

  @ApiProperty({ description: 'Client last name' })
  lastName!: string;

  @ApiProperty({ description: 'Client email address' })
  email!: string;

  @ApiPropertyOptional({ description: 'Client phone number' })
  phone?: string;

  @ApiProperty({ enum: ClientStatus, description: 'Client status' })
  status!: ClientStatus;

  @ApiProperty({ enum: RiskTolerance, description: 'Risk tolerance level' })
  riskTolerance!: RiskTolerance;

  @ApiProperty({ type: [String], enum: InvestmentObjective, description: 'Investment objectives' })
  investmentObjectives!: InvestmentObjective[];

  @ApiProperty({ description: 'Total assets under management in USD' })
  assetsUnderManagement!: number;

  @ApiProperty({ description: 'Record creation timestamp' })
  createdAt!: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt!: Date;
}
