'use client';

import { useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';

// Mock client data - in production, this would be fetched from API
const mockClient = {
  id: 'client-001',
  firstName: 'Robert',
  lastName: 'Anderson',
  email: 'robert.anderson@email.com',
  phone: '(555) 123-4567',
  status: 'client' as const,
  riskTolerance: 'moderate' as const,
  investmentObjectives: ['growth', 'income'],
  assetsUnderManagement: 209268,
  advisorName: 'John Doe',
  onboardingStatus: 'approved' as const,
  address: {
    street: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94102',
  },
  dateOfBirth: new Date('1975-03-15'),
  ssn: '***-**-1234',
  employmentStatus: 'Employed',
  employer: 'Tech Company Inc.',
  annualIncome: 250000,
  netWorth: 1500000,
  createdAt: new Date('2023-01-20'),
};

const mockPortfolio = {
  totalValue: 209268.5,
  cashBalance: 4500,
  drift: 1.8,
  driftStatus: 'within_tolerance' as const,
  modelName: 'Balanced Growth',
  performance: {
    mtd: 1.3,
    qtd: 3.2,
    ytd: 9.8,
    oneYear: 11.5,
  },
  holdings: [
    {
      symbol: 'VTI',
      name: 'Vanguard Total Stock Market ETF',
      value: 120825,
      weight: 36.2,
      change: 0.81,
    },
    {
      symbol: 'VXUS',
      name: 'Vanguard Total International Stock ETF',
      value: 30550,
      weight: 14.5,
      change: -0.76,
    },
    { symbol: 'BND', name: 'Vanguard Total Bond Market ETF', value: 29925, weight: 29.8, change: 0.17 },
    { symbol: 'VNQ', name: 'Vanguard Real Estate ETF', value: 10812.5, weight: 10.2, change: 0.99 },
    { symbol: 'IAU', name: 'iShares Gold Trust', value: 12656, weight: 4.8, change: 0.78 },
    { symbol: 'Cash', name: 'Money Market Fund', value: 4500, weight: 4.5, change: 0 },
  ],
};

const mockDocuments = [
  {
    id: 'doc-001',
    name: 'Investment Policy Statement',
    type: 'contract',
    uploadedAt: new Date('2023-01-20'),
    status: 'approved',
  },
  {
    id: 'doc-002',
    name: 'W-9 Form',
    type: 'tax',
    uploadedAt: new Date('2023-01-22'),
    status: 'approved',
  },
  {
    id: 'doc-003',
    name: 'Account Agreement',
    type: 'contract',
    uploadedAt: new Date('2023-01-20'),
    status: 'approved',
  },
  {
    id: 'doc-004',
    name: 'Q4 2024 Statement',
    type: 'statement',
    uploadedAt: new Date('2024-10-01'),
    status: 'pending',
  },
];

const mockNotes = [
  {
    id: 'note-001',
    content: 'Discussed retirement planning goals. Client wants to retire by age 60.',
    author: 'John Doe',
    createdAt: new Date('2024-12-01'),
  },
  {
    id: 'note-002',
    content: 'Reviewed portfolio performance. Client satisfied with YTD returns.',
    author: 'John Doe',
    createdAt: new Date('2024-11-15'),
  },
  {
    id: 'note-003',
    content: 'Annual review completed. Updated risk tolerance questionnaire.',
    author: 'John Doe',
    createdAt: new Date('2024-09-01'),
  },
];

type TabType = 'overview' | 'portfolio' | 'documents' | 'notes';

export default function ClientDetailPage() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const tabs: { id: TabType; name: string }[] = [
    { id: 'overview', name: 'Overview' },
    { id: 'portfolio', name: 'Portfolio' },
    { id: 'documents', name: 'Documents' },
    { id: 'notes', name: 'Notes' },
  ];

  return (
    <DashboardLayout userRole="advisor">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/dashboard/clients"
            className="text-secondary-600 hover:text-secondary-900"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>
          <span className="text-secondary-400">/</span>
          <span className="text-secondary-600">Clients</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-primary-600 font-bold text-xl">
                {mockClient.firstName[0]}
                {mockClient.lastName[0]}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-secondary-900">
                {mockClient.firstName} {mockClient.lastName}
              </h1>
              <p className="text-secondary-600">{mockClient.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-outline flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Message
            </button>
            <button className="btn-primary flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-secondary-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Client Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">
                Personal Information
              </h2>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-secondary-500">Phone</dt>
                  <dd className="text-sm text-secondary-900">{mockClient.phone}</dd>
                </div>
                <div>
                  <dt className="text-sm text-secondary-500">Date of Birth</dt>
                  <dd className="text-sm text-secondary-900">{formatDate(mockClient.dateOfBirth)}</dd>
                </div>
                <div>
                  <dt className="text-sm text-secondary-500">SSN</dt>
                  <dd className="text-sm text-secondary-900">{mockClient.ssn}</dd>
                </div>
                <div>
                  <dt className="text-sm text-secondary-500">Address</dt>
                  <dd className="text-sm text-secondary-900">
                    {mockClient.address.street}, {mockClient.address.city},{' '}
                    {mockClient.address.state} {mockClient.address.zip}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="card">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">
                Financial Profile
              </h2>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-secondary-500">Employment Status</dt>
                  <dd className="text-sm text-secondary-900">{mockClient.employmentStatus}</dd>
                </div>
                <div>
                  <dt className="text-sm text-secondary-500">Employer</dt>
                  <dd className="text-sm text-secondary-900">{mockClient.employer}</dd>
                </div>
                <div>
                  <dt className="text-sm text-secondary-500">Annual Income</dt>
                  <dd className="text-sm text-secondary-900">
                    {formatCurrency(mockClient.annualIncome)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-secondary-500">Net Worth</dt>
                  <dd className="text-sm text-secondary-900">
                    {formatCurrency(mockClient.netWorth)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-secondary-500">Risk Tolerance</dt>
                  <dd className="text-sm text-secondary-900 capitalize">
                    {mockClient.riskTolerance}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-secondary-500">Investment Objectives</dt>
                  <dd className="text-sm text-secondary-900 capitalize">
                    {mockClient.investmentObjectives.join(', ')}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">
                Portfolio Summary
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-secondary-500">Total Value</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {formatCurrency(mockPortfolio.totalValue)}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-secondary-500">YTD Return</p>
                    <p className="text-lg font-semibold text-green-600">
                      +{mockPortfolio.performance.ytd}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-500">Model</p>
                    <p className="text-sm text-secondary-900">{mockPortfolio.modelName}</p>
                  </div>
                </div>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('portfolio');
                  }}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  View Full Portfolio →
                </Link>
              </div>
            </div>

            <div className="card">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">
                Account Status
              </h2>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-secondary-500">Status</dt>
                  <dd className="text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                      {mockClient.status}
                    </span>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-secondary-500">Onboarding</dt>
                  <dd className="text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                      {mockClient.onboardingStatus.replace('_', ' ')}
                    </span>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-secondary-500">Client Since</dt>
                  <dd className="text-sm text-secondary-900">{formatDate(mockClient.createdAt)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          {/* Performance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card">
              <p className="text-sm text-secondary-500">Total Value</p>
              <p className="text-2xl font-bold text-secondary-900">
                {formatCurrency(mockPortfolio.totalValue)}
              </p>
            </div>
            <div className="card">
              <p className="text-sm text-secondary-500">MTD Return</p>
              <p
                className={`text-2xl font-bold ${mockPortfolio.performance.mtd >= 0 ? 'text-green-600' : 'text-red-600'}`}
              >
                {mockPortfolio.performance.mtd >= 0 ? '+' : ''}
                {mockPortfolio.performance.mtd}%
              </p>
            </div>
            <div className="card">
              <p className="text-sm text-secondary-500">QTD Return</p>
              <p
                className={`text-2xl font-bold ${mockPortfolio.performance.qtd >= 0 ? 'text-green-600' : 'text-red-600'}`}
              >
                {mockPortfolio.performance.qtd >= 0 ? '+' : ''}
                {mockPortfolio.performance.qtd}%
              </p>
            </div>
            <div className="card">
              <p className="text-sm text-secondary-500">YTD Return</p>
              <p
                className={`text-2xl font-bold ${mockPortfolio.performance.ytd >= 0 ? 'text-green-600' : 'text-red-600'}`}
              >
                {mockPortfolio.performance.ytd >= 0 ? '+' : ''}
                {mockPortfolio.performance.ytd}%
              </p>
            </div>
          </div>

          {/* Holdings Table */}
          <div className="card overflow-hidden">
            <h2 className="text-lg font-semibold text-secondary-900 mb-4">Holdings</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-secondary-200">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                      Security
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">
                      Value
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">
                      Weight
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">
                      Today
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-secondary-200">
                  {mockPortfolio.holdings.map((holding) => (
                    <tr key={holding.symbol}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-secondary-900">
                            {holding.symbol}
                          </div>
                          <div className="text-sm text-secondary-500">{holding.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-secondary-900">
                        {formatCurrency(holding.value)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-secondary-900">
                        {holding.weight.toFixed(1)}%
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-right text-sm ${holding.change >= 0 ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {holding.change >= 0 ? '+' : ''}
                        {holding.change.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-secondary-900">Documents</h2>
            <button className="btn-primary text-sm">Upload Document</button>
          </div>
          <div className="space-y-4">
            {mockDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between py-3 border-b border-secondary-100 last:border-0"
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
                    <p className="text-sm font-medium text-secondary-900">{doc.name}</p>
                    <p className="text-xs text-secondary-500">
                      {doc.type} • {formatDate(doc.uploadedAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      doc.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {doc.status}
                  </span>
                  <button className="text-primary-600 hover:text-primary-700 text-sm">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-secondary-900">Notes</h2>
            <button className="btn-primary text-sm">Add Note</button>
          </div>
          <div className="space-y-4">
            {mockNotes.map((note) => (
              <div
                key={note.id}
                className="p-4 bg-secondary-50 rounded-lg"
              >
                <p className="text-sm text-secondary-900">{note.content}</p>
                <p className="text-xs text-secondary-500 mt-2">
                  {note.author} • {formatDate(note.createdAt)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
