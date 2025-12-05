import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'Financial Advisor Platform',
    template: '%s | Financial Advisor Platform',
  },
  description:
    'Enterprise-grade financial advisory practice platform with FINRA/SEC regulatory compliance.',
  keywords: ['financial advisor', 'wealth management', 'investment advisory', 'FINRA compliant'],
  authors: [{ name: 'Financial Advisory Team' }],
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0284c7',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-white antialiased">{children}</body>
    </html>
  );
}
