import { Cousine } from 'next/font/google';
import { getDailyLogsByPerson } from '../../../database/daily-logs';
import { getPersonByID } from '../../../database/users';
import { DailyLogsList } from './DailyLogsList';

type Props = { params: { personID: string } };
const cousine = Cousine({ subsets: ['latin'], weight: '400' });

export default async function DailyLogsListPage({ params }: Props) {
  // Get all entries by this person
  const allLogs = await getDailyLogsByPerson(+params.personID);
  const person = await getPersonByID(+params.personID);

  return (
    <main>
      <h2
        className={
          cousine.className +
          ' px-8 pt-4 font-display text-2xl md:-4xl font-bold mb-4 mr-4'
        }
      >
        {person?.name}
      </h2>

      <DailyLogsList logs={allLogs} personID={+params.personID} />
    </main>
  );
}
