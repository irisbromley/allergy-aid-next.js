import { notFound } from 'next/navigation';
import { getUserByEmail } from '../../../database/users';
import DailyLogForm from './DailyLogForm';

type Props = { params: { email: string; name: string } };

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
      <DailyLogForm />
    </main>
  );
}
