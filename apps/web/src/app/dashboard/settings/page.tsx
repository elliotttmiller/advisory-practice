'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

// Mock user data
const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@financialadvisor.com',
  phone: '(555) 123-4567',
  role: 'advisor',
  mfaEnabled: true,
};

// Mock integration status
const mockIntegrations = [
  {
    id: 'int-001',
    name: 'LPL Financial TAMP',
    provider: 'LPL',
    type: 'TAMP',
    status: 'pending_setup' as const,
    lastSync: null,
  },
  {
    id: 'int-002',
    name: 'Redtail CRM',
    provider: 'Redtail',
    type: 'CRM',
    status: 'pending_setup' as const,
    lastSync: null,
  },
  {
    id: 'int-003',
    name: 'Morningstar Market Data',
    provider: 'Morningstar',
    type: 'Market Data',
    status: 'pending_setup' as const,
    lastSync: null,
  },
];

type IntegrationStatus = 'active' | 'inactive' | 'error' | 'pending_setup';

const statusColors: Record<IntegrationStatus, string> = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  error: 'bg-red-100 text-red-800',
  pending_setup: 'bg-yellow-100 text-yellow-800',
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'integrations' | 'notifications'>(
    'profile'
  );
  const [formData, setFormData] = useState(mockUser);

  const tabs = [
    { id: 'profile' as const, name: 'Profile' },
    { id: 'security' as const, name: 'Security' },
    { id: 'integrations' as const, name: 'Integrations' },
    { id: 'notifications' as const, name: 'Notifications' },
  ];

  return (
    <DashboardLayout userRole="advisor">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-900">Settings</h1>
        <p className="text-secondary-600 mt-1">
          Manage your account settings and preferences
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
            </button>
          ))}
        </nav>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="card max-w-2xl">
          <h2 className="text-lg font-semibold text-secondary-900 mb-6">Profile Information</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="label">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="input"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="input"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="phone" className="label">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="pt-4">
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6 max-w-2xl">
          <div className="card">
            <h2 className="text-lg font-semibold text-secondary-900 mb-4">Change Password</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="label">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  className="input"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="label">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="input"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="label">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="input"
                  placeholder="••••••••"
                />
              </div>
              <div className="pt-2">
                <button type="submit" className="btn-primary">
                  Update Password
                </button>
              </div>
            </form>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-secondary-900">
                  Two-Factor Authentication
                </h2>
                <p className="text-sm text-secondary-500 mt-1">
                  Add an extra layer of security to your account
                </p>
              </div>
              <div className="flex items-center gap-3">
                {mockUser.mfaEnabled ? (
                  <>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Enabled
                    </span>
                    <button className="btn-outline text-sm">Disable</button>
                  </>
                ) : (
                  <button className="btn-primary text-sm">Enable 2FA</button>
                )}
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-secondary-900 mb-4">Active Sessions</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary-900">
                      Chrome on MacOS (Current)
                    </p>
                    <p className="text-xs text-secondary-500">
                      192.168.1.100 • San Francisco, CA
                    </p>
                  </div>
                </div>
                <span className="text-xs text-green-600 font-medium">Active now</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="card">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">External Integrations</h2>
          <p className="text-sm text-secondary-500 mb-6">
            Connect your account with external services to sync data automatically.
          </p>
          <div className="space-y-4">
            {mockIntegrations.map((integration) => (
              <div
                key={integration.id}
                className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-secondary-600">
                      {integration.provider.slice(0, 3).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-secondary-900">{integration.name}</h3>
                    <p className="text-sm text-secondary-500">{integration.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[integration.status]}`}
                  >
                    {integration.status.replace('_', ' ')}
                  </span>
                  <button className="btn-outline text-sm">Configure</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="card max-w-2xl">
          <h2 className="text-lg font-semibold text-secondary-900 mb-6">
            Notification Preferences
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-secondary-900">Email Notifications</p>
                <p className="text-sm text-secondary-500">
                  Receive email updates about your account activity
                </p>
              </div>
              <button
                type="button"
                className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                role="switch"
                aria-checked="true"
              >
                <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-secondary-900">Compliance Alerts</p>
                <p className="text-sm text-secondary-500">
                  Get notified when content requires review
                </p>
              </div>
              <button
                type="button"
                className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                role="switch"
                aria-checked="true"
              >
                <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-secondary-900">New Lead Alerts</p>
                <p className="text-sm text-secondary-500">
                  Be notified when new leads are captured
                </p>
              </div>
              <button
                type="button"
                className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                role="switch"
                aria-checked="true"
              >
                <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-secondary-900">Client Messages</p>
                <p className="text-sm text-secondary-500">
                  Receive notifications for new client messages
                </p>
              </div>
              <button
                type="button"
                className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                role="switch"
                aria-checked="true"
              >
                <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-secondary-900">Marketing Digest</p>
                <p className="text-sm text-secondary-500">
                  Weekly summary of marketing performance
                </p>
              </div>
              <button
                type="button"
                className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-secondary-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                role="switch"
                aria-checked="false"
              >
                <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
