import './global.css';
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
          <nav className="relative container mx-auto max-w-md p-6 md:max-w-lg ">
            <Link href="/settings">Settings</Link>
            <Link href="/daily-log">Log Your Day</Link>
            <Link href="/logout">Logout</Link>
          </nav>
        </header>
        <div className="mx-auto max-w-md md:max-w-lg">{children}</div>
      </body>
    </html>
  );
}
