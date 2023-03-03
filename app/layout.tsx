import Link from 'next/link';

export const metadata = {
  title: 'Track your pollen allergy sypmtoms',
  description: 'Daily Pollen Allergy Symptoms Tracker',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/register">Register</Link>
            <Link href="/settings">Settings</Link>
            <Link href="/dailyLog">Daily Log</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
