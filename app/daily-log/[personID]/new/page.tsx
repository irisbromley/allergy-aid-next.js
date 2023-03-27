import { Cousine } from 'next/font/google';
import { notFound } from 'next/navigation';
import { getPersonByID } from '../../../../database/users';
import DailyLogForm from './DailyLogForm';

const cousine = Cousine({ subsets: ['latin'], weight: '400' });
type Props = { params: { personID: string } };

export const metadata = {
  title: 'Allergy Aid',
  description: 'New Allergy Symptoms Entry',
};

export default async function DailyLogPage({ params }: Props) {
  const person = await getPersonByID(+params.personID);

  if (!person) {
    notFound();
  }
  return (
    <main>
      <div className="flex flex-row">
        <h2
          className={
            cousine.className +
            ' px-8 pt-4 font-display text-2xl md:-4xl font-bold mb-4 mr-4'
          }
        >
          Make a new entry for {person.name}
        </h2>
      </div>
      <DailyLogForm personID={+params.personID} />
    </main>
  );
}
