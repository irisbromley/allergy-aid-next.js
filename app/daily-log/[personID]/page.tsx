import { Cousine } from 'next/font/google';
import { getDailyLogsByPerson } from '../../../database/daily-logs';
import { getPersonByID } from '../../../database/users';
import { DailyLogsList } from './DailyLogsList';

type Props = { params: { personID: string } };
const cousine = Cousine({ subsets: ['latin'], weight: '400' });

export const metadata = {
  title: 'Allergy Aid',
  description: 'All Allergy Symptoms Entries',
};
export default async function DailyLogsListPage({ params }: Props) {
  // Get all entries by this person
  const allLogs = await getDailyLogsByPerson(+params.personID);
  const person = await getPersonByID(+params.personID);

  return (
    <main>
      <div className="w-full max-w-md md:max-w-lg mx-auto">
        <h2
          className={
            cousine.className +
            ' px-8 pt-4 font-display text-2xl md:-4xl font-bold  mr-4  '
          }
        >
          {' '}
          All entries for {person?.name}
        </h2>
      </div>
      <DailyLogsList logs={allLogs} personID={+params.personID} />
    </main>
  );
}
