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
  // External integration IDs
  externalIds?: {
    tampId?: string;
    crmId?: string;
    custodianId?: string;
  };
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
  severity?: ComplianceSeverity;
  findings: string[];
  recommendations?: string[];
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

export type ComplianceSeverity = 'low' | 'medium' | 'high' | 'critical';

// Integration Types for Hybrid Ecosystem
export type IntegrationProviderType = 'TAMP' | 'CRM' | 'MARKET_DATA' | 'DOCUMENT' | 'IDP';

export type IntegrationProvider =
  | 'LPL'
  | 'ENVESTNET'
  | 'SEI'
  | 'REDTAIL'
  | 'WEALTHBOX'
  | 'MORNINGSTAR'
  | 'REFINITIV'
  | 'DOCUSIGN'
  | 'ADOBE_SIGN'
  | 'AUTH0'
  | 'OKTA';

export interface IntegrationConfig {
  id: string;
  provider: IntegrationProvider;
  type: IntegrationProviderType;
  name: string;
  enabled: boolean;
  status: 'active' | 'inactive' | 'error' | 'pending_setup';
  lastSyncAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Portfolio/TAMP Data Types
export type AssetClass =
  | 'domestic_equity'
  | 'international_equity'
  | 'fixed_income'
  | 'alternatives'
  | 'cash'
  | 'real_estate'
  | 'commodities';

export interface SecurityHolding {
  symbol: string;
  name: string;
  assetClass: AssetClass;
  targetWeight: number;
  currentWeight?: number;
  shares?: number;
  price?: number;
  value?: number;
  change?: number;
  changePercent?: number;
}

export interface PortfolioSummary {
  totalValue: number;
  cashBalance: number;
  drift: number;
  driftStatus: 'within_tolerance' | 'approaching_threshold' | 'needs_rebalancing';
  performance: {
    mtd: number;
    qtd: number;
    ytd: number;
    oneYear?: number;
    sinceInception: number;
  };
}

// Communication Types
export interface Message {
  id: string;
  threadId?: string;
  senderId: string;
  senderType: 'advisor' | 'client' | 'system';
  recipientId: string;
  recipientType: 'advisor' | 'client';
  subject?: string;
  content: string;
  attachments?: MessageAttachment[];
  read: boolean;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageAttachment {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  storageKey: string;
}

export interface MessageThread {
  id: string;
  participants: string[];
  subject: string;
  lastMessageAt: Date;
  messageCount: number;
  unreadCount: number;
  createdAt: Date;
}

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
