'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

// Mock audit log data
const mockAuditLogs = [
  {
    id: 'log-001',
    action: 'CLIENT_PROFILE_UPDATED',
    entityType: 'client',
    entityId: 'client-001',
    entityName: 'Robert Anderson',
    userId: 'user-123',
    userName: 'John Doe',
    userRole: 'advisor',
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome/120.0 (MacOS)',
    details: { fields: ['phone', 'address'] },
    timestamp: new Date('2024-12-05T14:30:00'),
  },
  {
    id: 'log-002',
    action: 'DOCUMENT_APPROVED',
    entityType: 'document',
    entityId: 'doc-004',
    entityName: 'Investment Strategy Brochure',
    userId: 'user-456',
    userName: 'Compliance Team',
    userRole: 'compliance_officer',
    ipAddress: '192.168.1.101',
    userAgent: 'Firefox/121.0 (Windows)',
    details: { approvalNotes: 'Content reviewed and approved' },
    timestamp: new Date('2024-12-05T13:45:00'),
  },
  {
    id: 'log-003',
    action: 'COMPLIANCE_CHECK_ESCALATED',
    entityType: 'compliance_check',
    entityId: 'check-003',
    entityName: 'Client Testimonial Video',
    userId: 'user-456',
    userName: 'Compliance Team',
    userRole: 'compliance_officer',
    ipAddress: '192.168.1.101',
    userAgent: 'Firefox/121.0 (Windows)',
    details: { escalatedTo: 'Chief Compliance Officer', reason: 'Requires CCO review' },
    timestamp: new Date('2024-12-05T11:20:00'),
  },
  {
    id: 'log-004',
    action: 'USER_LOGIN',
    entityType: 'user',
    entityId: 'user-123',
    entityName: 'John Doe',
    userId: 'user-123',
    userName: 'John Doe',
    userRole: 'advisor',
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome/120.0 (MacOS)',
    details: { mfaUsed: true },
    timestamp: new Date('2024-12-05T09:00:00'),
  },
  {
    id: 'log-005',
    action: 'LEAD_CREATED',
    entityType: 'lead',
    entityId: 'lead-001',
    entityName: 'Michael Brown',
    userId: 'system',
    userName: 'System',
    userRole: 'system',
    ipAddress: '10.0.0.1',
    userAgent: 'API/1.0',
    details: { source: 'website', email: 'michael.brown@email.com' },
    timestamp: new Date('2024-12-05T08:30:00'),
  },
  {
    id: 'log-006',
    action: 'REPORT_GENERATED',
    entityType: 'report',
    entityId: 'report-001',
    entityName: 'Q4 2024 Compliance Report',
    userId: 'user-123',
    userName: 'John Doe',
    userRole: 'advisor',
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome/120.0 (MacOS)',
    details: { format: 'pdf', type: 'compliance' },
    timestamp: new Date('2024-12-01T16:00:00'),
  },
  {
    id: 'log-007',
    action: 'CLIENT_CREATED',
    entityType: 'client',
    entityId: 'client-005',
    entityName: 'Michael Brown',
    userId: 'user-123',
    userName: 'John Doe',
    userRole: 'advisor',
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome/120.0 (MacOS)',
    details: { status: 'lead', source: 'website' },
    timestamp: new Date('2024-12-01T10:15:00'),
  },
];

const actionColors: Record<string, string> = {
  CLIENT_PROFILE_UPDATED: 'bg-blue-100 text-blue-800',
  CLIENT_CREATED: 'bg-green-100 text-green-800',
  DOCUMENT_APPROVED: 'bg-green-100 text-green-800',
  DOCUMENT_UPLOADED: 'bg-blue-100 text-blue-800',
  COMPLIANCE_CHECK_ESCALATED: 'bg-yellow-100 text-yellow-800',
  COMPLIANCE_CHECK_CREATED: 'bg-blue-100 text-blue-800',
  USER_LOGIN: 'bg-gray-100 text-gray-800',
  USER_LOGOUT: 'bg-gray-100 text-gray-600',
  LEAD_CREATED: 'bg-purple-100 text-purple-800',
  REPORT_GENERATED: 'bg-orange-100 text-orange-800',
};

export default function AuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [entityFilter, setEntityFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('7d');

  const filteredLogs = mockAuditLogs.filter((log) => {
    const matchesSearch =
      log.entityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEntity = entityFilter === 'all' || log.entityType === entityFilter;
    return matchesSearch && matchesEntity;
  });

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  const formatAction = (action: string) => {
    return action.replace(/_/g, ' ').toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <DashboardLayout userRole="compliance_officer">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-900">Audit Logs</h1>
        <p className="text-secondary-600 mt-1">
          Complete activity trail for compliance and regulatory requirements
        </p>
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
                placeholder="Search by entity, user, or action..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              className="input w-auto"
              value={entityFilter}
              onChange={(e) => setEntityFilter(e.target.value)}
            >
              <option value="all">All Entities</option>
              <option value="client">Client</option>
              <option value="document">Document</option>
              <option value="compliance_check">Compliance</option>
              <option value="user">User</option>
              <option value="lead">Lead</option>
              <option value="report">Report</option>
            </select>
            <select
              className="input w-auto"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button className="btn-outline text-sm">Export CSV</button>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                  Entity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                  IP Address
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Details</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-secondary-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                    {formatDateTime(log.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${actionColors[log.action] || 'bg-gray-100 text-gray-800'}`}
                    >
                      {formatAction(log.action)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-secondary-900">{log.entityName}</p>
                      <p className="text-xs text-secondary-500 capitalize">{log.entityType}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-secondary-900">{log.userName}</p>
                      <p className="text-xs text-secondary-500 capitalize">
                        {log.userRole.replace('_', ' ')}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                    {log.ipAddress}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-secondary-900">No logs found</h3>
            <p className="mt-1 text-sm text-secondary-500">
              Try adjusting your search or filters.
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="bg-white px-4 py-3 border-t border-secondary-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-secondary-500">
              Showing <span className="font-medium">{filteredLogs.length}</span> results
            </div>
            <div className="flex items-center gap-2">
              <button className="btn-outline text-sm" disabled>
                Previous
              </button>
              <button className="btn-outline text-sm" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
