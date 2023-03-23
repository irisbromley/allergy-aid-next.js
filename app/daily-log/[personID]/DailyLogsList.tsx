import Link from 'next/link';
import { formatDate } from '../../../utils/formatDate';

export function DailyLogsList(props: { personID: number; logs: any[] }) {
  console.log(props.logs);
  console.log();
  return (
    <>
      <div />
      <div>
        {props.logs.map((item) => (
          <div
            key={`item -${item.id}`}
            className="w-full max-w-md md:max-w-lg mx-auto"
          >
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div>
                <div>{formatDate(item.date)}</div>
                <div>{item.notes} </div>

                {item.symptoms.map((symptom: any) => (
                  <div key={symptom.id}>
                    {symptom.bodyPart}:
                    <ul>
                      {symptom.attributes.map((attribute: any) => (
                        <div key={attribute}>
                          <li>{attribute}</li>
                        </div>
                      ))}
                    </ul>
                  </div>
                ))}

                <button className="bg-red-400 hover:bg-red-600 text-white font-bold px-2 rounded focus:outline-none focus:shadow-outline mr-2">
                  {' '}
                  X
                </button>
                <Link
                  href={`/daily-log/${props.personID}/edit/${item.id}`}
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
