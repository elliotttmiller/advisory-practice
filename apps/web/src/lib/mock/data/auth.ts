// Mock authentication data for UI/UX development
import type { User, ApiResponse } from '@financial-advisor/shared';

// Mock users for authentication
export const mockUsers: User[] = [
  {
    id: 'advisor-001',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    roles: ['advisor'],
    status: 'active',
    mfaEnabled: true,
    lastLoginAt: new Date('2024-12-05T08:00:00'),
    createdAt: new Date('2022-01-15'),
    updatedAt: new Date('2024-12-05'),
  },
  {
    id: 'advisor-002',
    email: 'sarah.johnson@example.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    roles: ['advisor'],
    status: 'active',
    mfaEnabled: true,
    lastLoginAt: new Date('2024-12-04T16:30:00'),
    createdAt: new Date('2021-06-10'),
    updatedAt: new Date('2024-12-04'),
  },
  {
    id: 'compliance-001',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    roles: ['compliance_officer'],
    status: 'active',
    mfaEnabled: true,
    lastLoginAt: new Date('2024-12-05T09:15:00'),
    createdAt: new Date('2020-03-20'),
    updatedAt: new Date('2024-12-05'),
  },
  {
    id: 'admin-001',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    roles: ['admin'],
    status: 'active',
    mfaEnabled: true,
    lastLoginAt: new Date('2024-12-05T07:30:00'),
    createdAt: new Date('2019-01-01'),
    updatedAt: new Date('2024-12-05'),
  },
  {
    id: 'client-001',
    email: 'robert.anderson@example.com',
    firstName: 'Robert',
    lastName: 'Anderson',
    roles: ['client'],
    status: 'active',
    mfaEnabled: false,
    lastLoginAt: new Date('2024-12-03T14:20:00'),
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-12-03'),
  },
];

// Auth token response
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

// Login credentials (for mock validation)
export const mockCredentials: Record<string, string> = {
  'john.doe@example.com': 'Password123!',
  'sarah.johnson@example.com': 'Password123!',
  'jane.smith@example.com': 'Password123!',
  'admin@example.com': 'AdminPass123!',
  'robert.anderson@example.com': 'ClientPass123!',
};

// Simulate login
export function mockLogin(
  email: string,
  password: string,
  mfaCode?: string
): ApiResponse<{ user: User; tokens: AuthTokens }> {
  const user = mockUsers.find((u) => u.email === email);
  
  if (!user) {
    return {
      success: false,
      error: {
        code: 'AUTHENTICATION_ERROR',
        message: 'Invalid email or password',
      },
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: `mock-${Date.now()}`,
      },
    };
  }

  const expectedPassword = mockCredentials[email];
  if (password !== expectedPassword) {
    return {
      success: false,
      error: {
        code: 'AUTHENTICATION_ERROR',
        message: 'Invalid email or password',
      },
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: `mock-${Date.now()}`,
      },
    };
  }

  // Simulate MFA check
  if (user.mfaEnabled && mfaCode !== '123456') {
    return {
      success: false,
      error: {
        code: 'AUTHENTICATION_ERROR',
        message: 'Invalid MFA code. Use 123456 for mock mode.',
      },
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: `mock-${Date.now()}`,
      },
    };
  }

  if (user.status !== 'active') {
    return {
      success: false,
      error: {
        code: 'AUTHORIZATION_ERROR',
        message: 'Account is not active',
      },
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: `mock-${Date.now()}`,
      },
    };
  }

  const tokens: AuthTokens = {
    accessToken: `mock-access-token-${Date.now()}`,
    refreshToken: `mock-refresh-token-${Date.now()}`,
    expiresIn: 900, // 15 minutes
    tokenType: 'Bearer',
  };

  return {
    success: true,
    data: { user, tokens },
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
    },
  };
}

// Get current user
export function getMockCurrentUser(userId = 'advisor-001'): ApiResponse<User> {
  const user = mockUsers.find((u) => u.id === userId);
  
  if (!user) {
    return {
      success: false,
      error: {
        code: 'AUTHENTICATION_ERROR',
        message: 'User not found',
      },
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: `mock-${Date.now()}`,
      },
    };
  }

  return {
    success: true,
    data: user,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
    },
  };
}

// Refresh token
export function mockRefreshToken(refreshToken: string): ApiResponse<AuthTokens> {
  // In mock mode, always succeed if token starts with 'mock-'
  if (!refreshToken.startsWith('mock-')) {
    return {
      success: false,
      error: {
        code: 'AUTHENTICATION_ERROR',
        message: 'Invalid refresh token',
      },
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: `mock-${Date.now()}`,
      },
    };
  }

  const tokens: AuthTokens = {
    accessToken: `mock-access-token-${Date.now()}`,
    refreshToken: `mock-refresh-token-${Date.now()}`,
    expiresIn: 900,
    tokenType: 'Bearer',
  };

  return {
    success: true,
    data: tokens,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
    },
  };
}

// Logout
export function mockLogout(): ApiResponse<{ message: string }> {
  return {
    success: true,
    data: { message: 'Logged out successfully' },
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
    },
  };
}
