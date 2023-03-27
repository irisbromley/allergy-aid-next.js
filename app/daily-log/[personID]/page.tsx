import { getDailyLogsByPerson } from '../../../database/daily-logs';
import { DailyLogsList } from './DailyLogsList';

type Props = { params: { personID: string } };

export default async function DailyLogsListPage({ params }: Props) {
  // Get all entries by this person
  const allLogs = await getDailyLogsByPerson(+params.personID);

  return (
    <main>
      <div className="flex flex-row-reverse">
        <h2 className="text-white text-2xl md:-4xl lg:text-6xl font-bold mb-4 mr-4">
          All entries
        </h2>
      </div>
      <DailyLogsList logs={allLogs} personID={+params.personID} />
    </main>
  );
}
