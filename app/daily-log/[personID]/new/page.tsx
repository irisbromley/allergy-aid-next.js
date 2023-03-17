import { notFound } from 'next/navigation';
import { getPersonByID } from '../../../../database/users';
import DailyLogForm from './DailyLogForm';

type Props = { params: { personID: string } };

export const metadata = {
  title: 'Allergy Diary',
  description: 'Daily Allergy Symptoms Diary',
};

export default async function DailyLogPage({ params }: Props) {
  const person = await getPersonByID(+params.personID);
  console.log(person);
  if (!person) {
    notFound();
  }
  return (
    <main>
      <div className="flex flex-row-reverse">
        <h2 className="text-white text-2xl md:-4xl lg:text-6xl font-bold mb-4">
          Hi, {person.name}
        </h2>
      </div>
      <DailyLogForm personID={+params.personID} />
    </main>
  );
}
