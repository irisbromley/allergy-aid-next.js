import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Home',
  description: 'Daily Pollen Allergy Symptoms Tracker',
  icons: {
    shortcut: '/favicon.ico',
  },
};
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main>
      <div>
        <Image
          src="/pollen.png"
          alt="pollen flying off a dandelion"
          width="200"
          height="200"
        />

        <p>Pollen Allergy Tracker</p>
        <p>here to aide living your best life despite allergies</p>
        <h3>Login:</h3>
        <label>
          Username:
          <input />
        </label>
        <label>
          Password:
          <input />
        </label>
      </div>
      <div>
        {/* <Link href={/register}>Register here</Link> */}

      </div>
    </main>
  );
}
