import Image from 'next/image';
import Link from 'next/link';
import { transform } from 'typescript';
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
      <div className="flex flex-row-reverse">
        <div>
          <Image
            style={{ transform: 'scaleX(-1)' }}
            className="transform "
            src="/pollen.png"
            alt="pollen flying off a dandelion"
            width="200"
            height="200"
          />
        </div>
        <div>
          <p>Pollen Allergy Tracker</p>
          <p>here to aide living your best life despite allergies</p>
        </div>

        {/* <LoginForm returnTo={props.searchParams.returnTo} /> */}
      </div>

      <LoginForm />
    </main>
  );
}
