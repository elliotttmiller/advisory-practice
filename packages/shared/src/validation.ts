// Validation schemas using Zod

import { z } from 'zod';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  MAX_FILE_SIZE_BYTES,
  ALLOWED_FILE_TYPES,
  PROHIBITED_MARKETING_TERMS,
} from './constants';

// Email validation
export const emailSchema = z.string().email('Invalid email address').toLowerCase();

// Password validation (FIPS 140-2 compliant)
export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`)
  .max(PASSWORD_MAX_LENGTH, `Password must be at most ${PASSWORD_MAX_LENGTH} characters`)
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
    'Password must contain at least one special character'
  );

// Phone validation
export const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format');

// UUID validation
export const uuidSchema = z.string().uuid('Invalid UUID format');

// Date validation
export const dateSchema = z.coerce.date();

// Pagination validation
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// User registration schema
export const userRegistrationSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  phone: phoneSchema.optional(),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
});

// Login schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  mfaCode: z
    .string()
    .length(6)
    .regex(/^\d{6}$/, 'MFA code must be 6 numeric digits')
    .optional(),
});

// Client profile schema
export const clientProfileSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: emailSchema,
  phone: phoneSchema.optional(),
  status: z.enum(['lead', 'prospect', 'client', 'inactive']),
  riskTolerance: z.enum(['conservative', 'moderate', 'aggressive']),
  investmentObjectives: z.array(
    z.enum(['growth', 'income', 'capital_preservation', 'speculation', 'tax_efficiency'])
  ),
  assetsUnderManagement: z.number().min(0),
});

// Document upload schema
export const documentUploadSchema = z.object({
  name: z.string().min(1).max(255),
  type: z.enum(['contract', 'disclosure', 'statement', 'tax', 'correspondence', 'marketing']),
  classification: z.enum(['public', 'confidential', 'regulatory']),
  mimeType: z.string().refine((val) => ALLOWED_FILE_TYPES.includes(val), {
    message: 'File type not allowed',
  }),
  size: z.number().max(MAX_FILE_SIZE_BYTES, {
    message: `File size must be less than ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB`,
  }),
  retentionPolicy: z.string(),
});

// Marketing content schema with compliance checks
export const marketingContentSchema = z.object({
  title: z.string().min(1).max(200),
  type: z.enum(['email', 'social', 'blog', 'newsletter', 'advertisement']),
  content: z
    .string()
    .min(1)
    .refine(
      (content) => {
        const lowerContent = content.toLowerCase();
        return !PROHIBITED_MARKETING_TERMS.some((term) => lowerContent.includes(term));
      },
      {
        message: `Content contains prohibited terms. Avoid: ${PROHIBITED_MARKETING_TERMS.join(', ')}`,
      }
    ),
});

// Lead capture schema with consent
export const leadCaptureSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: emailSchema,
  phone: phoneSchema.optional(),
  source: z.enum(['website', 'referral', 'social', 'advertisement', 'event']),
  consentCaptured: z.literal(true, {
    errorMap: () => ({ message: 'Consent is required to process your information' }),
  }),
  consentTimestamp: z.date().default(() => new Date()),
});

// Compliance check schema
export const complianceCheckInputSchema = z.object({
  type: z.enum([
    'SEC_MARKETING_206_4_1',
    'FINRA_2210',
    'GLBA_SAFEGUARDS',
    'SEC_REG_S_P',
    'AML_KYC',
  ]),
  targetType: z.enum(['document', 'communication', 'client', 'transaction']),
  targetId: uuidSchema,
  content: z.string().optional(),
});

// Export inferred types
export type UserRegistration = z.infer<typeof userRegistrationSchema>;
export type Login = z.infer<typeof loginSchema>;
export type ClientProfile = z.infer<typeof clientProfileSchema>;
export type DocumentUpload = z.infer<typeof documentUploadSchema>;
export type MarketingContent = z.infer<typeof marketingContentSchema>;
export type LeadCapture = z.infer<typeof leadCaptureSchema>;
export type ComplianceCheckInput = z.infer<typeof complianceCheckInputSchema>;
export type Pagination = z.infer<typeof paginationSchema>;
