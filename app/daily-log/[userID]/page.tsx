import { notFound } from 'next/navigation';
import { getUserByID } from '../../../database/users';
import DailyLogForm from './DailyLogForm';

type Props = { params: { userID: number } };

export const metadata = {
  title: 'Track your pollen allergy sypmtoms',
  description: 'Daily Pollen Allergy Symptoms Tracker',
};

export default async function DailyLogPage({ params }: Props) {
  const user = await getUserByID(params.userID);
  console.log(user);
  if (!user) {
    notFound();
  }
  return (
    <main>
      Welcome, {user.name}
      <DailyLogForm />
    </main>
  );
}
