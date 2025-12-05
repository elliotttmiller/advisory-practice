'use client';

import { useState } from 'react';
import ClientPortalLayout from '@/components/ClientPortalLayout';

// Mock documents data
const mockDocuments = [
  {
    id: 'doc-001',
    name: 'Q4 2024 Statement',
    type: 'statement',
    category: 'Statements',
    date: new Date('2024-12-01'),
    size: 245000,
  },
  {
    id: 'doc-002',
    name: 'Q3 2024 Statement',
    type: 'statement',
    category: 'Statements',
    date: new Date('2024-09-01'),
    size: 312000,
  },
  {
    id: 'doc-003',
    name: 'Q2 2024 Statement',
    type: 'statement',
    category: 'Statements',
    date: new Date('2024-06-01'),
    size: 289000,
  },
  {
    id: 'doc-004',
    name: 'Q1 2024 Statement',
    type: 'statement',
    category: 'Statements',
    date: new Date('2024-03-01'),
    size: 267000,
  },
  {
    id: 'doc-005',
    name: 'Tax Documents 2023',
    type: 'tax',
    category: 'Tax Documents',
    date: new Date('2024-01-15'),
    size: 890000,
  },
  {
    id: 'doc-006',
    name: '1099-DIV 2023',
    type: 'tax',
    category: 'Tax Documents',
    date: new Date('2024-01-15'),
    size: 125000,
  },
  {
    id: 'doc-007',
    name: '1099-B 2023',
    type: 'tax',
    category: 'Tax Documents',
    date: new Date('2024-01-15'),
    size: 345000,
  },
  {
    id: 'doc-008',
    name: 'Investment Policy Statement',
    type: 'contract',
    category: 'Agreements',
    date: new Date('2023-01-20'),
    size: 156000,
  },
  {
    id: 'doc-009',
    name: 'Account Agreement',
    type: 'contract',
    category: 'Agreements',
    date: new Date('2023-01-20'),
    size: 234000,
  },
  {
    id: 'doc-010',
    name: 'Privacy Policy',
    type: 'disclosure',
    category: 'Disclosures',
    date: new Date('2024-01-01'),
    size: 78000,
  },
  {
    id: 'doc-011',
    name: 'Form ADV Part 2',
    type: 'disclosure',
    category: 'Disclosures',
    date: new Date('2024-03-01'),
    size: 420000,
  },
];

const categories = ['All Documents', 'Statements', 'Tax Documents', 'Agreements', 'Disclosures'];

const typeColors: Record<string, string> = {
  statement: 'bg-blue-100 text-blue-800',
  tax: 'bg-yellow-100 text-yellow-800',
  contract: 'bg-green-100 text-green-800',
  disclosure: 'bg-purple-100 text-purple-800',
};

export default function ClientDocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Documents');

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All Documents' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) {
      return bytes + ' B';
    }
    if (bytes < 1048576) {
      return (bytes / 1024).toFixed(1) + ' KB';
    }
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Group documents by category for folder view
  const documentsByCategory = mockDocuments.reduce(
    (acc, doc) => {
      const category = doc.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category]!.push(doc);
      return acc;
    },
    {} as Record<string, typeof mockDocuments>
  );

  return (
    <ClientPortalLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-900">Document Center</h1>
        <p className="text-secondary-600 mt-1">
          Access your statements, tax documents, and account agreements
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Folders */}
        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="text-sm font-semibold text-secondary-900 mb-4">Folders</h3>
            <div className="space-y-1">
              {categories.map((category) => {
                const count =
                  category === 'All Documents'
                    ? mockDocuments.length
                    : documentsByCategory[category]?.length || 0;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-secondary-600 hover:bg-secondary-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        />
                      </svg>
                      {category}
                    </div>
                    <span className="text-xs text-secondary-400">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content - Document List */}
        <div className="lg:col-span-3">
          {/* Search Bar */}
          <div className="card mb-6">
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

          {/* Document List */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-secondary-900">
                {selectedCategory}
                <span className="ml-2 text-sm font-normal text-secondary-500">
                  ({filteredDocuments.length} documents)
                </span>
              </h2>
            </div>
            <div className="space-y-3">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg hover:border-primary-300 transition-colors"
                >
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
                      <p className="font-medium text-secondary-900">{doc.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${typeColors[doc.type] || 'bg-gray-100 text-gray-800'}`}
                        >
                          {doc.type}
                        </span>
                        <span className="text-sm text-secondary-500">{formatDate(doc.date)}</span>
                        <span className="text-sm text-secondary-400">{formatSize(doc.size)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 rounded-lg"
                      title="View"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                    <button className="btn-outline text-sm">Download</button>
                  </div>
                </div>
              ))}

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
                    Try adjusting your search or filter.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ClientPortalLayout>
  );
}
