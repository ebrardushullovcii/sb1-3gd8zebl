import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NotificationsProvider } from '@/context/NotificationsContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Notifications',
  description: 'Notification system built with Next.js',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <div className="min-h-screen bg-gradient-to-b from-pink-50 via-pink-100/50 to-pink-50/50">
          <NotificationsProvider>
            {children}
          </NotificationsProvider>
        </div>
      </body>
    </html>
  );
}