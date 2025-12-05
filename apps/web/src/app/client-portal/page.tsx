'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock client data
const mockClientData = {
  firstName: 'Robert',
  lastName: 'Anderson',
  email: 'robert.anderson@email.com',
  advisorName: 'John Doe',
  advisorEmail: 'john.doe@financialadvisor.com',
  advisorPhone: '(555) 123-4567',
};

const mockPortfolio = {
  totalValue: 209268.5,
  cashBalance: 4500,
  modelName: 'Balanced Growth',
  performance: {
    mtd: 1.3,
    qtd: 3.2,
    ytd: 9.8,
    oneYear: 11.5,
  },
  holdings: [
    { name: 'US Stocks', value: 120825, percentage: 36.2, color: 'bg-blue-500' },
    { name: 'International Stocks', value: 30550, percentage: 14.5, color: 'bg-green-500' },
    { name: 'Bonds', value: 29925, percentage: 29.8, color: 'bg-yellow-500' },
    { name: 'Real Estate', value: 10812.5, percentage: 10.2, color: 'bg-purple-500' },
    { name: 'Commodities', value: 12656, percentage: 4.8, color: 'bg-orange-500' },
    { name: 'Cash', value: 4500, percentage: 4.5, color: 'bg-gray-400' },
  ],
};

const mockDocuments = [
  { id: 'doc-001', name: 'Q4 2024 Statement', type: 'statement', date: new Date('2024-10-01') },
  { id: 'doc-002', name: 'Q3 2024 Statement', type: 'statement', date: new Date('2024-07-01') },
  { id: 'doc-003', name: 'Tax Documents 2023', type: 'tax', date: new Date('2024-01-15') },
  { id: 'doc-004', name: 'Investment Policy Statement', type: 'contract', date: new Date('2023-01-20') },
];

const mockMessages = [
  {
    id: 'msg-001',
    from: 'John Doe',
    subject: 'Portfolio Review Summary',
    preview: 'Hi Robert, Following up on our meeting about your portfolio...',
    date: new Date('2024-12-05'),
    unread: true,
  },
  {
    id: 'msg-002',
    from: 'John Doe',
    subject: 'Year-End Planning',
    preview: 'I wanted to discuss some year-end tax strategies...',
    date: new Date('2024-12-02'),
    unread: false,
  },
];

type TabType = 'overview' | 'documents' | 'messages' | 'profile';

export default function ClientPortalPage() {
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
    { id: 'documents', name: 'Documents' },
    { id: 'messages', name: 'Messages' },
    { id: 'profile', name: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <header className="bg-white border-b border-secondary-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FA</span>
                </div>
                <span className="font-semibold text-secondary-900">Financial Advisor</span>
              </Link>
              <span className="text-secondary-400">|</span>
              <span className="text-sm font-medium text-secondary-600">Client Portal</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-secondary-600">
                Welcome, {mockClientData.firstName}
              </span>
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-medium text-sm">
                  {mockClientData.firstName[0]}
                  {mockClientData.lastName[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-secondary-900">
            Welcome, {mockClientData.firstName}
          </h1>
          <p className="text-secondary-600 mt-1">
            View your portfolio, documents, and communicate with your advisor
          </p>
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
                {tab.id === 'messages' && mockMessages.filter((m) => m.unread).length > 0 && (
                  <span className="ml-2 bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {mockMessages.filter((m) => m.unread).length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Portfolio Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="card">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-semibold text-secondary-900">Portfolio Value</h2>
                      <p className="text-3xl font-bold text-secondary-900 mt-1">
                        {formatCurrency(mockPortfolio.totalValue)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-secondary-500">YTD Return</p>
                      <p className="text-2xl font-bold text-green-600">
                        +{mockPortfolio.performance.ytd}%
                      </p>
                    </div>
                  </div>

                  {/* Performance Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-secondary-50 rounded-lg">
                      <p className="text-sm text-secondary-500">Month to Date</p>
                      <p
                        className={`text-lg font-semibold ${mockPortfolio.performance.mtd >= 0 ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {mockPortfolio.performance.mtd >= 0 ? '+' : ''}
                        {mockPortfolio.performance.mtd}%
                      </p>
                    </div>
                    <div className="text-center p-3 bg-secondary-50 rounded-lg">
                      <p className="text-sm text-secondary-500">Quarter to Date</p>
                      <p
                        className={`text-lg font-semibold ${mockPortfolio.performance.qtd >= 0 ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {mockPortfolio.performance.qtd >= 0 ? '+' : ''}
                        {mockPortfolio.performance.qtd}%
                      </p>
                    </div>
                    <div className="text-center p-3 bg-secondary-50 rounded-lg">
                      <p className="text-sm text-secondary-500">1 Year</p>
                      <p
                        className={`text-lg font-semibold ${mockPortfolio.performance.oneYear >= 0 ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {mockPortfolio.performance.oneYear >= 0 ? '+' : ''}
                        {mockPortfolio.performance.oneYear}%
                      </p>
                    </div>
                  </div>

                  {/* Asset Allocation */}
                  <h3 className="text-sm font-medium text-secondary-900 mb-3">Asset Allocation</h3>
                  <div className="space-y-3">
                    {mockPortfolio.holdings.map((holding) => (
                      <div key={holding.name}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-secondary-700">{holding.name}</span>
                          <span className="text-sm text-secondary-900">
                            {formatCurrency(holding.value)} ({holding.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-secondary-100 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${holding.color}`}
                            style={{ width: `${holding.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Advisor Contact */}
              <div className="space-y-6">
                <div className="card">
                  <h2 className="text-lg font-semibold text-secondary-900 mb-4">Your Advisor</h2>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-bold text-xl">JD</span>
                    </div>
                    <div>
                      <p className="font-medium text-secondary-900">{mockClientData.advisorName}</p>
                      <p className="text-sm text-secondary-500">Financial Advisor</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-secondary-600">
                      <span className="text-secondary-500">Email:</span> {mockClientData.advisorEmail}
                    </p>
                    <p className="text-sm text-secondary-600">
                      <span className="text-secondary-500">Phone:</span> {mockClientData.advisorPhone}
                    </p>
                  </div>
                  <button className="btn-primary w-full">Send Message</button>
                </div>

                <div className="card">
                  <h2 className="text-lg font-semibold text-secondary-900 mb-4">Quick Actions</h2>
                  <div className="space-y-2">
                    <button className="w-full text-left px-3 py-2 text-sm text-secondary-700 hover:bg-secondary-50 rounded-lg flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-secondary-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Schedule Meeting
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-secondary-700 hover:bg-secondary-50 rounded-lg flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-secondary-400"
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
                      View Statements
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-secondary-700 hover:bg-secondary-50 rounded-lg flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-secondary-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="card">
            <h2 className="text-lg font-semibold text-secondary-900 mb-4">Your Documents</h2>
            <div className="space-y-3">
              {mockDocuments.map((doc) => (
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
                      <p className="text-sm text-secondary-500">
                        {doc.type} • {formatDate(doc.date)}
                      </p>
                    </div>
                  </div>
                  <button className="btn-outline text-sm">Download</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-secondary-900">Messages</h2>
              <button className="btn-primary text-sm">New Message</button>
            </div>
            <div className="space-y-3">
              {mockMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 border rounded-lg cursor-pointer hover:border-primary-300 transition-colors ${
                    msg.unread ? 'border-primary-200 bg-primary-50' : 'border-secondary-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-medium ${msg.unread ? 'text-secondary-900' : 'text-secondary-700'}`}
                      >
                        {msg.from}
                      </span>
                      {msg.unread && (
                        <span className="w-2 h-2 bg-primary-600 rounded-full" />
                      )}
                    </div>
                    <span className="text-sm text-secondary-500">{formatDate(msg.date)}</span>
                  </div>
                  <p
                    className={`font-medium ${msg.unread ? 'text-secondary-900' : 'text-secondary-700'}`}
                  >
                    {msg.subject}
                  </p>
                  <p className="text-sm text-secondary-500 truncate mt-1">{msg.preview}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="card">
            <h2 className="text-lg font-semibold text-secondary-900 mb-6">Profile Settings</h2>
            <form className="space-y-6 max-w-xl">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">First Name</label>
                  <input
                    type="text"
                    className="input"
                    defaultValue={mockClientData.firstName}
                  />
                </div>
                <div>
                  <label className="label">Last Name</label>
                  <input
                    type="text"
                    className="input"
                    defaultValue={mockClientData.lastName}
                  />
                </div>
              </div>
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  defaultValue={mockClientData.email}
                />
              </div>
              <div>
                <label className="label">Phone</label>
                <input
                  type="tel"
                  className="input"
                  defaultValue="(555) 123-4567"
                />
              </div>

              <hr className="border-secondary-200" />

              <h3 className="font-medium text-secondary-900">Security</h3>
              <div>
                <label className="label">Current Password</label>
                <input type="password" className="input" placeholder="••••••••" />
              </div>
              <div>
                <label className="label">New Password</label>
                <input type="password" className="input" placeholder="••••••••" />
              </div>

              <div className="flex gap-3">
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
                <button type="button" className="btn-outline">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-secondary-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-secondary-500">
              © {new Date().getFullYear()} Financial Advisor Platform. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-secondary-500">
              <Link href="#" className="hover:text-secondary-700">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-secondary-700">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-secondary-700">
                Help
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
