import { notFound } from 'next/navigation';
import { getDailyLogByID } from '../../../../../database/daily-logs';
import { getPersonByID } from '../../../../../database/users';
import DailyLogForm from '../../new/DailyLogForm';

type Props = { params: { dailyLogID: string; personID: number } };

export default async function EditDailyLogPage({ params }: Props) {
  const dailyLog = await getDailyLogByID(+params.dailyLogID, +params.personID);
  const person = await getPersonByID(+params.personID);
  console.log(dailyLog);

  if (!dailyLog || !person) {
    notFound();
  }
  return (
    <main>
      <div className="flex flex-row-reverse">
        <h2 className="text-white text-2xl md:-4xl lg:text-6xl font-bold mb-4">
          {person.name}, update your daily log here
        </h2>
      </div>
      <DailyLogForm
        dailyLogID={+params.dailyLogID}
        personID={+params.personID}
        severity={+dailyLog.severity}
        date={dailyLog.date.toISOString().slice(0, 10)}
        notes={dailyLog.notes}
        symptoms={dailyLog.symptoms}
      />
    </main>
  );
}
