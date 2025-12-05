'use client';

import Link from 'next/link';
import ClientPortalLayout from '@/components/ClientPortalLayout';

// Mock client data
const mockClientData = {
  firstName: 'Robert',
  lastName: 'Anderson',
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

const mockRecentActivity = [
  {
    id: 'activity-001',
    type: 'dividend',
    description: 'Dividend received from VTI',
    amount: 125.50,
    date: new Date('2024-12-05'),
  },
  {
    id: 'activity-002',
    type: 'rebalance',
    description: 'Portfolio rebalanced',
    date: new Date('2024-12-01'),
  },
  {
    id: 'activity-003',
    type: 'contribution',
    description: 'Monthly contribution processed',
    amount: 1000,
    date: new Date('2024-11-30'),
  },
];

export default function ClientPortalPage() {
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

  return (
    <ClientPortalLayout>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-900">
          Welcome back, {mockClientData.firstName}
        </h1>
        <p className="text-secondary-600 mt-1">
          Here&apos;s an overview of your portfolio and recent activity
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Summary */}
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
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-secondary-50 rounded-lg">
                <p className="text-xs text-secondary-500">MTD</p>
                <p
                  className={`text-lg font-semibold ${mockPortfolio.performance.mtd >= 0 ? 'text-green-600' : 'text-red-600'}`}
                >
                  {mockPortfolio.performance.mtd >= 0 ? '+' : ''}
                  {mockPortfolio.performance.mtd}%
                </p>
              </div>
              <div className="text-center p-3 bg-secondary-50 rounded-lg">
                <p className="text-xs text-secondary-500">QTD</p>
                <p
                  className={`text-lg font-semibold ${mockPortfolio.performance.qtd >= 0 ? 'text-green-600' : 'text-red-600'}`}
                >
                  {mockPortfolio.performance.qtd >= 0 ? '+' : ''}
                  {mockPortfolio.performance.qtd}%
                </p>
              </div>
              <div className="text-center p-3 bg-secondary-50 rounded-lg">
                <p className="text-xs text-secondary-500">YTD</p>
                <p
                  className={`text-lg font-semibold ${mockPortfolio.performance.ytd >= 0 ? 'text-green-600' : 'text-red-600'}`}
                >
                  {mockPortfolio.performance.ytd >= 0 ? '+' : ''}
                  {mockPortfolio.performance.ytd}%
                </p>
              </div>
              <div className="text-center p-3 bg-secondary-50 rounded-lg">
                <p className="text-xs text-secondary-500">1 Year</p>
                <p
                  className={`text-lg font-semibold ${mockPortfolio.performance.oneYear >= 0 ? 'text-green-600' : 'text-red-600'}`}
                >
                  {mockPortfolio.performance.oneYear >= 0 ? '+' : ''}
                  {mockPortfolio.performance.oneYear}%
                </p>
              </div>
            </div>

            {/* Asset Allocation */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-secondary-900">Asset Allocation</h3>
              <Link
                href="/client-portal/portfolio"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                View Details →
              </Link>
            </div>
            <div className="flex h-4 rounded-full overflow-hidden mb-4">
              {mockPortfolio.holdings.map((holding, idx) => (
                <div
                  key={holding.name}
                  className={`${holding.color} ${idx === 0 ? 'rounded-l-full' : ''} ${idx === mockPortfolio.holdings.length - 1 ? 'rounded-r-full' : ''}`}
                  style={{ width: `${holding.percentage}%` }}
                  title={`${holding.name}: ${holding.percentage}%`}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {mockPortfolio.holdings.map((holding) => (
                <div key={holding.name} className="flex items-center gap-2 text-sm">
                  <div className={`w-3 h-3 rounded-full ${holding.color}`} />
                  <span className="text-secondary-600">{holding.name}</span>
                  <span className="text-secondary-900 font-medium">{holding.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Your Advisor Card */}
          <div className="card">
            <h2 className="text-lg font-semibold text-secondary-900 mb-4">Your Advisor</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold text-lg">JD</span>
              </div>
              <div>
                <p className="font-medium text-secondary-900">{mockClientData.advisorName}</p>
                <p className="text-sm text-secondary-500">Financial Advisor</p>
              </div>
            </div>
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-secondary-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {mockClientData.advisorEmail}
              </div>
              <div className="flex items-center gap-2 text-secondary-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {mockClientData.advisorPhone}
              </div>
            </div>
            <Link href="/client-portal/messages" className="btn-primary w-full block text-center">
              Send Message
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h2 className="text-lg font-semibold text-secondary-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {mockRecentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start justify-between py-2 border-b border-secondary-100 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-secondary-900">{activity.description}</p>
                    <p className="text-xs text-secondary-500">{formatDate(activity.date)}</p>
                  </div>
                  {activity.amount && (
                    <span className="text-sm font-medium text-green-600">
                      +{formatCurrency(activity.amount)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-lg font-semibold text-secondary-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link
                href="/client-portal/documents"
                className="w-full text-left px-3 py-2 text-sm text-secondary-700 hover:bg-secondary-50 rounded-lg flex items-center gap-2"
              >
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
              </Link>
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
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Account Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </ClientPortalLayout>
  );
}
