// Mock client data for UI/UX development
import type { Client, ApiResponse, PaginationMeta } from '@financial-advisor/shared';

// Generate mock clients for different states
export const mockClients: Client[] = [
  {
    id: 'client-001',
    userId: 'user-001',
    firstName: 'Robert',
    lastName: 'Anderson',
    email: 'robert.anderson@example.com',
    phone: '+1 (555) 123-4567',
    status: 'client',
    riskTolerance: 'moderate',
    investmentObjectives: ['growth', 'income'],
    assetsUnderManagement: 2500000,
    onboardingStatus: 'approved',
    advisorId: 'advisor-001',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-11-20'),
  },
  {
    id: 'client-002',
    userId: 'user-002',
    firstName: 'Jennifer',
    lastName: 'Martinez',
    email: 'jennifer.martinez@example.com',
    phone: '+1 (555) 234-5678',
    status: 'client',
    riskTolerance: 'aggressive',
    investmentObjectives: ['growth', 'speculation'],
    assetsUnderManagement: 5750000,
    onboardingStatus: 'approved',
    advisorId: 'advisor-001',
    createdAt: new Date('2022-06-10'),
    updatedAt: new Date('2024-12-01'),
  },
  {
    id: 'client-003',
    userId: 'user-003',
    firstName: 'William',
    lastName: 'Thompson',
    email: 'william.thompson@example.com',
    phone: '+1 (555) 345-6789',
    status: 'client',
    riskTolerance: 'conservative',
    investmentObjectives: ['capital_preservation', 'income'],
    assetsUnderManagement: 1250000,
    onboardingStatus: 'approved',
    advisorId: 'advisor-002',
    createdAt: new Date('2023-08-22'),
    updatedAt: new Date('2024-10-15'),
  },
  {
    id: 'client-004',
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'sarah.wilson@example.com',
    phone: '+1 (555) 456-7890',
    status: 'prospect',
    riskTolerance: 'moderate',
    investmentObjectives: ['growth', 'tax_efficiency'],
    assetsUnderManagement: 0,
    onboardingStatus: 'kyc_required',
    advisorId: 'advisor-001',
    createdAt: new Date('2024-11-28'),
    updatedAt: new Date('2024-12-03'),
  },
  {
    id: 'client-005',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@example.com',
    phone: '+1 (555) 567-8901',
    status: 'lead',
    riskTolerance: 'aggressive',
    investmentObjectives: ['growth'],
    assetsUnderManagement: 0,
    onboardingStatus: 'pending',
    advisorId: 'advisor-002',
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-04'),
  },
  {
    id: 'client-006',
    userId: 'user-006',
    firstName: 'Emily',
    lastName: 'Johnson',
    email: 'emily.johnson@example.com',
    phone: '+1 (555) 678-9012',
    status: 'client',
    riskTolerance: 'moderate',
    investmentObjectives: ['income', 'capital_preservation'],
    assetsUnderManagement: 3100000,
    onboardingStatus: 'approved',
    advisorId: 'advisor-001',
    createdAt: new Date('2021-03-18'),
    updatedAt: new Date('2024-11-10'),
  },
  {
    id: 'client-007',
    userId: 'user-007',
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@example.com',
    phone: '+1 (555) 789-0123',
    status: 'inactive',
    riskTolerance: 'conservative',
    investmentObjectives: ['capital_preservation'],
    assetsUnderManagement: 850000,
    onboardingStatus: 'approved',
    advisorId: 'advisor-002',
    createdAt: new Date('2020-09-05'),
    updatedAt: new Date('2024-06-15'),
  },
  {
    id: 'client-008',
    firstName: 'Lisa',
    lastName: 'Garcia',
    email: 'lisa.garcia@example.com',
    status: 'prospect',
    riskTolerance: 'moderate',
    investmentObjectives: ['growth', 'income'],
    assetsUnderManagement: 0,
    onboardingStatus: 'documents_required',
    advisorId: 'advisor-001',
    createdAt: new Date('2024-11-15'),
    updatedAt: new Date('2024-12-02'),
  },
];

// Helper to create paginated response
export function getMockClientsResponse(
  page = 1,
  pageSize = 10,
  status?: Client['status']
): ApiResponse<Client[]> {
  let filteredClients = [...mockClients];

  if (status) {
    filteredClients = filteredClients.filter((c) => c.status === status);
  }

  const totalItems = filteredClients.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedClients = filteredClients.slice(startIndex, endIndex);

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
    data: paginatedClients,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
      pagination,
    },
  };
}

// Get single client by ID
export function getMockClientById(id: string): ApiResponse<Client> {
  const client = mockClients.find((c) => c.id === id);

  if (!client) {
    return {
      success: false,
      error: {
        code: 'NOT_FOUND_ERROR',
        message: `Client with ID ${id} not found`,
      },
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: `mock-${Date.now()}`,
      },
    };
  }

  return {
    success: true,
    data: client,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
    },
  };
}

// Empty state response
export const emptyClientsResponse: ApiResponse<Client[]> = {
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
export const errorClientsResponse: ApiResponse<Client[]> = {
  success: false,
  error: {
    code: 'INTERNAL_ERROR',
    message: 'An unexpected error occurred while fetching clients',
    details: { retryable: true },
  },
  metadata: {
    timestamp: new Date().toISOString(),
    requestId: 'mock-error',
  },
};
