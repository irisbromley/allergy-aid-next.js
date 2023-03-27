'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  CreateDailyLogInput,
  DailyLogInput,
  DailyLogResponseBody,
} from '../../../api/daily-log/route';
import BodyPartLabel from '../../BodyPartLabel';

export default function DailyLogForm(props: {
  personID: number;
  dailyLogID?: number;
  date?: string;
  severity?: number;
  notes?: string;
  symptoms?: Array<{
    id: number;
    bodyPart: string;
    attributes: Array<string>;
  }>;
}) {
  const dateOfLog = props.date
    ? props.date
    : new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(dateOfLog);

  const [notes, setNotes] = useState(props.notes ?? '');
  const [severity, setSeverity] = useState(props.severity ?? 0);
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  // Store a data structure like this:
  // {
  //   eyes: ['itchy', 'dry'],
  //   skin: ['slimy'],
  // }
  const initialSymptoms: { [bodyPart: string]: string[] } = {};
  for (const symptom of props.symptoms ?? []) {
    initialSymptoms[symptom.bodyPart] = symptom.attributes;
  }

  const [symptoms, setSymptoms] = useState<{ [bodyPart: string]: string[] }>(
    initialSymptoms,
  );

  const router = useRouter();

  const bodyParts = [
    {
      value: 'eyes',
      symptoms: [
        { value: 'watery', label: 'watery' },
        { value: 'dry', label: 'dry' },
        { value: 'itchy', label: 'itchy' },
        { value: 'swollen', label: 'swollen' },
      ],
    },
    {
      value: 'nose',
      symptoms: [
        { value: 'runny', label: 'runny' },
        { value: 'blocked', label: 'blocked' },
        { value: 'itchy', label: 'itchy' },
        { value: 'sneezing', label: 'sneezing' },
      ],
    },
    {
      value: 'mouth',
      symptoms: [
        { value: 'itchy', label: 'itchy' },
        { value: 'swollen', label: 'swollen' },
      ],
    },
    {
      value: 'lungs',
      symptoms: [
        { value: 'cough', label: 'cough' },
        { value: 'short of breath', label: 'short of breath' },
        { value: 'Asthma', label: 'asthma' },
      ],
    },
    {
      value: 'skin',
      symptoms: [
        { value: 'itchy', label: 'itchy' },
        { value: 'dry', label: 'dry' },
        { value: 'rash', label: 'rash' },
      ],
    },
  ];

  function attributeIsChecked(bodyPart: string, attribute: string): boolean {
    return Array.isArray(symptoms[bodyPart])
      ? symptoms[bodyPart]!.includes(attribute)
      : false;
  }

  function toggleAttribute(bodyPart: string, attribute: string) {
    const attributesForPart = symptoms[bodyPart];
    let updatedAttributes;
    if (attributesForPart == null) {
      updatedAttributes = [attribute];
    } else if (attributesForPart.includes(attribute)) {
      updatedAttributes = attributesForPart.filter(
        (attr) => attr !== attribute,
      );
    } else {
      updatedAttributes = [...attributesForPart, attribute];
    }
    const updatedSymptoms = {
      ...symptoms,
      [bodyPart]: updatedAttributes,
    };
    setSymptoms(updatedSymptoms);
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        let longitude = 0;
        let latitude = 0;

        if (!props.dailyLogID) {
          const coords = await new Promise<GeolocationCoordinates>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  resolve(position.coords);
                },
                (err) => reject(err),
              );
            },
          );
          longitude = coords.longitude;
          latitude = coords.latitude;
        }

        const symptomsArray = Object.entries(symptoms).map(
          ([bodyPart, attributes]) => ({ bodyPart, attributes }),
        );

        const input: DailyLogInput | CreateDailyLogInput = {
          date: new Date(date),
          latitude,
          longitude,
          notes,
          severity,
          symptoms: symptomsArray,
          personID: props.personID,
        };
        if (props.dailyLogID) {
          (input as CreateDailyLogInput).dailyLogID = props.dailyLogID;
        }

        const response = await fetch('/api/daily-log', {
          method: props.dailyLogID ? 'PUT' : 'POST',
          body: JSON.stringify(input),
        });

        const data: DailyLogResponseBody = await response.json();

        if ('errors' in data) {
          setErrors(data.errors);
          return;
        }

        router.push(`/daily-log/${props.personID}`);
      }}
    >
      {errors.map((error) => (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
          key={`error-${error.message}`}
        >
          Error: {error.message}
        </div>
      ))}

      {/*  */}
      <div className="w-full max-w-md md:max-w-lg mx-auto">
        <div className="bg-white rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <div
              className="relative mb-3 xl:w-96"
              data-te-datepicker-init
              data-te-input-wrapper-init
            >
              <label
                htmlFor="floatingInput"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Select a date:
              </label>
              <input
                required
                type="date"
                data-te-datepicker-toggle-ref
                data-te-datepicker-toggle-button-ref
                className="form-input"
                placeholder="Select a date"
                value={date}
                onChange={(event) => setDate(event.currentTarget.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <p className="block text-gray-700 text-sm font-bold mb-2">
              Severity {severity}:
            </p>

            <label className="block text-gray-700 text-sm font-bold mb-2">
              <input
                required
                placeholder="Severity"
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200 accent-violet-700 "
                type="range"
                min={1}
                max={4}
                value={severity}
                onChange={(event) => setSeverity(+event.currentTarget.value)}
              />
            </label>
          </div>

          <div className="mb-4">
            <label
              htmlFor="additional notes"
              className="block text-gray-700 text-sm  mb-2"
            >
              <textarea
                rows={2}
                className="form-input"
                value={notes}
                placeholder="Comments ..."
                onChange={(event) => setNotes(event.currentTarget.value)}
              />
            </label>
          </div>

          <div className="mb-4 divide-y ">
            {bodyParts.map((part) => (
              <div className=" py-4" key={`part-${part.value}`}>
                <BodyPartLabel bodyPart={part.value} />
                <div className="flex flex-wrap items-baseline gap-x-4 space-y-4  justify-end ">
                  {part.symptoms.map((symptom) => (
                    <div key={`symptom-${symptom.value}`}>
                      <button
                        className={
                          ' rounded-full border-solid border px-4 py-1 text-sm ' +
                          (attributeIsChecked(part.value, symptom.value)
                            ? 'bg-violet-500 text-violet-100 font-medium border-violet-500'
                            : 'bg-violet-100 border-violet-500 font-medium text-violet-700  ')
                        }
                        type="button"
                        name={part.value + symptom.value}
                        value={symptom.value}
                        onClick={() =>
                          toggleAttribute(part.value, symptom.value)
                        }
                      >
                        <div>{symptom.label}</div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-10">
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
              {props.dailyLogID ? 'Update Entry' : 'Create Entry'}
            </button>
          </div>
        </div>
      </div>

      {/*  */}
    </form>
  );
}
