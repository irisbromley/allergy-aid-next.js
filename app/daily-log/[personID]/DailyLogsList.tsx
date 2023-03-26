'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatDate } from '../../../utils/formatDate';
import BodyPartLabel from '../BodyPartLabel';

export function DailyLogsList(props: { personID: number; logs: any[] }) {
  const router = useRouter();

  if (props.logs.length === 0) {
    router.push(`/../daily-log/${props.personID}/new`);
  }

  async function deleteLog(dailyLogID: number) {
    await fetch(`/api/daily-log/`, {
      method: 'DELETE',
      body: JSON.stringify({ dailyLogID }),
    });

    router.refresh();
  }

  return (
    <>
      <div />
      <div>
        {props.logs.map((dailyLog) => (
          <div
            key={`item -${dailyLog.id}`}
            className="w-full max-w-md md:max-w-lg mx-auto"
          >
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div>
                <div>{formatDate(dailyLog.date)}</div>
                <div>{dailyLog.notes} </div>

                {dailyLog.symptoms.map((symptom: any) => (
                  <div key={`symptom-${symptom.id}`}>
                    <BodyPartLabel bodyPart={symptom.bodyPart} />
                    <ul>
                      {symptom.attributes.map((attribute: any) => (
                        <div key={`attribute-${attribute}`}>
                          <li>{attribute}</li>
                        </div>
                      ))}
                    </ul>
                  </div>
                ))}

                <button
                  onClick={() => deleteLog(dailyLog.id)}
                  className="bg-red-400 hover:bg-red-600 text-white font-bold px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                >
                  {' '}
                  X
                </button>
                <Link
                  href={`/daily-log/${props.personID}/edit/${dailyLog.id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-2 rounded  focus:outline-none focus:shadow-outline"
                >
                  {' '}
                  Update
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
