// Application constants

export const APP_NAME = 'Financial Advisor Platform';
export const APP_VERSION = '1.0.0';

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Session and token settings
export const ACCESS_TOKEN_EXPIRY = '15m';
export const REFRESH_TOKEN_EXPIRY = '7d';
export const SESSION_TIMEOUT_MINUTES = 30;
export const MAX_CONCURRENT_SESSIONS = 3;

// Password requirements (FIPS 140-2 compliant)
export const PASSWORD_MIN_LENGTH = 12;
export const PASSWORD_MAX_LENGTH = 128;
export const PASSWORD_REQUIRE_UPPERCASE = true;
export const PASSWORD_REQUIRE_LOWERCASE = true;
export const PASSWORD_REQUIRE_NUMBER = true;
export const PASSWORD_REQUIRE_SPECIAL = true;
export const PASSWORD_BCRYPT_ROUNDS = 12;

// Rate limiting
export const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
export const RATE_LIMIT_MAX_REQUESTS = 100;

// File upload limits
export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25MB
export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/jpeg',
  'image/png',
  'text/csv',
];

// Retention periods (in days) - FINRA/SEC compliance
export const RETENTION_PERIODS = {
  COMMUNICATIONS: 3 * 365, // 3 years
  CONTRACTS: 6 * 365, // 6 years
  FINANCIAL_RECORDS: 7 * 365, // 7 years
  MARKETING_MATERIALS: 6 * 365, // 6 years after last use
  AUDIT_LOGS: 7 * 365, // 7 years
  CLIENT_RECORDS: 6 * 365, // 6 years after relationship ends
} as const;

// Compliance rules
export const COMPLIANCE_RULES = {
  SEC_MARKETING_206_4_1: {
    name: 'SEC Marketing Rule 206(4)-1',
    description: 'Investment adviser advertising and marketing rules',
    effectiveDate: '2022-11-04',
  },
  FINRA_2210: {
    name: 'FINRA Rule 2210',
    description: 'Communications with the public',
    effectiveDate: '2012-02-04',
  },
  GLBA_SAFEGUARDS: {
    name: 'GLBA Safeguards Rule',
    description: 'Financial institution information security requirements',
    effectiveDate: '2003-05-23',
  },
  SEC_REG_S_P: {
    name: 'SEC Regulation S-P',
    description: 'Privacy of consumer financial information',
    effectiveDate: '2000-11-13',
  },
  AML_KYC: {
    name: 'AML/KYC Requirements',
    description: 'Anti-money laundering and know your customer rules',
    effectiveDate: '2001-10-26',
  },
} as const;

// Prohibited terms in marketing content (SEC Marketing Rule)
export const PROHIBITED_MARKETING_TERMS = [
  'guaranteed',
  'no risk',
  'risk-free',
  'safe investment',
  'cannot lose',
  'sure thing',
  'certain return',
  'always profitable',
  'never lose money',
] as const;

// User roles and permissions
export const USER_PERMISSIONS = {
  admin: ['*'],
  compliance_officer: [
    'read:all',
    'write:compliance',
    'approve:content',
    'approve:documents',
    'read:audit_logs',
  ],
  advisor: [
    'read:clients',
    'write:clients',
    'read:documents',
    'write:documents',
    'read:marketing',
    'write:marketing',
    'read:reports',
  ],
  associate: ['read:clients', 'read:documents', 'read:marketing'],
  client: ['read:own_profile', 'read:own_documents'],
  viewer: ['read:public'],
} as const;

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Error codes
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
  CONFLICT_ERROR: 'CONFLICT_ERROR',
  RATE_LIMIT_ERROR: 'RATE_LIMIT_ERROR',
  COMPLIANCE_ERROR: 'COMPLIANCE_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;
