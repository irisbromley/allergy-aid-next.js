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
    <div>
      {props.logs.map((dailyLog) => (
        <div
          key={`item -${dailyLog.id}`}
          className="w-full max-w-md md:max-w-lg mx-auto"
        >
          <div className="px-8 pt-6 pb-8 mb-6">
            <div>
              <div className="text-gray-600 text-sm mb-2">
                {formatDate(dailyLog.date)}
              </div>
              <div className="mb-4">{dailyLog.notes} </div>
              <div className="text-violet-700 rounded-full border-solid border px-4 py-1 text-sm bg-violet-100 border-violet-500 font-medium min-w-min mb-4 inline-block  dark:text-white  dark:bg-violet-700 dark:border-none ">
                Severity: {dailyLog.severity}{' '}
              </div>
              {dailyLog.symptoms.map((symptom: any) => (
                <div className="flex gap-x-2 " key={`symptom-${symptom.id}`}>
                  <div className="flex">
                    {' '}
                    <BodyPartLabel bodyPart={symptom.bodyPart} /> :
                  </div>
                  <ul className="flex gap-2">
                    {symptom.attributes.map((attribute: any, index: number) => (
                      <li key={`attribute-${attribute}`} className="   ">
                        {attribute}
                        {index !== symptom.attributes.length - 1 ? ',' : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="flex items-center justify-between mt-6">
                <Link
                  href={`/daily-log/${props.personID}/edit/${dailyLog.id}`}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded  focus:outline-none focus:shadow-outline"
                >
                  {' '}
                  Update
                </Link>
                <button
                  onClick={() => deleteLog(dailyLog.id)}
                  className="text-orange-400 hover:bg-orange-600 hover:text-white bg-white font-bold py-1 px-3 rounded border-solid focus:outline-none "
                >
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
