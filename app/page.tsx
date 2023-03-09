import Image from 'next/image';
import Link from 'next/link';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Login Symptoms Tracker',
  description: 'Daily Pollen Allergy Symptoms Tracker',
};

type Props = { searchParams: { returnTo?: string | string[] } };

export const dynamic = 'force-dynamic';

export default function Home(props: Props) {
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
        <LoginForm />
        {/* <LoginForm returnTo={props.searchParams.returnTo} /> */}
        <Link href="/register">Register here</Link>
      </div>
    </main>
  );
}
