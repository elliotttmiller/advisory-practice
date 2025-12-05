'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

// Mock marketing data
const mockLeads = [
  {
    id: 'lead-001',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@email.com',
    phone: '(555) 567-8901',
    source: 'website' as const,
    status: 'new' as const,
    score: 75,
    createdAt: new Date('2024-12-05'),
  },
  {
    id: 'lead-002',
    firstName: 'Lisa',
    lastName: 'Wilson',
    email: 'lisa.wilson@email.com',
    phone: '(555) 678-9012',
    source: 'referral' as const,
    status: 'contacted' as const,
    score: 90,
    createdAt: new Date('2024-12-03'),
  },
  {
    id: 'lead-003',
    firstName: 'David',
    lastName: 'Lee',
    email: 'david.lee@email.com',
    phone: '(555) 789-0123',
    source: 'event' as const,
    status: 'qualified' as const,
    score: 85,
    createdAt: new Date('2024-12-01'),
  },
];

const mockContent = [
  {
    id: 'content-001',
    title: 'Q4 Newsletter - Market Update',
    type: 'newsletter' as const,
    status: 'pending_review' as const,
    author: 'Sarah Johnson',
    createdAt: new Date('2024-12-03'),
  },
  {
    id: 'content-002',
    title: 'Year-End Tax Planning Tips',
    type: 'blog' as const,
    status: 'approved' as const,
    author: 'John Doe',
    createdAt: new Date('2024-11-28'),
    publishedAt: new Date('2024-12-01'),
  },
  {
    id: 'content-003',
    title: 'New Client Welcome Email',
    type: 'email' as const,
    status: 'published' as const,
    author: 'Marketing Team',
    createdAt: new Date('2024-11-15'),
    publishedAt: new Date('2024-11-20'),
  },
  {
    id: 'content-004',
    title: 'Retirement Planning Webinar Promo',
    type: 'social' as const,
    status: 'draft' as const,
    author: 'Sarah Johnson',
    createdAt: new Date('2024-12-04'),
  },
];

type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
type ContentStatus = 'draft' | 'pending_review' | 'approved' | 'published' | 'archived';

const leadStatusColors: Record<LeadStatus, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  qualified: 'bg-green-100 text-green-800',
  converted: 'bg-purple-100 text-purple-800',
  lost: 'bg-gray-100 text-gray-800',
};

const contentStatusColors: Record<ContentStatus, string> = {
  draft: 'bg-gray-100 text-gray-800',
  pending_review: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-blue-100 text-blue-800',
  published: 'bg-green-100 text-green-800',
  archived: 'bg-gray-100 text-gray-600',
};

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState<'leads' | 'content'>('leads');

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const leadStats = {
    total: mockLeads.length,
    newLeads: mockLeads.filter((l) => l.status === 'new').length,
    avgScore: Math.round(mockLeads.reduce((sum, l) => sum + l.score, 0) / mockLeads.length),
  };

  return (
    <DashboardLayout userRole="advisor">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-900">Marketing</h1>
        <p className="text-secondary-600 mt-1">
          Manage leads and marketing content with compliance oversight
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card">
          <p className="text-sm text-secondary-500">Total Leads</p>
          <p className="text-2xl font-bold text-secondary-900">{leadStats.total}</p>
        </div>
        <div className="card">
          <p className="text-sm text-secondary-500">New This Month</p>
          <p className="text-2xl font-bold text-blue-600">{leadStats.newLeads}</p>
        </div>
        <div className="card">
          <p className="text-sm text-secondary-500">Avg Lead Score</p>
          <p className="text-2xl font-bold text-green-600">{leadStats.avgScore}</p>
        </div>
        <div className="card">
          <p className="text-sm text-secondary-500">Pending Content</p>
          <p className="text-2xl font-bold text-yellow-600">
            {mockContent.filter((c) => c.status === 'pending_review').length}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-secondary-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('leads')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'leads'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            Leads
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'content'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            Marketing Content
          </button>
        </nav>
      </div>

      {activeTab === 'leads' && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-secondary-900">Lead Pipeline</h2>
            <button className="btn-primary text-sm">Add Lead</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead className="bg-secondary-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                    Lead
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                    Created
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {mockLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-secondary-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-secondary-900">
                          {lead.firstName} {lead.lastName}
                        </p>
                        <p className="text-sm text-secondary-500">{lead.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500 capitalize">
                      {lead.source}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-secondary-100 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              lead.score >= 80
                                ? 'bg-green-500'
                                : lead.score >= 60
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                            }`}
                            style={{ width: `${lead.score}%` }}
                          />
                        </div>
                        <span className="text-sm text-secondary-900">{lead.score}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${leadStatusColors[lead.status]}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                      {formatDate(lead.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'content' && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-secondary-900">Marketing Content</h2>
            <button className="btn-primary text-sm">Create Content</button>
          </div>
          <div className="space-y-4">
            {mockContent.map((content) => (
              <div
                key={content.id}
                className="p-4 border border-secondary-200 rounded-lg hover:border-primary-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-secondary-900">{content.title}</h3>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${contentStatusColors[content.status]}`}
                      >
                        {content.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-secondary-500">
                      <span className="capitalize">{content.type}</span>
                      <span>•</span>
                      <span>By {content.author}</span>
                      <span>•</span>
                      <span>Created {formatDate(content.createdAt)}</span>
                      {content.publishedAt && (
                        <>
                          <span>•</span>
                          <span>Published {formatDate(content.publishedAt)}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {content.status === 'draft' && (
                      <button className="btn-outline text-sm">Submit for Review</button>
                    )}
                    {content.status === 'approved' && (
                      <button className="btn-primary text-sm">Publish</button>
                    )}
                    <button className="btn-outline text-sm">Edit</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
