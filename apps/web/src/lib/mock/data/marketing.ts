// Mock marketing content data for UI/UX development
import type { ApiResponse, PaginationMeta } from '@financial-advisor/shared';

// Marketing content types
export type MarketingContentStatus =
  | 'draft'
  | 'pending_review'
  | 'approved'
  | 'rejected'
  | 'published'
  | 'archived';
export type MarketingContentType =
  | 'newsletter'
  | 'blog_post'
  | 'social_media'
  | 'brochure'
  | 'email_campaign'
  | 'presentation';

export interface MarketingContent {
  id: string;
  title: string;
  type: MarketingContentType;
  status: MarketingContentStatus;
  content: string;
  excerpt: string;
  authorId: string;
  authorName: string;
  reviewerId?: string;
  reviewerName?: string;
  reviewNotes?: string;
  complianceChecks: string[];
  tags: string[];
  targetAudience: string;
  scheduledPublishDate?: Date;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Generate mock marketing content
export const mockMarketingContent: MarketingContent[] = [
  {
    id: 'mkt-001',
    title: 'Q4 2024 Investment Outlook Newsletter',
    type: 'newsletter',
    status: 'pending_review',
    content:
      'As we approach the final quarter of 2024, market conditions present both opportunities and considerations for investors...',
    excerpt: 'Quarterly market analysis and investment strategies for Q4 2024.',
    authorId: 'advisor-001',
    authorName: 'John Doe',
    complianceChecks: ['compliance-001'],
    tags: ['market-outlook', 'quarterly-update', 'investment-strategy'],
    targetAudience: 'All Clients',
    createdAt: new Date('2024-11-01'),
    updatedAt: new Date('2024-11-20'),
  },
  {
    id: 'mkt-002',
    title: 'Understanding Tax-Efficient Investing',
    type: 'blog_post',
    status: 'approved',
    content:
      'Tax-efficient investing is a strategy that aims to minimize the tax impact of your investment portfolio...',
    excerpt: 'Learn strategies to optimize your investments for tax efficiency.',
    authorId: 'advisor-001',
    authorName: 'John Doe',
    reviewerId: 'compliance-001',
    reviewerName: 'Jane Smith',
    complianceChecks: ['compliance-008'],
    tags: ['tax-planning', 'investment-strategy', 'education'],
    targetAudience: 'High Net Worth Clients',
    publishedAt: new Date('2024-11-18'),
    createdAt: new Date('2024-11-10'),
    updatedAt: new Date('2024-11-18'),
  },
  {
    id: 'mkt-003',
    title: 'Retirement Planning Webinar Announcement',
    type: 'social_media',
    status: 'published',
    content:
      '🎯 Join us for our upcoming webinar on Retirement Planning Essentials! Learn about 401(k) optimization, Social Security strategies, and more...',
    excerpt: 'Announcement for December retirement planning webinar.',
    authorId: 'advisor-002',
    authorName: 'Sarah Johnson',
    reviewerId: 'compliance-001',
    reviewerName: 'Jane Smith',
    complianceChecks: ['compliance-002'],
    tags: ['webinar', 'retirement', 'event'],
    targetAudience: 'Prospects and Clients',
    publishedAt: new Date('2024-12-01'),
    createdAt: new Date('2024-11-25'),
    updatedAt: new Date('2024-12-01'),
  },
  {
    id: 'mkt-004',
    title: 'Firm Capabilities Brochure 2025',
    type: 'brochure',
    status: 'draft',
    content:
      'Welcome to Financial Advisor Platform. For over 25 years, we have been helping individuals and families achieve their financial goals...',
    excerpt: 'Updated firm brochure showcasing services and capabilities.',
    authorId: 'advisor-001',
    authorName: 'John Doe',
    complianceChecks: [],
    tags: ['firm-profile', 'capabilities', 'services'],
    targetAudience: 'Prospects',
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-04'),
  },
  {
    id: 'mkt-005',
    title: 'Year-End Financial Planning Checklist',
    type: 'email_campaign',
    status: 'approved',
    content:
      'Dear Valued Client, As 2024 draws to a close, here are important financial planning items to consider...',
    excerpt: 'Annual checklist for clients to review before year-end.',
    authorId: 'advisor-002',
    authorName: 'Sarah Johnson',
    reviewerId: 'compliance-002',
    reviewerName: 'Mike Chen',
    complianceChecks: [],
    tags: ['year-end', 'planning', 'checklist'],
    targetAudience: 'Active Clients',
    scheduledPublishDate: new Date('2024-12-10'),
    createdAt: new Date('2024-11-15'),
    updatedAt: new Date('2024-12-02'),
  },
  {
    id: 'mkt-006',
    title: 'Market Volatility Educational Guide',
    type: 'presentation',
    status: 'rejected',
    content: 'Understanding market volatility and maintaining a long-term perspective...',
    excerpt: 'Educational presentation about navigating market volatility.',
    authorId: 'advisor-001',
    authorName: 'John Doe',
    reviewerId: 'compliance-001',
    reviewerName: 'Jane Smith',
    reviewNotes:
      'Performance comparisons need additional context and disclosures. Please revise slides 8-12.',
    complianceChecks: ['compliance-004'],
    tags: ['education', 'volatility', 'market-conditions'],
    targetAudience: 'All Clients',
    createdAt: new Date('2024-11-20'),
    updatedAt: new Date('2024-11-25'),
  },
  {
    id: 'mkt-007',
    title: 'New Client Welcome Email Series',
    type: 'email_campaign',
    status: 'published',
    content: 'Welcome to our firm! We are excited to begin this journey with you...',
    excerpt: 'Automated welcome email series for new clients.',
    authorId: 'advisor-002',
    authorName: 'Sarah Johnson',
    reviewerId: 'compliance-001',
    reviewerName: 'Jane Smith',
    complianceChecks: [],
    tags: ['onboarding', 'welcome', 'automation'],
    targetAudience: 'New Clients',
    publishedAt: new Date('2024-09-01'),
    createdAt: new Date('2024-08-15'),
    updatedAt: new Date('2024-09-01'),
  },
  {
    id: 'mkt-008',
    title: 'Estate Planning Essentials Blog Post',
    type: 'blog_post',
    status: 'pending_review',
    content:
      'Estate planning is one of the most important financial decisions you can make for your family...',
    excerpt: 'Comprehensive guide to estate planning fundamentals.',
    authorId: 'advisor-001',
    authorName: 'John Doe',
    complianceChecks: [],
    tags: ['estate-planning', 'education', 'wealth-transfer'],
    targetAudience: 'High Net Worth Clients',
    createdAt: new Date('2024-12-02'),
    updatedAt: new Date('2024-12-03'),
  },
];

// Marketing leads
export interface MarketingLead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  source: string;
  campaign?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  score: number;
  notes?: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const mockMarketingLeads: MarketingLead[] = [
  {
    id: 'lead-001',
    firstName: 'James',
    lastName: 'Patterson',
    email: 'james.patterson@example.com',
    phone: '+1 (555) 111-2222',
    source: 'Website Contact Form',
    campaign: 'Q4 Newsletter',
    status: 'new',
    score: 75,
    createdAt: new Date('2024-12-03'),
    updatedAt: new Date('2024-12-03'),
  },
  {
    id: 'lead-002',
    firstName: 'Amanda',
    lastName: 'Clark',
    email: 'amanda.clark@example.com',
    source: 'Webinar Registration',
    campaign: 'Retirement Planning Webinar',
    status: 'contacted',
    score: 85,
    notes: 'Scheduled introductory call for 12/10',
    assignedTo: 'advisor-001',
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-04'),
  },
  {
    id: 'lead-003',
    firstName: 'Thomas',
    lastName: 'Wright',
    email: 'thomas.wright@example.com',
    phone: '+1 (555) 333-4444',
    source: 'Referral',
    status: 'qualified',
    score: 95,
    notes: 'Referred by client Robert Anderson. High net worth prospect.',
    assignedTo: 'advisor-001',
    createdAt: new Date('2024-11-25'),
    updatedAt: new Date('2024-12-02'),
  },
  {
    id: 'lead-004',
    firstName: 'Michelle',
    lastName: 'Lee',
    email: 'michelle.lee@example.com',
    source: 'LinkedIn',
    campaign: 'Social Media Outreach',
    status: 'contacted',
    score: 60,
    assignedTo: 'advisor-002',
    createdAt: new Date('2024-11-28'),
    updatedAt: new Date('2024-12-01'),
  },
  {
    id: 'lead-005',
    firstName: 'Daniel',
    lastName: 'Moore',
    email: 'daniel.moore@example.com',
    phone: '+1 (555) 555-6666',
    source: 'Event - Financial Planning Seminar',
    status: 'converted',
    score: 100,
    notes: 'Converted to client on 11/20/2024',
    assignedTo: 'advisor-002',
    createdAt: new Date('2024-10-15'),
    updatedAt: new Date('2024-11-20'),
  },
];

// Helper to create paginated response for marketing content
export function getMockMarketingContentResponse(
  page = 1,
  pageSize = 10,
  status?: MarketingContentStatus,
  type?: MarketingContentType
): ApiResponse<MarketingContent[]> {
  let filteredContent = [...mockMarketingContent];

  if (status) {
    filteredContent = filteredContent.filter((c) => c.status === status);
  }

  if (type) {
    filteredContent = filteredContent.filter((c) => c.type === type);
  }

  const totalItems = filteredContent.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedContent = filteredContent.slice(startIndex, endIndex);

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
    data: paginatedContent,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
      pagination,
    },
  };
}

// Helper to create paginated response for leads
export function getMockLeadsResponse(
  page = 1,
  pageSize = 10,
  status?: MarketingLead['status']
): ApiResponse<MarketingLead[]> {
  let filteredLeads = [...mockMarketingLeads];

  if (status) {
    filteredLeads = filteredLeads.filter((l) => l.status === status);
  }

  const totalItems = filteredLeads.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedLeads = filteredLeads.slice(startIndex, endIndex);

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
    data: paginatedLeads,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
      pagination,
    },
  };
}

// Get single marketing content by ID
export function getMockMarketingContentById(id: string): ApiResponse<MarketingContent> {
  const content = mockMarketingContent.find((c) => c.id === id);

  if (!content) {
    return {
      success: false,
      error: {
        code: 'NOT_FOUND_ERROR',
        message: `Marketing content with ID ${id} not found`,
      },
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: `mock-${Date.now()}`,
      },
    };
  }

  return {
    success: true,
    data: content,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: `mock-${Date.now()}`,
    },
  };
}

// Empty state response
export const emptyMarketingResponse: ApiResponse<MarketingContent[]> = {
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
export const errorMarketingResponse: ApiResponse<MarketingContent[]> = {
  success: false,
  error: {
    code: 'INTERNAL_ERROR',
    message: 'An unexpected error occurred while fetching marketing content',
    details: { retryable: true },
  },
  metadata: {
    timestamp: new Date().toISOString(),
    requestId: 'mock-error',
  },
};
