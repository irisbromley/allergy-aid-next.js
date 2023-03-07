import Image from 'next/image';
import Link from 'next/link';
import LoginForm from './(auth)/login/LoginForm';

export const metadata = {
  title: 'Home',
  description: 'Daily Pollen Allergy Symptoms Tracker',
  
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
        <LoginForm />

        <Link href="/register">Register here</Link>
      </div>
    </main>
  );
}
