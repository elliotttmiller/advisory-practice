// Mock document data for UI/UX development
import type { Document, ApiResponse, PaginationMeta } from '@financial-advisor/shared';

// Generate mock documents for different states
export const mockDocuments: Document[] = [
  {
    id: 'doc-001',
    clientId: 'client-001',
    name: 'Investment Advisory Agreement - Robert Anderson',
    type: 'contract',
    classification: 'confidential',
    mimeType: 'application/pdf',
    size: 2457600, // ~2.4 MB
    hash: 'sha256:abc123def456...',
    storageKey: 's3://documents/contracts/doc-001.pdf',
    version: 1,
    retentionPolicy: 'CONTRACTS_6_YEARS',
    createdBy: 'advisor-001',
    approvedBy: 'compliance-001',
    approvedAt: new Date('2023-01-20'),
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-20'),
  },
  {
    id: 'doc-002',
    clientId: 'client-001',
    name: 'Form ADV Part 2A - Disclosure Brochure',
    type: 'disclosure',
    classification: 'regulatory',
    mimeType: 'application/pdf',
    size: 1024000, // ~1 MB
    hash: 'sha256:def789ghi012...',
    storageKey: 's3://documents/disclosures/doc-002.pdf',
    version: 3,
    retentionPolicy: 'REGULATORY_7_YEARS',
    createdBy: 'advisor-001',
    approvedBy: 'compliance-001',
    approvedAt: new Date('2024-03-15'),
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-03-15'),
  },
  {
    id: 'doc-003',
    clientId: 'client-002',
    name: 'Q3 2024 Portfolio Statement',
    type: 'statement',
    classification: 'confidential',
    mimeType: 'application/pdf',
    size: 512000, // ~500 KB
    hash: 'sha256:ghi345jkl678...',
    storageKey: 's3://documents/statements/doc-003.pdf',
    version: 1,
    retentionPolicy: 'FINANCIAL_7_YEARS',
    createdBy: 'system',
    createdAt: new Date('2024-10-01'),
    updatedAt: new Date('2024-10-01'),
  },
  {
    id: 'doc-004',
    clientId: 'client-001',
    name: '2023 Tax Summary Report',
    type: 'tax',
    classification: 'confidential',
    mimeType: 'application/pdf',
    size: 768000, // ~750 KB
    hash: 'sha256:jkl901mno234...',
    storageKey: 's3://documents/tax/doc-004.pdf',
    version: 1,
    retentionPolicy: 'FINANCIAL_7_YEARS',
    createdBy: 'system',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
  {
    id: 'doc-005',
    clientId: 'client-003',
    name: 'Client Correspondence - Account Update',
    type: 'correspondence',
    classification: 'confidential',
    mimeType: 'application/pdf',
    size: 256000, // ~250 KB
    hash: 'sha256:mno567pqr890...',
    storageKey: 's3://documents/correspondence/doc-005.pdf',
    version: 1,
    retentionPolicy: 'COMMUNICATIONS_3_YEARS',
    createdBy: 'advisor-002',
    createdAt: new Date('2024-11-15'),
    updatedAt: new Date('2024-11-15'),
  },
  {
    id: 'doc-006',
    clientId: 'client-002',
    name: 'Q4 2024 Newsletter Draft',
    type: 'marketing',
    classification: 'public',
    mimeType: 'application/pdf',
    size: 1536000, // ~1.5 MB
    hash: 'sha256:pqr123stu456...',
    storageKey: 's3://documents/marketing/doc-006.pdf',
    version: 2,
    retentionPolicy: 'MARKETING_6_YEARS',
    createdBy: 'advisor-001',
    createdAt: new Date('2024-11-01'),
    updatedAt: new Date('2024-11-20'),
  },
  {
    id: 'doc-007',
    clientId: 'client-004',
    name: 'KYC Documentation - Sarah Wilson',
    type: 'kyc',
    classification: 'confidential',
    mimeType: 'application/pdf',
    size: 3072000, // ~3 MB
    hash: 'sha256:stu789vwx012...',
    storageKey: 's3://documents/kyc/doc-007.pdf',
    version: 1,
    retentionPolicy: 'CLIENT_6_YEARS',
    createdBy: 'advisor-001',
    createdAt: new Date('2024-11-28'),
    updatedAt: new Date('2024-11-28'),
  },
  {
    id: 'doc-008',
    clientId: 'client-001',
    name: 'SEC Compliance Checklist Q4 2024',
    type: 'compliance',
    classification: 'regulatory',
    mimeType: 'application/pdf',
    size: 384000, // ~375 KB
    hash: 'sha256:vwx345yza678...',
    storageKey: 's3://documents/compliance/doc-008.pdf',
    version: 1,
    retentionPolicy: 'REGULATORY_7_YEARS',
    createdBy: 'compliance-001',
    approvedBy: 'compliance-001',
    approvedAt: new Date('2024-12-01'),
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-01'),
  },
  {
    id: 'doc-009',
    clientId: 'client-002',
    name: 'Investment Advisory Agreement - Jennifer Martinez',
    type: 'contract',
    classification: 'confidential',
    mimeType: 'application/pdf',
    size: 2560000, // ~2.5 MB
    hash: 'sha256:yza901bcd234...',
    storageKey: 's3://documents/contracts/doc-009.pdf',
    version: 2,
    retentionPolicy: 'CONTRACTS_6_YEARS',
    createdBy: 'advisor-001',
    approvedBy: 'compliance-001',
    approvedAt: new Date('2024-01-10'),
    createdAt: new Date('2022-06-15'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: 'doc-010',
    clientId: 'client-003',
    name: 'Risk Assessment Report',
    type: 'compliance',
    classification: 'confidential',
    mimeType: 'application/pdf',
    size: 640000, // ~625 KB
    hash: 'sha256:bcd567efg890...',
    storageKey: 's3://documents/compliance/doc-010.pdf',
    version: 1,
    retentionPolicy: 'REGULATORY_7_YEARS',
    createdBy: 'advisor-002',
    createdAt: new Date('2024-10-20'),
    updatedAt: new Date('2024-10-20'),
  },
];

// Helper to create paginated response
export function getMockDocumentsResponse(
  page = 1,
  pageSize = 10,
  clientId?: string,
  type?: Document['type']
): ApiResponse<Document[]> {
  let filteredDocuments = [...mockDocuments];

  if (clientId) {
    filteredDocuments = filteredDocuments.filter((d) => d.clientId === clientId);
  }

  if (type) {
    filteredDocuments = filteredDocuments.filter((d) => d.type === type);
  }

  const totalItems = filteredDocuments.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex);

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
    data: paginatedDocuments,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
      pagination,
    },
  };
}

// Get single document by ID
export function getMockDocumentById(id: string): ApiResponse<Document> {
  const document = mockDocuments.find((d) => d.id === id);

  if (!document) {
    return {
      success: false,
      error: {
        code: 'NOT_FOUND_ERROR',
        message: `Document with ID ${id} not found`,
      },
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: `mock-${Date.now()}`,
      },
    };
  }

  return {
    success: true,
    data: document,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
    },
  };
}

// Format file size helper
export function formatFileSize(bytes: number): string {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Empty state response
export const emptyDocumentsResponse: ApiResponse<Document[]> = {
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
export const errorDocumentsResponse: ApiResponse<Document[]> = {
  success: false,
  error: {
    code: 'INTERNAL_ERROR',
    message: 'An unexpected error occurred while fetching documents',
    details: { retryable: true },
  },
  metadata: {
    timestamp: new Date().toISOString(),
    requestId: 'mock-error',
  },
};
