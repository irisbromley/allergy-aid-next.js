import { notFound } from 'next/navigation';
import { getUserByEmail } from '../../database/users';

// import DailyLogForm from './[personID]/new/DailyLogForm';

type Props = { params: { email: string; name: string } };

export const metadata = {
  title: 'Allergy Aid Login',
  description:
    'Allergy Aid, your daily Allergy Symptoms Tracker here to help you get better control over your allergies and live a better live',
};

export default async function DailyLogPage({ params }: Props) {
  const user = await getUserByEmail(params.email);
  if (!user) {
    notFound();
  }
  return (
    // If there more people in persons to log for choose one if not,
    <main />
  );
}
