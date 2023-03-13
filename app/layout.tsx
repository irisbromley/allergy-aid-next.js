import './global.css';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';

export const metadata: Metadata = {
  title: 'Track your pollen allergy sypmtoms',
  description: 'Daily Pollen Allergy Symptoms Tracker',
  icons: '/favicon.ico',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');
  const user = token && (await getUserBySessionToken(token.value));
  return (
    <html lang="en">
      <head />

      <body>
        <header>
          <nav className="relative container mx-auto max-w-md p-6 md:max-w-lg ">
            {user && <Link href="/settings">Settings</Link>}
            {user && <Link href="/daily-log">Log Your Day</Link>}
            {user && (
              <Link href="/logout" prefetch={false}>
                Logout
              </Link>
            )}
          </nav>
        </header>
        <div className="mx-auto max-w-md md:max-w-lg">{children}</div>
      </body>
    </html>
  );
}
