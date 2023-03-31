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
  const theme = cookieStore.get('theme');
  console.log(theme);

  return (
    <html lang="en" className={theme?.value === 'dark' ? 'dark' : 'light'}>
      <head />

      <body
        className={
          inter.className + ' min-h-screen flex flex-col dark:bg-gray-800'
        }
      >
        <header>
          <NavBar user={user} persons={persons} />
        </header>

        <main className=" dark:text-white flex-1 pt-8">{children}</main>

        <footer className="">
          <div className="w-full bg-gray-100  dark:bg-gray-800 ">
            <div className="  text-teal-600 dark:text-teal-400 max-w-4xl m-auto flex justify-between items-center px-6 py-6 mt-6">
              <p className="text-sm">Allergy Aid - Made with ❤️ by Iris</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
