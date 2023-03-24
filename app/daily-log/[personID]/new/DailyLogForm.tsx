'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  CreateDailyLogInput,
  DailyLogInput,
  DailyLogResponseBody,
} from '../../../api/daily-log/route';

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
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
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
      label: ' 👁 Eyes',
      symptoms: [
        { value: 'watery', label: 'watery' },
        { value: 'dry', label: 'dry' },
        { value: 'itchy', label: 'itchy' },
        { value: 'swollen', label: 'swollen' },
        { value: 'foreign body sensation', label: 'foreign body sensation' },
      ],
    },
    {
      value: 'nose',
      label: '👃 Nose',
      symptoms: [
        { value: 'runny', label: 'runny' },
        { value: 'blocked', label: 'blocked' },
        { value: 'itchy', label: 'itchy' },
        { value: 'sneezing', label: 'sneezing' },
      ],
    },
    {
      value: 'mouth',
      label: '👄 Mouth',
      symptoms: [
        { value: 'itchy', label: 'itchy' },
        { value: 'swollen', label: 'swollen' },
      ],
    },
    {
      value: 'lungs',
      label: '🫁 Lungs',
      symptoms: [
        { value: 'cough', label: 'cough' },
        { value: 'short of breath', label: 'short of breath' },
        { value: 'Asthma', label: 'asthma' },
      ],
    },
    {
      value: 'skin',
      label: ' 🦵 Skin',
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
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
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
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              <textarea
                rows={2}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={notes}
                placeholder="Comments ..."
                onChange={(event) => setNotes(event.currentTarget.value)}
              />
            </label>
          </div>

          <div className="mb-4">
            {bodyParts.map((part) => (
              <div className="flex flex-wrap" key={`part-${part.value}`}>
                {part.label}:
                {part.symptoms.map((symptom) => (
                  <div key={`symptom-${symptom.value}`}>
                    <label htmlFor={part.value + symptom.value}>
                      <input
                        className="m-1 border-none "
                        type="checkbox"
                        name={part.value + symptom.value}
                        value={symptom.value}
                        checked={attributeIsChecked(part.value, symptom.value)}
                        id={part.value + symptom.value}
                        onChange={(event) =>
                          toggleAttribute(part.value, symptom.value)
                        }
                      />
                      {symptom.label}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              {props.dailyLogID ? 'Update Entry' : 'Create Entry'}
            </button>
          </div>
        </div>
      </div>

      {/*  */}
    </form>
  );
}
