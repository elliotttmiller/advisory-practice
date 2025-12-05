'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

// Mock reports data
const mockReports = [
  {
    id: 'report-001',
    name: 'Q4 2024 Compliance Report',
    type: 'compliance' as const,
    format: 'pdf' as const,
    status: 'completed' as const,
    generatedBy: 'John Doe',
    generatedAt: new Date('2024-12-01'),
    expiresAt: new Date('2024-12-08'),
  },
  {
    id: 'report-002',
    name: 'Monthly Performance Summary - November',
    type: 'performance' as const,
    format: 'pdf' as const,
    status: 'completed' as const,
    generatedBy: 'System',
    generatedAt: new Date('2024-12-01'),
    expiresAt: new Date('2024-12-08'),
  },
  {
    id: 'report-003',
    name: 'Client AUM Distribution',
    type: 'client' as const,
    format: 'xlsx' as const,
    status: 'processing' as const,
    generatedBy: 'John Doe',
    generatedAt: new Date('2024-12-05'),
  },
  {
    id: 'report-004',
    name: 'Audit Trail Export - November',
    type: 'audit' as const,
    format: 'csv' as const,
    status: 'completed' as const,
    generatedBy: 'Compliance Team',
    generatedAt: new Date('2024-12-02'),
    expiresAt: new Date('2024-12-09'),
  },
];

type ReportType = 'compliance' | 'performance' | 'client' | 'marketing' | 'audit';
type ReportFormat = 'pdf' | 'csv' | 'xlsx';
type ReportStatus = 'pending' | 'processing' | 'completed' | 'failed';

const typeColors: Record<ReportType, string> = {
  compliance: 'bg-purple-100 text-purple-800',
  performance: 'bg-blue-100 text-blue-800',
  client: 'bg-green-100 text-green-800',
  marketing: 'bg-orange-100 text-orange-800',
  audit: 'bg-yellow-100 text-yellow-800',
};

const statusColors: Record<ReportStatus, string> = {
  pending: 'bg-gray-100 text-gray-800',
  processing: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
};

const formatIcons: Record<ReportFormat, string> = {
  pdf: 'PDF',
  csv: 'CSV',
  xlsx: 'XLS',
};

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredReports = mockReports.filter(
    (report) => selectedType === 'all' || report.type === selectedType
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  const handleGenerateReport = (_type: ReportType) => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <DashboardLayout userRole="advisor">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-900">Reports</h1>
        <p className="text-secondary-600 mt-1">
          Generate and download compliance, performance, and client reports
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <button
          onClick={() => handleGenerateReport('compliance')}
          disabled={isGenerating}
          className="card hover:border-primary-300 transition-colors text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 group-hover:bg-purple-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-secondary-900">Compliance Report</p>
              <p className="text-sm text-secondary-500">Generate now</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => handleGenerateReport('performance')}
          disabled={isGenerating}
          className="card hover:border-primary-300 transition-colors text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-secondary-900">Performance Report</p>
              <p className="text-sm text-secondary-500">Generate now</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => handleGenerateReport('client')}
          disabled={isGenerating}
          className="card hover:border-primary-300 transition-colors text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 group-hover:bg-green-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-secondary-900">Client Report</p>
              <p className="text-sm text-secondary-500">Generate now</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => handleGenerateReport('audit')}
          disabled={isGenerating}
          className="card hover:border-primary-300 transition-colors text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 group-hover:bg-yellow-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-secondary-900">Audit Trail Export</p>
              <p className="text-sm text-secondary-500">Generate now</p>
            </div>
          </div>
        </button>
      </div>

      {/* Filter */}
      <div className="card mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-secondary-900">Recent Reports</h2>
          <select
            className="input w-auto"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="compliance">Compliance</option>
            <option value="performance">Performance</option>
            <option value="client">Client</option>
            <option value="audit">Audit</option>
          </select>
        </div>
      </div>

      {/* Reports List */}
      <div className="card">
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="p-4 border border-secondary-200 rounded-lg hover:border-primary-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-secondary-600">
                      {formatIcons[report.format]}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-secondary-900">{report.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${typeColors[report.type]}`}
                      >
                        {report.type}
                      </span>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${statusColors[report.status]}`}
                      >
                        {report.status}
                      </span>
                    </div>
                    <p className="text-sm text-secondary-500 mt-1">
                      Generated by {report.generatedBy} • {formatDate(report.generatedAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {report.status === 'completed' && (
                    <button className="btn-primary text-sm">Download</button>
                  )}
                  {report.status === 'processing' && (
                    <span className="flex items-center text-sm text-blue-600">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
