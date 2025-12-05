'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

// Mock documents data
const mockDocuments = [
  {
    id: 'doc-001',
    name: 'Investment Policy Statement - Robert Anderson',
    type: 'contract' as const,
    classification: 'confidential' as const,
    clientName: 'Robert Anderson',
    size: 245000,
    uploadedBy: 'John Doe',
    uploadedAt: new Date('2024-01-20'),
    status: 'approved' as const,
  },
  {
    id: 'doc-002',
    name: 'Q4 2024 Performance Report',
    type: 'statement' as const,
    classification: 'confidential' as const,
    clientName: 'Jennifer Martinez',
    size: 512000,
    uploadedBy: 'System',
    uploadedAt: new Date('2024-12-01'),
    status: 'approved' as const,
  },
  {
    id: 'doc-003',
    name: 'Marketing Newsletter Draft - December',
    type: 'marketing' as const,
    classification: 'regulatory' as const,
    clientName: null,
    size: 178000,
    uploadedBy: 'Sarah Johnson',
    uploadedAt: new Date('2024-12-03'),
    status: 'pending' as const,
  },
  {
    id: 'doc-004',
    name: 'Tax Documents 2023 - William Thompson',
    type: 'tax' as const,
    classification: 'confidential' as const,
    clientName: 'William Thompson',
    size: 890000,
    uploadedBy: 'John Doe',
    uploadedAt: new Date('2024-01-15'),
    status: 'approved' as const,
  },
  {
    id: 'doc-005',
    name: 'Client Agreement Template v2.1',
    type: 'contract' as const,
    classification: 'regulatory' as const,
    clientName: null,
    size: 156000,
    uploadedBy: 'Legal Team',
    uploadedAt: new Date('2024-11-28'),
    status: 'pending' as const,
  },
  {
    id: 'doc-006',
    name: 'Form ADV Part 2A - 2024',
    type: 'disclosure' as const,
    classification: 'public' as const,
    clientName: null,
    size: 425000,
    uploadedBy: 'Compliance Team',
    uploadedAt: new Date('2024-03-01'),
    status: 'approved' as const,
  },
];

type DocType = 'contract' | 'disclosure' | 'statement' | 'tax' | 'marketing' | 'correspondence';
type DocStatus = 'pending' | 'approved' | 'rejected';

const typeColors: Record<DocType, string> = {
  contract: 'bg-blue-100 text-blue-800',
  disclosure: 'bg-purple-100 text-purple-800',
  statement: 'bg-green-100 text-green-800',
  tax: 'bg-yellow-100 text-yellow-800',
  marketing: 'bg-orange-100 text-orange-800',
  correspondence: 'bg-gray-100 text-gray-800',
};

const statusColors: Record<DocStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.clientName && doc.clientName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const formatSize = (bytes: number) => {
    if (bytes < 1024) {
      return bytes + ' B';
    }
    if (bytes < 1048576) {
      return (bytes / 1024).toFixed(1) + ' KB';
    }
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <DashboardLayout userRole="advisor">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">Documents</h1>
            <p className="text-secondary-600 mt-1">
              Manage client documents, contracts, and compliance materials
            </p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            Upload Document
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-secondary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="input pl-10"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              className="input w-auto"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="contract">Contract</option>
              <option value="disclosure">Disclosure</option>
              <option value="statement">Statement</option>
              <option value="tax">Tax</option>
              <option value="marketing">Marketing</option>
            </select>
            <select
              className="input w-auto"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                  Uploaded
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                  Status
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-secondary-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-secondary-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-900">{doc.name}</p>
                        <p className="text-xs text-secondary-500">by {doc.uploadedBy}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${typeColors[doc.type as DocType] || 'bg-gray-100 text-gray-800'}`}
                    >
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                    {doc.clientName || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                    {formatSize(doc.size)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                    {formatDate(doc.uploadedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[doc.status]}`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-4">
                      View
                    </button>
                    <button className="text-primary-600 hover:text-primary-900">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-secondary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-secondary-900">No documents found</h3>
            <p className="mt-1 text-sm text-secondary-500">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
