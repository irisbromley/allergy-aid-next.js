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
          <h2 className="text-white text-2xl md:-4xl lg:text-6xl font-bold mb-4">
            Login
          </h2>
        </div>
      </div>

      <LoginForm />
    </main>
  );
}
