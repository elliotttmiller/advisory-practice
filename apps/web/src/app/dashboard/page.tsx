'use client';

import Link from 'next/link';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}

function MetricCard({ title, value, change, changeType = 'neutral', icon }: MetricCardProps) {
  const changeColors = {
    positive: 'text-green-600 bg-green-100',
    negative: 'text-red-600 bg-red-100',
    neutral: 'text-secondary-600 bg-secondary-100',
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-secondary-600">{title}</p>
          <p className="text-2xl font-bold text-secondary-900 mt-1">{value}</p>
          {change && (
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-2 ${changeColors[changeType]}`}
            >
              {change}
            </span>
          )}
        </div>
        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
          {icon}
        </div>
      </div>
    </div>
  );
}

interface ComplianceAlertProps {
  type: 'warning' | 'error' | 'info';
  title: string;
  description: string;
  action: string;
}

function ComplianceAlert({ type, title, description, action }: ComplianceAlertProps) {
  const colors = {
    warning: 'border-yellow-400 bg-yellow-50',
    error: 'border-red-400 bg-red-50',
    info: 'border-blue-400 bg-blue-50',
  };

  const iconColors = {
    warning: 'text-yellow-600',
    error: 'text-red-600',
    info: 'text-blue-600',
  };

  return (
    <div className={`border-l-4 p-4 ${colors[type]}`}>
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${iconColors[type]}`}>
          {type === 'warning' && (
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {type === 'error' && (
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {type === 'info' && (
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-secondary-900">{title}</p>
          <p className="text-sm text-secondary-600 mt-1">{description}</p>
        </div>
        <button className="ml-4 text-sm font-medium text-primary-600 hover:text-primary-700">
          {action}
        </button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  // Mock data - In production, this would come from API
  const metrics = {
    totalClients: 1250,
    activeClients: 1180,
    totalAUM: '$523M',
    leadsThisMonth: 45,
    conversionRate: '32%',
    complianceScore: '98%',
    pendingReviews: 12,
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <header className="bg-white border-b border-secondary-200">
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
              <span className="text-sm font-medium text-secondary-600">Admin Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-secondary-600 hover:text-secondary-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-medium text-sm">JD</span>
                </div>
                <span className="text-sm font-medium text-secondary-900">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-secondary-200 min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2 text-primary-600 bg-primary-50 rounded-lg font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard
            </Link>
            <Link
              href="/dashboard/clients"
              className="flex items-center gap-3 px-3 py-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Clients
            </Link>
            <Link
              href="/dashboard/documents"
              className="flex items-center gap-3 px-3 py-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Documents
            </Link>
            <Link
              href="/dashboard/compliance"
              className="flex items-center gap-3 px-3 py-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Compliance
              <span className="ml-auto bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full">
                {metrics.pendingReviews}
              </span>
            </Link>
            <Link
              href="/dashboard/marketing"
              className="flex items-center gap-3 px-3 py-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
              Marketing
            </Link>
            <Link
              href="/dashboard/reports"
              className="flex items-center gap-3 px-3 py-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Reports
            </Link>
            <Link
              href="/dashboard/audit-logs"
              className="flex items-center gap-3 px-3 py-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Audit Logs
            </Link>
            <hr className="my-4 border-secondary-200" />
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 px-3 py-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              Settings
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8" role="main" aria-labelledby="dashboard-heading">
          <div className="mb-8">
            <h1 id="dashboard-heading" className="text-2xl font-bold text-secondary-900">
              Dashboard Overview
            </h1>
            <p className="text-secondary-600 mt-1" aria-describedby="dashboard-heading">
              Welcome back! Here&apos;s what&apos;s happening with your practice.
            </p>
          </div>

          {/* Compliance Alerts */}
          <div className="mb-8 space-y-3">
            <h2 className="text-lg font-semibold text-secondary-900 mb-4">Compliance Alerts</h2>
            <ComplianceAlert
              type="warning"
              title="Marketing Content Pending Review"
              description="3 marketing materials require compliance review before publication."
              action="Review Now"
            />
            <ComplianceAlert
              type="info"
              title="Quarterly Report Due"
              description="Q4 2024 compliance report is due in 15 days."
              action="Start Report"
            />
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Clients"
              value={metrics.totalClients.toLocaleString()}
              change="+12 this month"
              changeType="positive"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              }
            />
            <MetricCard
              title="Assets Under Management"
              value={metrics.totalAUM}
              change="+5.2% YTD"
              changeType="positive"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />
            <MetricCard
              title="Leads This Month"
              value={metrics.leadsThisMonth}
              change={`${metrics.conversionRate} conversion`}
              changeType="neutral"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              }
            />
            <MetricCard
              title="Compliance Score"
              value={metrics.complianceScore}
              change={`${metrics.pendingReviews} pending`}
              changeType={metrics.pendingReviews > 10 ? 'negative' : 'positive'}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              }
            />
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pending Approvals */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-secondary-900">Pending Approvals</h3>
                <Link
                  href="/dashboard/compliance"
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  View All →
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    type: 'Marketing',
                    title: 'Q4 Newsletter Draft',
                    status: 'SEC Review',
                    daysOld: 2,
                  },
                  {
                    id: 2,
                    type: 'Document',
                    title: 'Client Agreement Template',
                    status: 'Legal Review',
                    daysOld: 1,
                  },
                  {
                    id: 3,
                    type: 'Communication',
                    title: 'Social Media Post',
                    status: 'Compliance Review',
                    daysOld: 0,
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-2 border-b border-secondary-100 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-secondary-900">{item.title}</p>
                      <p className="text-sm text-secondary-500">
                        {item.type} • {item.status}
                      </p>
                    </div>
                    <span className="text-sm text-secondary-500">
                      {item.daysOld === 0 ? 'Today' : `${item.daysOld}d ago`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Audit Activity */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-secondary-900">Recent Activity</h3>
                <Link
                  href="/dashboard/audit-logs"
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  View All →
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    action: 'Client profile updated',
                    user: 'Sarah Johnson',
                    time: '2 min ago',
                  },
                  { id: 2, action: 'Document approved', user: 'Mike Chen', time: '15 min ago' },
                  { id: 3, action: 'New lead captured', user: 'System', time: '1 hr ago' },
                  {
                    id: 4,
                    action: 'Compliance check passed',
                    user: 'Auto-Review',
                    time: '2 hrs ago',
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-2 border-b border-secondary-100 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-secondary-900">{item.action}</p>
                      <p className="text-sm text-secondary-500">by {item.user}</p>
                    </div>
                    <span className="text-sm text-secondary-500">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
