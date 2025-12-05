// Core shared types for the Financial Advisor Platform

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: UserRole[];
  status: 'active' | 'inactive' | 'suspended';
  mfaEnabled: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole =
  | 'admin'
  | 'compliance_officer'
  | 'advisor'
  | 'associate'
  | 'client'
  | 'viewer';

export interface Client {
  id: string;
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status: ClientStatus;
  riskTolerance: RiskTolerance;
  investmentObjectives: InvestmentObjective[];
  assetsUnderManagement: number;
  onboardingStatus: OnboardingStatus;
  advisorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ClientStatus = 'lead' | 'prospect' | 'client' | 'inactive';

export type RiskTolerance = 'conservative' | 'moderate' | 'aggressive';

export type InvestmentObjective =
  | 'growth'
  | 'income'
  | 'capital_preservation'
  | 'speculation'
  | 'tax_efficiency';

export type OnboardingStatus =
  | 'pending'
  | 'kyc_required'
  | 'documents_required'
  | 'review_pending'
  | 'approved'
  | 'rejected';

export interface Document {
  id: string;
  clientId: string;
  name: string;
  type: DocumentType;
  classification: DocumentClassification;
  mimeType: string;
  size: number;
  hash: string;
  storageKey: string;
  version: number;
  retentionPolicy: string;
  createdBy: string;
  approvedBy?: string;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type DocumentType =
  | 'contract'
  | 'disclosure'
  | 'statement'
  | 'tax'
  | 'correspondence'
  | 'marketing'
  | 'compliance'
  | 'kyc';

export type DocumentClassification = 'public' | 'confidential' | 'regulatory';

export interface AuditLogEntry {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  userId: string;
  userRole: string;
  details: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

export interface ComplianceCheck {
  id: string;
  type: ComplianceRuleType;
  targetType: 'document' | 'communication' | 'client' | 'transaction';
  targetId: string;
  status: ComplianceCheckStatus;
  findings: string[];
  reviewedBy?: string;
  reviewedAt?: Date;
  escalatedTo?: string;
  escalatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type ComplianceRuleType =
  | 'SEC_MARKETING_206_4_1'
  | 'FINRA_2210'
  | 'GLBA_SAFEGUARDS'
  | 'SEC_REG_S_P'
  | 'AML_KYC';

export type ComplianceCheckStatus = 'pending' | 'approved' | 'rejected' | 'escalated';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  metadata?: ResponseMetadata;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ResponseMetadata {
  timestamp: string;
  requestId: string;
  pagination?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
