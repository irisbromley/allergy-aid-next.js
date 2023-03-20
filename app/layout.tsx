import './global.css';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getPersonsByUserID, getUserBySessionToken } from '../database/users';
import NavBar from './NavBar';

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
  const persons = user ? await getPersonsByUserID(user.id) : [];
  console.log('user', user);

  return (
    <html lang="en">
      <head />

      <body className="bg-comic-clouds bg-cover bg-no-repeat bg-[#d0ebf7]">
        <header>
          <NavBar user={user} persons={persons}/>
        </header>
        <div className="mx-auto max-w-md md:max-w-lg">{children}</div>
      </body>
    </html>
  );
}
