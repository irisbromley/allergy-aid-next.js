import './global.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { getPersonsByUserID, getUserBySessionToken } from '../database/users';
import NavBar from './NavBar';

export const metadata: Metadata = {
  icons: '/favicon-16x16.png',
  title: 'Allergy Aid Login',
  description:
    'Allergy Aid, your daily Allergy Symptoms Tracker here to help you get better control over your allergies and live a better live',
};
const inter = Inter({ subsets: ['latin'], weight: '400' });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');
  const user = token && (await getUserBySessionToken(token.value));
  const persons = user ? await getPersonsByUserID(user.id) : [];

  return (
    <html lang="en">
      <head />

      <body className={inter.className + ' min-h-screen flex flex-col'}>
        <header>
          <NavBar user={user} persons={persons} />
        </header>
        <main className="  flex-1">{children}</main>
      </body>
    </html>
  );
}
