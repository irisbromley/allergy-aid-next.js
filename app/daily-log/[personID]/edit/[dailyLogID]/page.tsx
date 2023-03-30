import { Cousine } from 'next/font/google';
import { notFound, useRouter } from 'next/navigation';
import { getDailyLogByID } from '../../../../../database/daily-logs';
import { getPersonByID } from '../../../../../database/users';
import DailyLogForm from '../../new/DailyLogForm';

type Props = { params: { dailyLogID: string; personID: number } };
const cousine = Cousine({ subsets: ['latin'], weight: '400' });
export default async function EditDailyLogPage({ params }: Props) {
  const dailyLog = await getDailyLogByID(+params.dailyLogID, +params.personID);
  const person = await getPersonByID(+params.personID);
  console.log(dailyLog);
  const router = useRouter();

  if (!dailyLog || !person) {
    notFound();
  }
  router.refresh();

  return (
    <main>
      <div className="w-full max-w-md md:max-w-lg mx-auto">
        <h2
          className={
            cousine.className +
            ' px-8 pt-4 font-display text-2xl md:-4xl font-bold  mr-4  '
          }
        >
          Update entry for {person.name}
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
