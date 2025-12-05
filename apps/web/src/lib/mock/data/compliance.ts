// Mock compliance data for UI/UX development
import type { ComplianceCheck, ApiResponse, PaginationMeta } from '@financial-advisor/shared';

// Generate mock compliance checks for different states
export const mockComplianceChecks: ComplianceCheck[] = [
  {
    id: 'compliance-001',
    type: 'SEC_MARKETING_206_4_1',
    targetType: 'document',
    targetId: 'doc-006',
    status: 'pending',
    findings: [
      'Performance claim requires 1, 5, 10 year returns',
      'Missing material risks disclosure',
    ],
    createdAt: new Date('2024-11-20'),
    updatedAt: new Date('2024-11-20'),
  },
  {
    id: 'compliance-002',
    type: 'FINRA_2210',
    targetType: 'communication',
    targetId: 'comm-001',
    status: 'approved',
    findings: [],
    reviewedBy: 'compliance-001',
    reviewedAt: new Date('2024-12-01'),
    createdAt: new Date('2024-11-28'),
    updatedAt: new Date('2024-12-01'),
  },
  {
    id: 'compliance-003',
    type: 'GLBA_SAFEGUARDS',
    targetType: 'client',
    targetId: 'client-004',
    status: 'pending',
    findings: ['KYC documentation incomplete', 'Identity verification pending'],
    createdAt: new Date('2024-11-28'),
    updatedAt: new Date('2024-11-28'),
  },
  {
    id: 'compliance-004',
    type: 'SEC_MARKETING_206_4_1',
    targetType: 'document',
    targetId: 'doc-011',
    status: 'rejected',
    findings: [
      'Prohibited term detected: "guaranteed returns"',
      'Testimonial missing required disclosures',
      'Performance data not presented fairly',
    ],
    reviewedBy: 'compliance-001',
    reviewedAt: new Date('2024-11-25'),
    createdAt: new Date('2024-11-22'),
    updatedAt: new Date('2024-11-25'),
  },
  {
    id: 'compliance-005',
    type: 'SEC_REG_S_P',
    targetType: 'client',
    targetId: 'client-001',
    status: 'approved',
    findings: [],
    reviewedBy: 'compliance-001',
    reviewedAt: new Date('2024-10-15'),
    createdAt: new Date('2024-10-10'),
    updatedAt: new Date('2024-10-15'),
  },
  {
    id: 'compliance-006',
    type: 'AML_KYC',
    targetType: 'client',
    targetId: 'client-005',
    status: 'pending',
    findings: [
      'Enhanced due diligence required for high-risk profile',
      'Source of funds documentation pending',
    ],
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-01'),
  },
  {
    id: 'compliance-007',
    type: 'FINRA_2210',
    targetType: 'document',
    targetId: 'doc-012',
    status: 'escalated',
    findings: [
      'Communication classification unclear',
      'Requires principal review for institutional determination',
    ],
    escalatedTo: 'supervisor-001',
    escalatedAt: new Date('2024-12-02'),
    createdAt: new Date('2024-11-30'),
    updatedAt: new Date('2024-12-02'),
  },
  {
    id: 'compliance-008',
    type: 'SEC_MARKETING_206_4_1',
    targetType: 'communication',
    targetId: 'comm-002',
    status: 'approved',
    findings: [],
    reviewedBy: 'compliance-002',
    reviewedAt: new Date('2024-11-18'),
    createdAt: new Date('2024-11-15'),
    updatedAt: new Date('2024-11-18'),
  },
];

// Compliance statistics for dashboard
export interface ComplianceStats {
  totalChecks: number;
  pendingReviews: number;
  approvedThisMonth: number;
  rejectedThisMonth: number;
  escalatedItems: number;
  complianceScore: number;
  ruleBreakdown: {
    rule: string;
    pending: number;
    approved: number;
    rejected: number;
  }[];
}

export const mockComplianceStats: ComplianceStats = {
  totalChecks: 156,
  pendingReviews: 12,
  approvedThisMonth: 45,
  rejectedThisMonth: 3,
  escalatedItems: 2,
  complianceScore: 98,
  ruleBreakdown: [
    { rule: 'SEC Marketing Rule 206(4)-1', pending: 5, approved: 28, rejected: 2 },
    { rule: 'FINRA Rule 2210', pending: 3, approved: 12, rejected: 1 },
    { rule: 'GLBA Safeguards', pending: 2, approved: 3, rejected: 0 },
    { rule: 'SEC Regulation S-P', pending: 1, approved: 2, rejected: 0 },
    { rule: 'AML/KYC', pending: 1, approved: 0, rejected: 0 },
  ],
};

// Helper to create paginated response
export function getMockComplianceChecksResponse(
  page = 1,
  pageSize = 10,
  status?: ComplianceCheck['status'],
  type?: ComplianceCheck['type']
): ApiResponse<ComplianceCheck[]> {
  let filteredChecks = [...mockComplianceChecks];

  if (status) {
    filteredChecks = filteredChecks.filter((c) => c.status === status);
  }

  if (type) {
    filteredChecks = filteredChecks.filter((c) => c.type === type);
  }

  const totalItems = filteredChecks.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedChecks = filteredChecks.slice(startIndex, endIndex);

  const pagination: PaginationMeta = {
    page,
    pageSize,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };

  return {
    success: true,
    data: paginatedChecks,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
      pagination,
    },
  };
}

// Get single compliance check by ID
export function getMockComplianceCheckById(id: string): ApiResponse<ComplianceCheck> {
  const check = mockComplianceChecks.find((c) => c.id === id);

  if (!check) {
    return {
      success: false,
      error: {
        code: 'NOT_FOUND_ERROR',
        message: `Compliance check with ID ${id} not found`,
      },
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: `mock-${Date.now()}`,
      },
    };
  }

  return {
    success: true,
    data: check,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
    },
  };
}

// Get compliance stats response
export function getMockComplianceStatsResponse(): ApiResponse<ComplianceStats> {
  return {
    success: true,
    data: mockComplianceStats,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
    },
  };
}

// Empty state response
export const emptyComplianceResponse: ApiResponse<ComplianceCheck[]> = {
  success: true,
  data: [],
  metadata: {
    timestamp: new Date().toISOString(),
    requestId: 'mock-empty',
    pagination: {
      page: 1,
      pageSize: 10,
      totalItems: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
};

// Error state response
export const errorComplianceResponse: ApiResponse<ComplianceCheck[]> = {
  success: false,
  error: {
    code: 'INTERNAL_ERROR',
    message: 'An unexpected error occurred while fetching compliance checks',
    details: { retryable: true },
  },
  metadata: {
    timestamp: new Date().toISOString(),
    requestId: 'mock-error',
  },
};
