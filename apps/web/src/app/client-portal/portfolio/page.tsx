'use client';

import { useState } from 'react';
import ClientPortalLayout from '@/components/ClientPortalLayout';

// Mock portfolio data
const mockPortfolio = {
  totalValue: 209268.5,
  cashBalance: 4500,
  drift: 1.8,
  driftStatus: 'within_tolerance' as const,
  modelName: 'Balanced Growth',
  lastRebalanced: new Date('2024-11-01'),
  performance: {
    mtd: 1.3,
    qtd: 3.2,
    ytd: 9.8,
    oneYear: 11.5,
    threeYear: 8.2,
    sinceInception: 7.8,
  },
};

const mockHoldings = [
  {
    symbol: 'VTI',
    name: 'Vanguard Total Stock Market ETF',
    assetClass: 'US Equities',
    shares: 32.5,
    price: 245.75,
    value: 7986.88,
    weight: 38.2,
    targetWeight: 40.0,
    change: 0.81,
    changePercent: 0.33,
  },
  {
    symbol: 'VXUS',
    name: 'Vanguard Total International Stock ETF',
    assetClass: 'International Equities',
    shares: 85.2,
    price: 56.12,
    value: 4781.42,
    weight: 22.9,
    targetWeight: 20.0,
    change: -0.76,
    changePercent: -1.34,
  },
  {
    symbol: 'BND',
    name: 'Vanguard Total Bond Market ETF',
    assetClass: 'Fixed Income',
    shares: 45.8,
    price: 72.50,
    value: 3320.50,
    weight: 15.9,
    targetWeight: 20.0,
    change: 0.17,
    changePercent: 0.23,
  },
  {
    symbol: 'VNQ',
    name: 'Vanguard Real Estate ETF',
    assetClass: 'Real Estate',
    shares: 28.0,
    price: 88.25,
    value: 2471.00,
    weight: 11.8,
    targetWeight: 10.0,
    change: 0.99,
    changePercent: 1.13,
  },
  {
    symbol: 'IAU',
    name: 'iShares Gold Trust',
    assetClass: 'Commodities',
    shares: 52.0,
    price: 38.15,
    value: 1983.80,
    weight: 9.5,
    targetWeight: 5.0,
    change: 0.78,
    changePercent: 2.09,
  },
  {
    symbol: 'VMFXX',
    name: 'Vanguard Federal Money Market Fund',
    assetClass: 'Cash',
    shares: 350.0,
    price: 1.0,
    value: 350.0,
    weight: 1.7,
    targetWeight: 5.0,
    change: 0,
    changePercent: 0,
  },
];

const mockAccounts = [
  {
    id: 'acct-001',
    name: 'Individual Brokerage',
    type: 'Individual',
    value: 120000,
    contribution: 6000,
  },
  {
    id: 'acct-002',
    name: 'Traditional IRA',
    type: 'IRA',
    value: 65000,
    contribution: 7000,
  },
  {
    id: 'acct-003',
    name: 'Roth IRA',
    type: 'Roth',
    value: 24268.5,
    contribution: 7000,
  },
];

const mockPerformanceHistory = [
  { period: 'Jan 2024', value: 185000, return: 2.1 },
  { period: 'Feb 2024', value: 188000, return: 1.6 },
  { period: 'Mar 2024', value: 192000, return: 2.1 },
  { period: 'Apr 2024', value: 189000, return: -1.6 },
  { period: 'May 2024', value: 194000, return: 2.6 },
  { period: 'Jun 2024', value: 198000, return: 2.1 },
  { period: 'Jul 2024', value: 201000, return: 1.5 },
  { period: 'Aug 2024', value: 203000, return: 1.0 },
  { period: 'Sep 2024', value: 200000, return: -1.5 },
  { period: 'Oct 2024', value: 205000, return: 2.5 },
  { period: 'Nov 2024', value: 207000, return: 1.0 },
  { period: 'Dec 2024', value: 209268.5, return: 1.1 },
];

type ViewType = 'holdings' | 'accounts' | 'performance';

export default function ClientPortfolioPage() {
  const [activeView, setActiveView] = useState<ViewType>('holdings');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
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
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-900">Portfolio Details</h1>
        <p className="text-secondary-600 mt-1">
          Deep dive into your investment accounts and holdings
        </p>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card">
          <p className="text-sm text-secondary-500">Total Value</p>
          <p className="text-2xl font-bold text-secondary-900">
            {formatCurrency(mockPortfolio.totalValue)}
          </p>
          <p className="text-sm text-green-600 mt-1">+{mockPortfolio.performance.ytd}% YTD</p>
        </div>
        <div className="card">
          <p className="text-sm text-secondary-500">Model Portfolio</p>
          <p className="text-xl font-bold text-secondary-900">{mockPortfolio.modelName}</p>
          <p className="text-sm text-secondary-500 mt-1">
            Last rebalanced: {formatDate(mockPortfolio.lastRebalanced)}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-secondary-500">Cash Available</p>
          <p className="text-2xl font-bold text-secondary-900">
            {formatCurrency(mockPortfolio.cashBalance)}
          </p>
          <p className="text-sm text-secondary-500 mt-1">
            {((mockPortfolio.cashBalance / mockPortfolio.totalValue) * 100).toFixed(1)}% of
            portfolio
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-secondary-500">Portfolio Drift</p>
          <p className="text-2xl font-bold text-secondary-900">{mockPortfolio.drift}%</p>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
            Within Tolerance
          </span>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="card mb-8">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">Performance Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
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
          <div className="text-center p-3 bg-secondary-50 rounded-lg">
            <p className="text-xs text-secondary-500">3 Year</p>
            <p
              className={`text-lg font-semibold ${mockPortfolio.performance.threeYear >= 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {mockPortfolio.performance.threeYear >= 0 ? '+' : ''}
              {mockPortfolio.performance.threeYear}%
            </p>
          </div>
          <div className="text-center p-3 bg-secondary-50 rounded-lg">
            <p className="text-xs text-secondary-500">Since Inception</p>
            <p
              className={`text-lg font-semibold ${mockPortfolio.performance.sinceInception >= 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {mockPortfolio.performance.sinceInception >= 0 ? '+' : ''}
              {mockPortfolio.performance.sinceInception}%
            </p>
          </div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="border-b border-secondary-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveView('holdings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeView === 'holdings'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            Holdings
          </button>
          <button
            onClick={() => setActiveView('accounts')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeView === 'accounts'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            Accounts
          </button>
          <button
            onClick={() => setActiveView('performance')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeView === 'performance'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            Performance History
          </button>
        </nav>
      </div>

      {/* Holdings View */}
      {activeView === 'holdings' && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead className="bg-secondary-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                    Security
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">
                    Shares
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">
                    Value
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">
                    Weight
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">
                    Target
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">
                    Today
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {mockHoldings.map((holding) => (
                  <tr key={holding.symbol} className="hover:bg-secondary-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-secondary-900">
                          {holding.symbol}
                        </div>
                        <div className="text-sm text-secondary-500">{holding.name}</div>
                        <div className="text-xs text-secondary-400">{holding.assetClass}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-secondary-900">
                      {holding.shares.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-secondary-900">
                      ${holding.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-secondary-900">
                      {formatCurrency(holding.value)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-secondary-900">
                      {holding.weight.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-secondary-500">
                      {holding.targetWeight.toFixed(1)}%
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-right text-sm ${holding.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {holding.changePercent >= 0 ? '+' : ''}
                      {holding.changePercent.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Accounts View */}
      {activeView === 'accounts' && (
        <div className="space-y-4">
          {mockAccounts.map((account) => (
            <div key={account.id} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900">{account.name}</h3>
                  <p className="text-sm text-secondary-500">{account.type} Account</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-secondary-900">
                    {formatCurrency(account.value)}
                  </p>
                  <p className="text-sm text-secondary-500">
                    {((account.value / mockPortfolio.totalValue) * 100).toFixed(1)}% of total
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-secondary-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-secondary-500">Annual Contribution Limit</span>
                  <span className="text-secondary-900">{formatCurrency(account.contribution)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Performance History View */}
      {activeView === 'performance' && (
        <div className="card overflow-hidden">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Monthly Performance</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead className="bg-secondary-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                    Period
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">
                    Portfolio Value
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">
                    Monthly Return
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {mockPerformanceHistory
                  .slice()
                  .reverse()
                  .map((item) => (
                    <tr key={item.period} className="hover:bg-secondary-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                        {item.period}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-secondary-900">
                        {formatCurrency(item.value)}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-right text-sm ${item.return >= 0 ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {item.return >= 0 ? '+' : ''}
                        {item.return.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </ClientPortalLayout>
  );
}
