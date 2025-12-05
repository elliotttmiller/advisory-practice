// Mock reports and analytics data for UI/UX development
import type { ApiResponse } from '@financial-advisor/shared';

// Dashboard metrics
export interface DashboardMetrics {
  totalClients: number;
  activeClients: number;
  totalAUM: number;
  aumChange: number;
  leadsThisMonth: number;
  conversionRate: number;
  complianceScore: number;
  pendingReviews: number;
  documentsUploaded: number;
  meetingsScheduled: number;
}

export const mockDashboardMetrics: DashboardMetrics = {
  totalClients: 1250,
  activeClients: 1180,
  totalAUM: 523000000, // $523M
  aumChange: 5.2,
  leadsThisMonth: 45,
  conversionRate: 32,
  complianceScore: 98,
  pendingReviews: 12,
  documentsUploaded: 156,
  meetingsScheduled: 28,
};

// Revenue metrics
export interface RevenueMetrics {
  currentMonth: number;
  previousMonth: number;
  yearToDate: number;
  previousYearToDate: number;
  monthlyTrend: { month: string; revenue: number }[];
}

export const mockRevenueMetrics: RevenueMetrics = {
  currentMonth: 285000,
  previousMonth: 275000,
  yearToDate: 3150000,
  previousYearToDate: 2890000,
  monthlyTrend: [
    { month: 'Jan', revenue: 245000 },
    { month: 'Feb', revenue: 252000 },
    { month: 'Mar', revenue: 268000 },
    { month: 'Apr', revenue: 255000 },
    { month: 'May', revenue: 278000 },
    { month: 'Jun', revenue: 290000 },
    { month: 'Jul', revenue: 285000 },
    { month: 'Aug', revenue: 272000 },
    { month: 'Sep', revenue: 295000 },
    { month: 'Oct', revenue: 310000 },
    { month: 'Nov', revenue: 315000 },
    { month: 'Dec', revenue: 285000 },
  ],
};

// Client growth metrics
export interface ClientGrowthMetrics {
  newClients: number;
  churned: number;
  netGrowth: number;
  retentionRate: number;
  monthlyGrowth: { month: string; new: number; churned: number }[];
}

export const mockClientGrowthMetrics: ClientGrowthMetrics = {
  newClients: 145,
  churned: 23,
  netGrowth: 122,
  retentionRate: 98.2,
  monthlyGrowth: [
    { month: 'Jan', new: 12, churned: 2 },
    { month: 'Feb', new: 10, churned: 1 },
    { month: 'Mar', new: 15, churned: 3 },
    { month: 'Apr', new: 11, churned: 2 },
    { month: 'May', new: 13, churned: 2 },
    { month: 'Jun', new: 14, churned: 3 },
    { month: 'Jul', new: 12, churned: 1 },
    { month: 'Aug', new: 10, churned: 2 },
    { month: 'Sep', new: 13, churned: 2 },
    { month: 'Oct', new: 15, churned: 3 },
    { month: 'Nov', new: 12, churned: 2 },
    { month: 'Dec', new: 8, churned: 0 },
  ],
};

// AUM distribution metrics
export interface AUMDistribution {
  byRiskTolerance: { category: string; amount: number; percentage: number }[];
  byInvestmentObjective: { category: string; amount: number; percentage: number }[];
  byClientTier: { tier: string; amount: number; count: number }[];
}

export const mockAUMDistribution: AUMDistribution = {
  byRiskTolerance: [
    { category: 'Conservative', amount: 125000000, percentage: 24 },
    { category: 'Moderate', amount: 265000000, percentage: 51 },
    { category: 'Aggressive', amount: 133000000, percentage: 25 },
  ],
  byInvestmentObjective: [
    { category: 'Growth', amount: 210000000, percentage: 40 },
    { category: 'Income', amount: 157000000, percentage: 30 },
    { category: 'Capital Preservation', amount: 104000000, percentage: 20 },
    { category: 'Speculation', amount: 26000000, percentage: 5 },
    { category: 'Tax Efficiency', amount: 26000000, percentage: 5 },
  ],
  byClientTier: [
    { tier: 'Ultra High Net Worth ($5M+)', amount: 180000000, count: 25 },
    { tier: 'High Net Worth ($1M-$5M)', amount: 220000000, count: 120 },
    { tier: 'Affluent ($500K-$1M)', amount: 85000000, count: 130 },
    { tier: 'Mass Affluent (<$500K)', amount: 38000000, count: 975 },
  ],
};

// Compliance report data
export interface ComplianceReportData {
  period: string;
  totalReviews: number;
  approved: number;
  rejected: number;
  escalated: number;
  averageReviewTime: number; // in hours
  ruleViolations: { rule: string; count: number; severity: 'high' | 'medium' | 'low' }[];
}

export const mockComplianceReportData: ComplianceReportData = {
  period: 'Q4 2024',
  totalReviews: 156,
  approved: 142,
  rejected: 8,
  escalated: 6,
  averageReviewTime: 4.2,
  ruleViolations: [
    { rule: 'SEC Marketing Rule 206(4)-1', count: 5, severity: 'high' },
    { rule: 'FINRA Rule 2210', count: 3, severity: 'medium' },
    { rule: 'Missing Disclosures', count: 4, severity: 'low' },
    { rule: 'Performance Presentation', count: 2, severity: 'high' },
  ],
};

// Activity log entries
export interface ActivityLogEntry {
  id: string;
  action: string;
  description: string;
  userId: string;
  userName: string;
  userRole: string;
  entityType: string;
  entityId: string;
  timestamp: Date;
}

export const mockActivityLog: ActivityLogEntry[] = [
  {
    id: 'log-001',
    action: 'CLIENT_PROFILE_UPDATED',
    description: 'Updated client profile information',
    userId: 'advisor-001',
    userName: 'Sarah Johnson',
    userRole: 'advisor',
    entityType: 'client',
    entityId: 'client-001',
    timestamp: new Date('2024-12-05T10:30:00'),
  },
  {
    id: 'log-002',
    action: 'DOCUMENT_APPROVED',
    description: 'Approved Q4 Newsletter for publication',
    userId: 'compliance-001',
    userName: 'Mike Chen',
    userRole: 'compliance_officer',
    entityType: 'document',
    entityId: 'doc-006',
    timestamp: new Date('2024-12-05T10:15:00'),
  },
  {
    id: 'log-003',
    action: 'LEAD_CAPTURED',
    description: 'New lead from website contact form',
    userId: 'system',
    userName: 'System',
    userRole: 'system',
    entityType: 'lead',
    entityId: 'lead-001',
    timestamp: new Date('2024-12-05T09:45:00'),
  },
  {
    id: 'log-004',
    action: 'COMPLIANCE_CHECK_PASSED',
    description: 'Automated compliance check passed for client communication',
    userId: 'system',
    userName: 'Auto-Review',
    userRole: 'system',
    entityType: 'compliance',
    entityId: 'compliance-002',
    timestamp: new Date('2024-12-05T08:30:00'),
  },
  {
    id: 'log-005',
    action: 'USER_LOGIN',
    description: 'User logged in successfully',
    userId: 'advisor-001',
    userName: 'John Doe',
    userRole: 'advisor',
    entityType: 'user',
    entityId: 'advisor-001',
    timestamp: new Date('2024-12-05T08:00:00'),
  },
  {
    id: 'log-006',
    action: 'DOCUMENT_UPLOADED',
    description: 'Uploaded new client agreement',
    userId: 'advisor-002',
    userName: 'Sarah Johnson',
    userRole: 'advisor',
    entityType: 'document',
    entityId: 'doc-010',
    timestamp: new Date('2024-12-04T16:45:00'),
  },
  {
    id: 'log-007',
    action: 'MARKETING_CONTENT_SUBMITTED',
    description: 'Submitted blog post for compliance review',
    userId: 'advisor-001',
    userName: 'John Doe',
    userRole: 'advisor',
    entityType: 'marketing',
    entityId: 'mkt-008',
    timestamp: new Date('2024-12-04T14:30:00'),
  },
  {
    id: 'log-008',
    action: 'CLIENT_CREATED',
    description: 'New client onboarding started',
    userId: 'advisor-001',
    userName: 'John Doe',
    userRole: 'advisor',
    entityType: 'client',
    entityId: 'client-005',
    timestamp: new Date('2024-12-04T11:00:00'),
  },
];

// Pending approvals
export interface PendingApproval {
  id: string;
  type: 'marketing' | 'document' | 'communication';
  title: string;
  status: string;
  submittedBy: string;
  submittedAt: Date;
  daysOld: number;
}

export const mockPendingApprovals: PendingApproval[] = [
  {
    id: 'approval-001',
    type: 'marketing',
    title: 'Q4 Newsletter Draft',
    status: 'SEC Review',
    submittedBy: 'John Doe',
    submittedAt: new Date('2024-12-03'),
    daysOld: 2,
  },
  {
    id: 'approval-002',
    type: 'document',
    title: 'Client Agreement Template',
    status: 'Legal Review',
    submittedBy: 'Sarah Johnson',
    submittedAt: new Date('2024-12-04'),
    daysOld: 1,
  },
  {
    id: 'approval-003',
    type: 'communication',
    title: 'Social Media Post',
    status: 'Compliance Review',
    submittedBy: 'Mike Chen',
    submittedAt: new Date('2024-12-05'),
    daysOld: 0,
  },
  {
    id: 'approval-004',
    type: 'marketing',
    title: 'Estate Planning Blog Post',
    status: 'Pending Review',
    submittedBy: 'John Doe',
    submittedAt: new Date('2024-12-02'),
    daysOld: 3,
  },
];

// Helper functions for responses
export function getMockDashboardMetricsResponse(): ApiResponse<DashboardMetrics> {
  return {
    success: true,
    data: mockDashboardMetrics,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
    },
  };
}

export function getMockRevenueMetricsResponse(): ApiResponse<RevenueMetrics> {
  return {
    success: true,
    data: mockRevenueMetrics,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
    },
  };
}

export function getMockClientGrowthMetricsResponse(): ApiResponse<ClientGrowthMetrics> {
  return {
    success: true,
    data: mockClientGrowthMetrics,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
    },
  };
}

export function getMockAUMDistributionResponse(): ApiResponse<AUMDistribution> {
  return {
    success: true,
    data: mockAUMDistribution,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
    },
  };
}

export function getMockComplianceReportResponse(): ApiResponse<ComplianceReportData> {
  return {
    success: true,
    data: mockComplianceReportData,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
    },
  };
}

export function getMockActivityLogResponse(limit = 10): ApiResponse<ActivityLogEntry[]> {
  const sortedLog = [...mockActivityLog].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );
  
  return {
    success: true,
    data: sortedLog.slice(0, limit),
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
    },
  };
}

export function getMockPendingApprovalsResponse(): ApiResponse<PendingApproval[]> {
  return {
    success: true,
    data: mockPendingApprovals,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
    },
  };
}

// Format currency helper
export function formatCurrency(amount: number): string {
  if (amount >= 1000000000) {
    return `$${(amount / 1000000000).toFixed(1)}B`;
  }
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(0)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount.toLocaleString()}`;
}

// Format percentage helper
export function formatPercentage(value: number, includeSign = false): string {
  const formatted = `${Math.abs(value).toFixed(1)}%`;
  if (includeSign && value !== 0) {
    return value > 0 ? `+${formatted}` : `-${formatted}`;
  }
  return formatted;
}
