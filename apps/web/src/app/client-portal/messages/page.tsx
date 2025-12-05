'use client';

import { useState } from 'react';
import ClientPortalLayout from '@/components/ClientPortalLayout';

// Mock messages data
const mockThreads = [
  {
    id: 'thread-001',
    participantName: 'John Doe',
    participantRole: 'Financial Advisor',
    subject: 'Portfolio Review Summary',
    lastMessage:
      'Thank you for the detailed breakdown of my portfolio performance. The changes make sense given what we discussed about my retirement timeline.',
    lastMessageAt: new Date('2024-12-05T14:30:00'),
    unreadCount: 1,
  },
  {
    id: 'thread-002',
    participantName: 'John Doe',
    participantRole: 'Financial Advisor',
    subject: 'Year-End Tax Planning',
    lastMessage:
      'I wanted to discuss some year-end tax strategies that could benefit your portfolio...',
    lastMessageAt: new Date('2024-12-02T09:15:00'),
    unreadCount: 0,
  },
  {
    id: 'thread-003',
    participantName: 'John Doe',
    participantRole: 'Financial Advisor',
    subject: 'Quarterly Review Meeting',
    lastMessage:
      'Great speaking with you today! As discussed, here is the summary of our quarterly review meeting.',
    lastMessageAt: new Date('2024-11-15T16:45:00'),
    unreadCount: 0,
  },
];

const mockMessages: Record<
  string,
  Array<{
    id: string;
    sender: string;
    senderType: 'advisor' | 'client';
    content: string;
    timestamp: Date;
  }>
> = {
  'thread-001': [
    {
      id: 'msg-001',
      sender: 'John Doe',
      senderType: 'advisor',
      content:
        'Hi Robert, I wanted to follow up on our recent meeting about your portfolio. I have prepared a detailed breakdown of your current allocations and performance.',
      timestamp: new Date('2024-12-05T10:00:00'),
    },
    {
      id: 'msg-002',
      sender: 'Robert Anderson',
      senderType: 'client',
      content:
        'Thank you, John! I appreciate you taking the time to go through everything with me. Could you explain the recent rebalancing in more detail?',
      timestamp: new Date('2024-12-05T11:30:00'),
    },
    {
      id: 'msg-003',
      sender: 'John Doe',
      senderType: 'advisor',
      content:
        'Of course! We made some adjustments to better align with your risk profile and the current market conditions. The main changes were: 1) Reduced equity exposure by 5% 2) Increased fixed income allocation 3) Added some international diversification. Would you like me to schedule a call to discuss in detail?',
      timestamp: new Date('2024-12-05T13:15:00'),
    },
    {
      id: 'msg-004',
      sender: 'Robert Anderson',
      senderType: 'client',
      content:
        'Thank you for the detailed breakdown of my portfolio performance. The changes make sense given what we discussed about my retirement timeline. A call would be great - are you available Thursday afternoon?',
      timestamp: new Date('2024-12-05T14:30:00'),
    },
  ],
  'thread-002': [
    {
      id: 'msg-005',
      sender: 'John Doe',
      senderType: 'advisor',
      content:
        'Hi Robert, I wanted to discuss some year-end tax strategies that could benefit your portfolio. There are a few opportunities for tax-loss harvesting that we should consider before the end of the year.',
      timestamp: new Date('2024-12-02T09:15:00'),
    },
  ],
  'thread-003': [
    {
      id: 'msg-006',
      sender: 'John Doe',
      senderType: 'advisor',
      content:
        'Great speaking with you today! As discussed, here is the summary of our quarterly review meeting. Your portfolio has performed well this quarter, up 3.2% versus the benchmark return of 2.8%.',
      timestamp: new Date('2024-11-15T16:45:00'),
    },
  ],
};

export default function ClientMessagesPage() {
  const [selectedThread, setSelectedThread] = useState<string | null>('thread-001');
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredThreads = mockThreads.filter(
    (thread) =>
      thread.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentMessages = selectedThread ? mockMessages[selectedThread] || [] : [];
  const currentThread = mockThreads.find((t) => t.id === selectedThread);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(date);
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
    } else {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
      }).format(date);
    }
  };

  const formatFullTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) {
      return;
    }
    // TODO: Send message to API
    setNewMessage('');
  };

  return (
    <ClientPortalLayout>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary-900">Messages</h1>
        <p className="text-secondary-600 mt-1">Communicate securely with your advisor</p>
      </div>

      <div className="card overflow-hidden h-[calc(100vh-16rem)]">
        <div className="flex h-full">
          {/* Thread List */}
          <div className="w-80 border-r border-secondary-200 flex flex-col">
            <div className="p-4 border-b border-secondary-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 text-secondary-400"
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
                  className="input pl-9 py-2 text-sm"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredThreads.map((thread) => (
                <button
                  key={thread.id}
                  onClick={() => setSelectedThread(thread.id)}
                  className={`w-full p-4 text-left border-b border-secondary-100 hover:bg-secondary-50 transition-colors ${
                    selectedThread === thread.id ? 'bg-primary-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex-shrink-0 flex items-center justify-center">
                      <span className="text-primary-600 font-medium text-sm">
                        {thread.participantName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-sm font-medium truncate ${
                            thread.unreadCount > 0 ? 'text-secondary-900' : 'text-secondary-700'
                          }`}
                        >
                          {thread.participantName}
                        </p>
                        <span className="text-xs text-secondary-500">
                          {formatTime(thread.lastMessageAt)}
                        </span>
                      </div>
                      <p
                        className={`text-sm truncate ${
                          thread.unreadCount > 0
                            ? 'text-secondary-900 font-medium'
                            : 'text-secondary-500'
                        }`}
                      >
                        {thread.subject}
                      </p>
                      <p className="text-xs text-secondary-400 truncate mt-1">
                        {thread.lastMessage}
                      </p>
                    </div>
                    {thread.unreadCount > 0 && (
                      <span className="flex-shrink-0 bg-primary-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                        {thread.unreadCount}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <div className="p-4 border-t border-secondary-200">
              <button className="btn-primary w-full text-sm">New Message</button>
            </div>
          </div>

          {/* Message Thread */}
          {selectedThread && currentThread ? (
            <div className="flex-1 flex flex-col">
              {/* Thread Header */}
              <div className="p-4 border-b border-secondary-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-600 font-medium text-sm">
                      {currentThread.participantName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900">{currentThread.participantName}</p>
                    <p className="text-sm text-secondary-500">{currentThread.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 text-secondary-600 hover:text-secondary-900 rounded-lg hover:bg-secondary-100"
                    aria-label="Schedule call"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderType === 'client' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] ${
                        message.senderType === 'client'
                          ? 'bg-primary-600 text-white'
                          : 'bg-secondary-100 text-secondary-900'
                      } rounded-lg px-4 py-2`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.senderType === 'client' ? 'text-primary-200' : 'text-secondary-500'
                        }`}
                      >
                        {formatFullTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-secondary-200">
                <form onSubmit={handleSendMessage} className="flex items-end gap-3">
                  <button
                    type="button"
                    className="p-2 text-secondary-600 hover:text-secondary-900 rounded-lg hover:bg-secondary-100"
                    aria-label="Attach file"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                  </button>
                  <div className="flex-1">
                    <textarea
                      rows={1}
                      className="input resize-none"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary px-4 py-2"
                    disabled={!newMessage.trim()}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </form>
                <p className="text-xs text-secondary-500 mt-2">
                  All messages are encrypted and stored for compliance purposes.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-secondary-500">
              <div className="text-center">
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <p className="mt-2">Select a conversation to view messages</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </ClientPortalLayout>
  );
}
