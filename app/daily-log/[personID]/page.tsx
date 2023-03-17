import { getDailyLogsByPerson } from '../../../database/daily-logs';
import { DailyLogsList } from './DailyLogsList';

type Props = { params: { personID: string } };

export const metadata = {
  title: 'Allergy Diary',
  description: 'Daily Allergy Symptoms Diary',
};

export default async function DailyLogsListPage({ params }: Props) {
  // Get all entries by this person
  const allLogs = await getDailyLogsByPerson(+params.personID);
  console.log(allLogs);
  return (
    <main>
      <div className="flex flex-row-reverse">
        <h2 className="text-white text-2xl md:-4xl lg:text-6xl font-bold mb-4">
          All of personname's diary entries

        </h2>
      </div>
      <DailyLogsList logs = {allLogs}/>
    </main>
  );
}
