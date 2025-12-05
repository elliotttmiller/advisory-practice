'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

// Mock compliance data
const mockComplianceChecks = [
  {
    id: 'check-001',
    type: 'SEC_MARKETING_206_4_1',
    targetType: 'document',
    targetName: 'Q4 Newsletter Draft',
    status: 'pending' as const,
    severity: 'high' as const,
    findings: ['Prohibited term "guaranteed" found - requires removal', 'Performance claim detected - requires supporting documentation'],
    recommendations: ['Remove or replace the prohibited term', 'Add required disclosure about past performance'],
    createdAt: new Date('2024-12-03'),
    submittedBy: 'Sarah Johnson',
  },
  {
    id: 'check-002',
    type: 'FINRA_2210',
    targetType: 'communication',
    targetName: 'Social Media Post - Market Update',
    status: 'pending' as const,
    severity: 'medium' as const,
    findings: ['Missing past performance disclaimer', 'Forward-looking statement detected'],
    recommendations: ['Add required disclaimer', 'Modify language to avoid implying certainty'],
    createdAt: new Date('2024-12-04'),
    submittedBy: 'Mike Chen',
  },
  {
    id: 'check-003',
    type: 'SEC_MARKETING_206_4_1',
    targetType: 'document',
    targetName: 'Client Testimonial Video',
    status: 'escalated' as const,
    severity: 'critical' as const,
    findings: ['Testimonial detected - requires compensation disclosure', 'Missing material connection disclosure'],
    recommendations: ['Add compensation disclosure if applicable', 'Include material connection statement'],
    createdAt: new Date('2024-12-02'),
    submittedBy: 'Emily Davis',
    escalatedTo: 'Chief Compliance Officer',
  },
  {
    id: 'check-004',
    type: 'FINRA_2210',
    targetType: 'document',
    targetName: 'Investment Strategy Brochure',
    status: 'approved' as const,
    severity: 'low' as const,
    findings: [],
    recommendations: [],
    createdAt: new Date('2024-12-01'),
    submittedBy: 'John Doe',
    reviewedBy: 'Compliance Team',
    reviewedAt: new Date('2024-12-02'),
  },
  {
    id: 'check-005',
    type: 'SEC_MARKETING_206_4_1',
    targetType: 'communication',
    targetName: 'Email Campaign - Year End Review',
    status: 'rejected' as const,
    severity: 'high' as const,
    findings: ['Superlative language "best" requires substantiation', 'Hypothetical performance without disclaimer'],
    recommendations: ['Provide supporting evidence or remove claim', 'Add hypothetical performance limitations disclosure'],
    createdAt: new Date('2024-11-30'),
    submittedBy: 'Marketing Team',
    reviewedBy: 'Compliance Team',
    reviewedAt: new Date('2024-12-01'),
  },
];

const mockAuditLogs = [
  {
    id: 'audit-001',
    action: 'COMPLIANCE_CHECK_CREATED',
    entityType: 'compliance_check',
    entityId: 'check-001',
    userId: 'user-123',
    userRole: 'advisor',
    details: { targetName: 'Q4 Newsletter Draft' },
    timestamp: new Date('2024-12-03T10:30:00'),
  },
  {
    id: 'audit-002',
    action: 'COMPLIANCE_CHECK_REVIEWED',
    entityType: 'compliance_check',
    entityId: 'check-004',
    userId: 'user-456',
    userRole: 'compliance_officer',
    details: { status: 'approved', targetName: 'Investment Strategy Brochure' },
    timestamp: new Date('2024-12-02T15:45:00'),
  },
  {
    id: 'audit-003',
    action: 'COMPLIANCE_CHECK_ESCALATED',
    entityType: 'compliance_check',
    entityId: 'check-003',
    userId: 'user-456',
    userRole: 'compliance_officer',
    details: { escalatedTo: 'Chief Compliance Officer', targetName: 'Client Testimonial Video' },
    timestamp: new Date('2024-12-02T14:20:00'),
  },
];

type StatusType = 'pending' | 'approved' | 'rejected' | 'escalated';
type SeverityType = 'low' | 'medium' | 'high' | 'critical';

const statusColors: Record<StatusType, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  escalated: 'bg-purple-100 text-purple-800',
};

const severityColors: Record<SeverityType, string> = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800',
};

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState<'review' | 'audit'>('review');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCheck, setSelectedCheck] = useState<string | null>(null);

  const filteredChecks = mockComplianceChecks.filter(
    (check) => statusFilter === 'all' || check.status === statusFilter
  );

  const selectedCheckData = mockComplianceChecks.find((c) => c.id === selectedCheck);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  const formatRuleType = (type: string) => {
    switch (type) {
      case 'SEC_MARKETING_206_4_1':
        return 'SEC Marketing Rule';
      case 'FINRA_2210':
        return 'FINRA 2210';
      case 'GLBA_SAFEGUARDS':
        return 'GLBA Safeguards';
      case 'SEC_REG_S_P':
        return 'SEC Reg S-P';
      case 'AML_KYC':
        return 'AML/KYC';
      default:
        return type;
    }
  };

  const stats = {
    pending: mockComplianceChecks.filter((c) => c.status === 'pending').length,
    approved: mockComplianceChecks.filter((c) => c.status === 'approved').length,
    rejected: mockComplianceChecks.filter((c) => c.status === 'rejected').length,
    escalated: mockComplianceChecks.filter((c) => c.status === 'escalated').length,
  };

  return (
    <DashboardLayout userRole="compliance_officer" pendingReviews={stats.pending}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-900">Compliance Center</h1>
        <p className="text-secondary-600 mt-1">
          Review and manage compliance checks for marketing content and communications
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card">
          <p className="text-sm text-secondary-500">Pending Review</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="card">
          <p className="text-sm text-secondary-500">Approved</p>
          <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
        </div>
        <div className="card">
          <p className="text-sm text-secondary-500">Rejected</p>
          <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
        </div>
        <div className="card">
          <p className="text-sm text-secondary-500">Escalated</p>
          <p className="text-2xl font-bold text-purple-600">{stats.escalated}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-secondary-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('review')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'review'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            Review Queue
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'audit'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            Audit Log
          </button>
        </nav>
      </div>

      {activeTab === 'review' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-secondary-900">Compliance Checks</h2>
                <select
                  className="input w-auto"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="escalated">Escalated</option>
                </select>
              </div>
              <div className="space-y-3">
                {filteredChecks.map((check) => (
                  <button
                    key={check.id}
                    onClick={() => setSelectedCheck(check.id)}
                    className={`w-full p-4 text-left border rounded-lg hover:border-primary-300 transition-colors ${
                      selectedCheck === check.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-secondary-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-secondary-900">{check.targetName}</p>
                        <p className="text-sm text-secondary-500">
                          {formatRuleType(check.type)} • {check.targetType}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${severityColors[check.severity]}`}
                        >
                          {check.severity}
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${statusColors[check.status]}`}
                        >
                          {check.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-xs text-secondary-500">
                      <span>Submitted: {formatDate(check.createdAt)}</span>
                      <span>By: {check.submittedBy}</span>
                    </div>
                    {check.findings.length > 0 && (
                      <p className="mt-2 text-sm text-secondary-600 truncate">
                        {check.findings[0]}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            {selectedCheckData ? (
              <div className="card sticky top-24">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  Review Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-secondary-500">Content</p>
                    <p className="font-medium text-secondary-900">{selectedCheckData.targetName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-500">Rule</p>
                    <p className="text-sm text-secondary-900">
                      {formatRuleType(selectedCheckData.type)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-500">Status</p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[selectedCheckData.status]}`}
                    >
                      {selectedCheckData.status}
                    </span>
                  </div>

                  {selectedCheckData.findings.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-secondary-900 mb-2">Findings</p>
                      <ul className="space-y-2">
                        {selectedCheckData.findings.map((finding, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-red-700 bg-red-50 p-2 rounded"
                          >
                            {finding}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedCheckData.recommendations.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-secondary-900 mb-2">
                        Recommendations
                      </p>
                      <ul className="space-y-2">
                        {selectedCheckData.recommendations.map((rec, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-blue-700 bg-blue-50 p-2 rounded"
                          >
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedCheckData.status === 'pending' && (
                    <div className="pt-4 flex gap-2">
                      <button className="btn-primary flex-1 text-sm">Approve</button>
                      <button className="btn-outline flex-1 text-sm text-red-600 border-red-300 hover:bg-red-50">
                        Reject
                      </button>
                      <button className="btn-outline flex-1 text-sm">Escalate</button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="card text-center py-12 text-secondary-500">
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <p className="mt-2">Select a check to view details</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="card">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">Audit Trail</h2>
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
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {mockAuditLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                      {formatDateTime(log.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-secondary-900">
                        {log.action.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-secondary-900">{log.userId}</span>
                      <span className="ml-2 text-xs text-secondary-500">({log.userRole})</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary-500">
                      {log.details.targetName && <span>{log.details.targetName as string}</span>}
                      {log.details.status && (
                        <span className="ml-2 capitalize">→ {log.details.status as string}</span>
                      )}
                      {log.details.escalatedTo && (
                        <span className="ml-2">
                          → Escalated to {log.details.escalatedTo as string}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
