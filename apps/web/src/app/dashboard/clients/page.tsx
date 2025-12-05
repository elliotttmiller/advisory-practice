'use client';

import { useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';

// Mock client data
const mockClients = [
  {
    id: 'client-001',
    firstName: 'Robert',
    lastName: 'Anderson',
    email: 'robert.anderson@email.com',
    phone: '(555) 123-4567',
    status: 'client' as const,
    riskTolerance: 'moderate' as const,
    assetsUnderManagement: 209268,
    advisorName: 'John Doe',
    onboardingStatus: 'approved' as const,
    lastContact: new Date('2024-12-01'),
  },
  {
    id: 'client-002',
    firstName: 'Jennifer',
    lastName: 'Martinez',
    email: 'jennifer.martinez@email.com',
    phone: '(555) 234-5678',
    status: 'client' as const,
    riskTolerance: 'aggressive' as const,
    assetsUnderManagement: 540483,
    advisorName: 'John Doe',
    onboardingStatus: 'approved' as const,
    lastContact: new Date('2024-11-28'),
  },
  {
    id: 'client-003',
    firstName: 'William',
    lastName: 'Thompson',
    email: 'william.thompson@email.com',
    phone: '(555) 345-6789',
    status: 'client' as const,
    riskTolerance: 'conservative' as const,
    assetsUnderManagement: 126647,
    advisorName: 'John Doe',
    onboardingStatus: 'approved' as const,
    lastContact: new Date('2024-11-25'),
  },
  {
    id: 'client-004',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 456-7890',
    status: 'prospect' as const,
    riskTolerance: 'moderate' as const,
    assetsUnderManagement: 0,
    advisorName: 'John Doe',
    onboardingStatus: 'kyc_required' as const,
    lastContact: new Date('2024-12-03'),
  },
  {
    id: 'client-005',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@email.com',
    phone: '(555) 567-8901',
    status: 'lead' as const,
    riskTolerance: 'aggressive' as const,
    assetsUnderManagement: 0,
    advisorName: 'John Doe',
    onboardingStatus: 'pending' as const,
    lastContact: new Date('2024-12-05'),
  },
  {
    id: 'client-006',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@email.com',
    phone: '(555) 678-9012',
    status: 'client' as const,
    riskTolerance: 'moderate' as const,
    assetsUnderManagement: 322981,
    advisorName: 'John Doe',
    onboardingStatus: 'approved' as const,
    lastContact: new Date('2024-11-30'),
  },
];

type ClientStatus = 'lead' | 'prospect' | 'client' | 'inactive';
type RiskTolerance = 'conservative' | 'moderate' | 'aggressive';

const statusColors: Record<ClientStatus, string> = {
  lead: 'bg-blue-100 text-blue-800',
  prospect: 'bg-yellow-100 text-yellow-800',
  client: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
};

const riskColors: Record<RiskTolerance, string> = {
  conservative: 'bg-green-100 text-green-800',
  moderate: 'bg-yellow-100 text-yellow-800',
  aggressive: 'bg-red-100 text-red-800',
};

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch =
      `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    const matchesRisk = riskFilter === 'all' || client.riskTolerance === riskFilter;
    return matchesSearch && matchesStatus && matchesRisk;
  });

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
    <DashboardLayout userRole="advisor">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">Clients</h1>
            <p className="text-secondary-600 mt-1">
              Manage your client relationships and portfolios
            </p>
          </div>
          <Link
            href="/dashboard/clients/new"
            className="btn-primary flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Client
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="sr-only">
              Search clients
            </label>
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
                id="search"
                className="input pl-10"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <label htmlFor="status" className="sr-only">
                Filter by status
              </label>
              <select
                id="status"
                className="input"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="lead">Lead</option>
                <option value="prospect">Prospect</option>
                <option value="client">Client</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label htmlFor="risk" className="sr-only">
                Filter by risk tolerance
              </label>
              <select
                id="risk"
                className="input"
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
              >
                <option value="all">All Risk Levels</option>
                <option value="conservative">Conservative</option>
                <option value="moderate">Moderate</option>
                <option value="aggressive">Aggressive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Client List */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200">
            <thead className="bg-secondary-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider"
                >
                  Client
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider"
                >
                  Risk Profile
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider"
                >
                  AUM
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider"
                >
                  Last Contact
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-secondary-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-600 font-medium text-sm">
                            {client.firstName[0]}
                            {client.lastName[0]}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-secondary-900">
                          {client.firstName} {client.lastName}
                        </div>
                        <div className="text-sm text-secondary-500">{client.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[client.status]}`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${riskColors[client.riskTolerance]}`}
                    >
                      {client.riskTolerance}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                    {client.assetsUnderManagement > 0
                      ? formatCurrency(client.assetsUnderManagement)
                      : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                    {formatDate(client.lastContact)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/dashboard/clients/${client.id}`}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredClients.length === 0 && (
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-secondary-900">No clients found</h3>
            <p className="mt-1 text-sm text-secondary-500">
              Try adjusting your search or filter to find what you&apos;re looking for.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
