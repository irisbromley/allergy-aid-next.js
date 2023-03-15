import Image from 'next/image';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Allergy Diary Login',
  description: 'Daily Pollen Allergy Symptoms Tracker',
};

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main>
      <div className="flex flex-row-reverse">
        <div>
          {/* <Image
            style={{ transform: 'scaleX(-1)' }}
            className="transform "
            src="/pollen_blackAndWhite.png"
            alt="pollen flying off a dandelion"
            width="100"
            height="100"
          /> */}
        </div>
        <div>
          <h2 className="text-white text-2xl md:-4xl lg:text-6xl font-bold mb-4">
            Allergy Diary
          </h2>
        </div>

        {/* <LoginForm returnTo={props.searchParams.returnTo} /> */}
      </div>

      <LoginForm />
    </main>
  );
}
