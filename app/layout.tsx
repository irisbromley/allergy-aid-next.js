import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Track your pollen allergy sypmtoms',
  description: 'Daily Pollen Allergy Symptoms Tracker',
  icons: '/favicon.ico',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />

      <body>
        <header>
          <nav>
            <Link href="/settings">Settings</Link>
            <Link href="/dailyLog">Log Your Day</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
