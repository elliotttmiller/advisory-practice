// Mock API Service for UI/UX Development Mode
// This service intercepts API calls when NEXT_PUBLIC_MOCK_MODE=true
// and returns pre-defined mock data instead of making network requests.

import type { ApiResponse } from '@financial-advisor/shared';
import * as mockData from './data';

// Check if mock mode is enabled
export function isMockModeEnabled(): boolean {
  return process.env.NEXT_PUBLIC_MOCK_MODE === 'true';
}

// Simulate network delay
const simulateDelay = (ms = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Type for API methods
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// Request options interface
interface MockRequestOptions {
  method?: HttpMethod;
  body?: unknown;
  params?: Record<string, string | number | undefined>;
  delay?: number;
}

// Mock API client
class MockApiClient {
  private baseUrl: string;
  private defaultDelay: number;

  constructor(baseUrl = '/api/v1', defaultDelay = 300) {
    this.baseUrl = baseUrl;
    this.defaultDelay = defaultDelay;
  }

  // Generic request handler
  async request<T>(
    endpoint: string,
    options: MockRequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { method = 'GET', body, params, delay = this.defaultDelay } = options;

    // Simulate network delay
    await simulateDelay(delay);

    // Parse the endpoint to determine which mock data to return
    const response = this.routeRequest<T>(endpoint, method, body, params);

    return response;
  }

  // Route requests to appropriate mock handlers
  private routeRequest<T>(
    endpoint: string,
    method: HttpMethod,
    body?: unknown,
    params?: Record<string, string | number | undefined>
  ): ApiResponse<T> {
    // Normalize endpoint
    const normalizedEndpoint = endpoint.replace(this.baseUrl, '').replace(/^\//, '');
    const [resource, id, subResource] = normalizedEndpoint.split('/');

    // Route to appropriate handler
    switch (resource) {
      case 'auth':
        return this.handleAuthRequest(normalizedEndpoint, method, body) as ApiResponse<T>;
      case 'clients':
        return this.handleClientsRequest(id, subResource, method, body, params) as ApiResponse<T>;
      case 'documents':
        return this.handleDocumentsRequest(id, method, body, params) as ApiResponse<T>;
      case 'compliance':
        return this.handleComplianceRequest(id, subResource, method, params) as ApiResponse<T>;
      case 'marketing':
        return this.handleMarketingRequest(id, subResource, method, params) as ApiResponse<T>;
      case 'reports':
      case 'dashboard':
        return this.handleReportsRequest(normalizedEndpoint, params) as ApiResponse<T>;
      default:
        return {
          success: false,
          error: {
            code: 'NOT_FOUND_ERROR',
            message: `Endpoint ${endpoint} not found in mock mode`,
          },
          metadata: {
            timestamp: new Date().toISOString(),
            requestId: `mock-${Date.now()}`,
          },
        };
    }
  }

  // Auth handlers
  private handleAuthRequest(
    endpoint: string,
    method: HttpMethod,
    body?: unknown
  ): ApiResponse<unknown> {
    if (endpoint.includes('login') && method === 'POST') {
      const { email, password, mfaCode } = body as {
        email: string;
        password: string;
        mfaCode?: string;
      };
      return mockData.mockLogin(email, password, mfaCode);
    }

    if (endpoint.includes('refresh') && method === 'POST') {
      const { refreshToken } = body as { refreshToken: string };
      return mockData.mockRefreshToken(refreshToken);
    }

    if (endpoint.includes('logout') && method === 'POST') {
      return mockData.mockLogout();
    }

    if (endpoint.includes('me') && method === 'GET') {
      return mockData.getMockCurrentUser();
    }

    return {
      success: false,
      error: {
        code: 'NOT_FOUND_ERROR',
        message: 'Auth endpoint not found',
      },
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: `mock-${Date.now()}`,
      },
    };
  }

  // Clients handlers
  private handleClientsRequest(
    id?: string,
    _subResource?: string,
    method?: HttpMethod,
    _body?: unknown,
    params?: Record<string, string | number | undefined>
  ): ApiResponse<unknown> {
    if (method === 'GET') {
      if (id) {
        return mockData.getMockClientById(id);
      }
      const page = Number(params?.page) || 1;
      const pageSize = Number(params?.pageSize) || 10;
      const status = params?.status as Parameters<typeof mockData.getMockClientsResponse>[2];
      return mockData.getMockClientsResponse(page, pageSize, status);
    }

    // For POST, PUT, DELETE - return success with mock data
    return {
      success: true,
      data: { message: 'Operation successful in mock mode' },
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: `mock-${Date.now()}`,
      },
    };
  }

  // Documents handlers
  private handleDocumentsRequest(
    id?: string,
    method?: HttpMethod,
    _body?: unknown,
    params?: Record<string, string | number | undefined>
  ): ApiResponse<unknown> {
    if (method === 'GET') {
      if (id) {
        return mockData.getMockDocumentById(id);
      }
      const page = Number(params?.page) || 1;
      const pageSize = Number(params?.pageSize) || 10;
      const clientId = params?.clientId as string | undefined;
      const type = params?.type as Parameters<typeof mockData.getMockDocumentsResponse>[3];
      return mockData.getMockDocumentsResponse(page, pageSize, clientId, type);
    }

    return {
      success: true,
      data: { message: 'Operation successful in mock mode' },
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: `mock-${Date.now()}`,
      },
    };
  }

  // Compliance handlers
  private handleComplianceRequest(
    id?: string,
    subResource?: string,
    method?: HttpMethod,
    params?: Record<string, string | number | undefined>
  ): ApiResponse<unknown> {
    if (subResource === 'stats' || id === 'stats') {
      return mockData.getMockComplianceStatsResponse();
    }

    if (method === 'GET') {
      if (id && id !== 'stats') {
        return mockData.getMockComplianceCheckById(id);
      }
      const page = Number(params?.page) || 1;
      const pageSize = Number(params?.pageSize) || 10;
      const status = params?.status as Parameters<typeof mockData.getMockComplianceChecksResponse>[2];
      const type = params?.type as Parameters<typeof mockData.getMockComplianceChecksResponse>[3];
      return mockData.getMockComplianceChecksResponse(page, pageSize, status, type);
    }

    return {
      success: true,
      data: { message: 'Operation successful in mock mode' },
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: `mock-${Date.now()}`,
      },
    };
  }

  // Marketing handlers
  private handleMarketingRequest(
    id?: string,
    subResource?: string,
    method?: HttpMethod,
    params?: Record<string, string | number | undefined>
  ): ApiResponse<unknown> {
    if (subResource === 'leads' || id === 'leads') {
      const page = Number(params?.page) || 1;
      const pageSize = Number(params?.pageSize) || 10;
      const status = params?.status as Parameters<typeof mockData.getMockLeadsResponse>[2];
      return mockData.getMockLeadsResponse(page, pageSize, status);
    }

    if (method === 'GET') {
      if (id && id !== 'leads' && id !== 'content') {
        return mockData.getMockMarketingContentById(id);
      }
      const page = Number(params?.page) || 1;
      const pageSize = Number(params?.pageSize) || 10;
      const status = params?.status as Parameters<typeof mockData.getMockMarketingContentResponse>[2];
      const type = params?.type as Parameters<typeof mockData.getMockMarketingContentResponse>[3];
      return mockData.getMockMarketingContentResponse(page, pageSize, status, type);
    }

    return {
      success: true,
      data: { message: 'Operation successful in mock mode' },
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: `mock-${Date.now()}`,
      },
    };
  }

  // Reports handlers
  private handleReportsRequest(
    endpoint: string,
    params?: Record<string, string | number | undefined>
  ): ApiResponse<unknown> {
    if (endpoint.includes('metrics') || endpoint.includes('dashboard')) {
      return mockData.getMockDashboardMetricsResponse();
    }

    if (endpoint.includes('revenue')) {
      return mockData.getMockRevenueMetricsResponse();
    }

    if (endpoint.includes('client-growth')) {
      return mockData.getMockClientGrowthMetricsResponse();
    }

    if (endpoint.includes('aum-distribution')) {
      return mockData.getMockAUMDistributionResponse();
    }

    if (endpoint.includes('compliance-report')) {
      return mockData.getMockComplianceReportResponse();
    }

    if (endpoint.includes('activity') || endpoint.includes('audit-logs')) {
      const limit = Number(params?.limit) || 10;
      return mockData.getMockActivityLogResponse(limit);
    }

    if (endpoint.includes('pending-approvals')) {
      return mockData.getMockPendingApprovalsResponse();
    }

    // Default to dashboard metrics
    return mockData.getMockDashboardMetricsResponse();
  }

  // Convenience methods
  async get<T>(endpoint: string, params?: Record<string, string | number | undefined>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, params ? { method: 'GET', params } : { method: 'GET' });
  }

  async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body });
  }

  async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }

  async patch<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PATCH', body });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Create singleton instance
export const mockApiClient = new MockApiClient();

// Export mock data for direct access when needed
export { mockData };
