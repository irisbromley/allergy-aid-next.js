import { notFound } from 'next/navigation';
import { getPersonByID } from '../../../../database/users';
import DailyLogForm from './DailyLogForm';

type Props = { params: { personID: string } };

export const metadata = {
  title: 'Track your pollen allergy sypmtoms',
  description: 'Daily Pollen Allergy Symptoms Tracker',
};

export default async function DailyLogPage({ params }: Props) {
  const person = await getPersonByID(+params.personID);
  console.log(person);
  if (!person) {
    notFound();
  }
  return (
    <main>
      <h1> Hi, {person.name}</h1>
      <DailyLogForm personID={+params.personID} />
    </main>
  );
}
