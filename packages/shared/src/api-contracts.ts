// API Contract Types for Financial Advisor Platform
// This file defines the TypeScript interfaces for all API endpoints

import type {
  User,
  Client,
  Document,
  ComplianceCheck,
  Message,
  MessageThread,
  PortfolioSummary,
  SecurityHolding,
  AuditLogEntry,
  PaginationMeta,
  ApiResponse,
} from './types';

// ============================================
// Authentication Contracts
// ============================================

/** Login request payload for client or advisor */
export interface LoginRequest {
  email: string;
  password: string;
  mfaCode?: string;
}

/** Login response with tokens and user info */
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
}

/** Forgot password request */
export interface ForgotPasswordRequest {
  email: string;
}

/** Reset password request */
export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

/** Token refresh request */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/** Token refresh response */
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// ============================================
// Client Data Contracts
// ============================================

/** Client profile with full details (extends Client) */
export interface ClientProfileDetails extends Client {
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country?: string;
  };
  dateOfBirth?: string;
  ssn?: string; // Masked
  employmentStatus?: string;
  employer?: string;
  annualIncome?: number;
  netWorth?: number;
}

/** Client list response */
export interface ClientListResponse {
  clients: Client[];
  pagination: PaginationMeta;
}

/** Client portfolio response */
export interface ClientPortfolioResponse {
  summary: PortfolioSummary;
  holdings: SecurityHolding[];
  modelName?: string;
  lastRebalancedAt?: string;
}

/** Client documents response */
export interface ClientDocumentsResponse {
  documents: Document[];
  pagination: PaginationMeta;
}

/** Client messages response */
export interface ClientMessagesResponse {
  threads: MessageThread[];
  pagination: PaginationMeta;
}

// ============================================
// Advisor Data Contracts
// ============================================

/** Advisor dashboard metrics */
export interface AdvisorDashboardMetrics {
  totalClients: number;
  activeClients: number;
  totalAUM: number;
  aumChange: number;
  leadsThisMonth: number;
  conversionRate: number;
  pendingReviews: number;
  complianceScore: number;
}

/** Advisor client list filters */
export interface ClientListFilters {
  status?: Client['status'];
  riskTolerance?: Client['riskTolerance'];
  search?: string;
}

/** Recent activity item */
export interface ActivityItem {
  id: string;
  type: 'client_update' | 'document_approved' | 'lead_captured' | 'compliance_check' | 'message' | 'trade';
  title: string;
  description?: string;
  actor: string;
  actorRole: string;
  entityId?: string;
  entityType?: string;
  timestamp: string;
}

/** Activity feed response */
export interface ActivityFeedResponse {
  activities: ActivityItem[];
  hasMore: boolean;
}

// ============================================
// Compliance Contracts
// ============================================

/** Compliance check list response */
export interface ComplianceCheckListResponse {
  checks: ComplianceCheck[];
  pagination: PaginationMeta;
}

/** Compliance statistics */
export interface ComplianceStats {
  pending: number;
  approved: number;
  rejected: number;
  escalated: number;
  averageReviewTime: number; // in hours
}

/** Compliance review request */
export interface ComplianceReviewRequest {
  checkId: string;
  status: 'approved' | 'rejected' | 'escalated';
  comments?: string;
  escalateTo?: string;
}

/** Audit log list response */
export interface AuditLogListResponse {
  logs: AuditLogEntry[];
  pagination: PaginationMeta;
}

// ============================================
// Document Contracts
// ============================================

/** Document list response */
export interface DocumentListResponse {
  documents: Document[];
  pagination: PaginationMeta;
}

/** Document upload request */
export interface DocumentUploadRequest {
  clientId?: string;
  name: string;
  type: Document['type'];
  classification: Document['classification'];
  file: File;
}

/** Document upload response */
export interface DocumentUploadResponse {
  document: Document;
  uploadUrl?: string; // For pre-signed upload
}

// ============================================
// Message Contracts
// ============================================

/** Message thread detail response */
export interface MessageThreadResponse {
  thread: MessageThread;
  messages: Message[];
}

/** Send message request */
export interface SendMessageRequest {
  threadId?: string;
  recipientId: string;
  subject?: string;
  content: string;
  attachmentIds?: string[];
}

/** Send message response */
export interface SendMessageResponse {
  message: Message;
  thread: MessageThread;
}

// ============================================
// Portfolio/TAMP Contracts
// ============================================

/** Model portfolio definition */
export interface ModelPortfolio {
  id: string;
  name: string;
  description: string;
  riskLevel: 'conservative' | 'moderate_conservative' | 'moderate' | 'moderate_aggressive' | 'aggressive';
  targetAllocations: SecurityHolding[];
  minInvestment: number;
  managementFee: number;
  inceptionDate: string;
  performance: {
    mtd: number;
    qtd: number;
    ytd: number;
    oneYear: number;
    threeYear: number;
    fiveYear?: number;
  };
}

/** Model portfolio list response */
export interface ModelPortfolioListResponse {
  models: ModelPortfolio[];
  pagination: PaginationMeta;
}

/** Rebalancing batch */
export interface RebalancingBatch {
  id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  accountCount: number;
  totalValue: number;
  createdAt: string;
  completedAt?: string;
  createdBy: string;
}

/** Rebalancing batches response */
export interface RebalancingBatchesResponse {
  batches: RebalancingBatch[];
  pagination: PaginationMeta;
}

// ============================================
// API Response Wrappers
// ============================================

export type AuthLoginApiResponse = ApiResponse<LoginResponse>;
export type AuthRefreshApiResponse = ApiResponse<RefreshTokenResponse>;
export type ClientProfileApiResponse = ApiResponse<ClientProfileDetails>;
export type ClientListApiResponse = ApiResponse<ClientListResponse>;
export type ClientPortfolioApiResponse = ApiResponse<ClientPortfolioResponse>;
export type AdvisorDashboardApiResponse = ApiResponse<AdvisorDashboardMetrics>;
export type ComplianceStatsApiResponse = ApiResponse<ComplianceStats>;
export type ActivityFeedApiResponse = ApiResponse<ActivityFeedResponse>;
