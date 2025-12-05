// API Service - Routes requests to mock or real API based on environment
import type { ApiResponse } from '@financial-advisor/shared';
import { isMockModeEnabled, mockApiClient } from './mock/mock-api';

// API base URL configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// Request options interface
interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  params?: Record<string, string | number | undefined>;
  headers?: Record<string, string>;
}

// Build query string from params
function buildQueryString(params?: Record<string, string | number | undefined>): string {
  if (!params) {
    return '';
  }
  
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

// Main API client
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Generic request handler
  async request<T>(
    endpoint: string,
    options: ApiRequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { method = 'GET', body, params, headers = {} } = options;

    // Use mock API if mock mode is enabled
    if (isMockModeEnabled()) {
      const mockOptions: { method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; body?: unknown; params?: Record<string, string | number | undefined> } = { method };
      if (body !== undefined) {
        mockOptions.body = body;
      }
      if (params !== undefined) {
        mockOptions.params = params;
      }
      return mockApiClient.request<T>(endpoint, mockOptions);
    }

    // Make real API request
    const url = `${this.baseUrl}${endpoint}${buildQueryString(params)}`;

    try {
      const fetchOptions: globalThis.RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        credentials: 'include',
      };

      if (body !== undefined) {
        fetchOptions.body = JSON.stringify(body);
      }

      const response = await fetch(url, fetchOptions);

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || {
            code: 'API_ERROR',
            message: data.message || 'An error occurred',
          },
          metadata: {
            timestamp: new Date().toISOString(),
            requestId: response.headers.get('x-request-id') || `req-${Date.now()}`,
          },
        };
      }

      return {
        success: true,
        data: data.data || data,
        metadata: data.metadata || {
          timestamp: new Date().toISOString(),
          requestId: response.headers.get('x-request-id') || `req-${Date.now()}`,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'Network error occurred',
        },
        metadata: {
          timestamp: new Date().toISOString(),
          requestId: `error-${Date.now()}`,
        },
      };
    }
  }

  // Convenience methods
  async get<T>(endpoint: string, params?: Record<string, string | number | undefined>): Promise<ApiResponse<T>> {
    const options: ApiRequestOptions = { method: 'GET' };
    if (params !== undefined) {
      options.params = params;
    }
    return this.request<T>(endpoint, options);
  }

  async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    const options: ApiRequestOptions = { method: 'POST' };
    if (body !== undefined) {
      options.body = body;
    }
    return this.request<T>(endpoint, options);
  }

  async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    const options: ApiRequestOptions = { method: 'PUT' };
    if (body !== undefined) {
      options.body = body;
    }
    return this.request<T>(endpoint, options);
  }

  async patch<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    const options: ApiRequestOptions = { method: 'PATCH' };
    if (body !== undefined) {
      options.body = body;
    }
    return this.request<T>(endpoint, options);
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Create and export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export type for external use
export type { ApiRequestOptions };
