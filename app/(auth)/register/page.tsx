import RegisterForm from './RegisterForm';

export const metadata = {
  title: 'Sypmtoms Tracker',
  description: 'Daily Pollen Allergy Symptoms Tracker',
};

export default function RegisterPage() {
  return (
    <main>
      <div className="flex flex-row-reverse">
        <h2 className="text-white text-2xl md:-4xl lg:text-6xl font-bold mb-4">
          Register
        </h2>
      </div>
      <RegisterForm />
    </main>
  );
}
