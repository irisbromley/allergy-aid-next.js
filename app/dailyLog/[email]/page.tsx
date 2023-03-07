import { notFound } from 'next/navigation';
import { getUserByEmail } from '../../../database/users';
import DailyLogForm from './DailyLogForm';

type Props = { params: { email: string; firstname: string } };

export const metadata = {
  title: 'Track your pollen allergy sypmtoms',
  description: 'Daily Pollen Allergy Symptoms Tracker',
};

export default async function DailyLogPage({ params }: Props) {
  const user = await getUserByEmail(params.email);
  if (!user) {
    notFound();
  }
  return (
    <main>
      <h1>Log your day</h1>
      <h2>Hi, {user.firstname}</h2>
      <p>How are you feeling today?</p>
      <DailyLogForm />
    </main>
  );
}
