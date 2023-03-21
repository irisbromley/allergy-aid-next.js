'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Select from 'react-select';
import { LoginResponseBody } from '../../../api/(auth)/login/route';
import {
  CreateDailyLogResponseBody,
  DailyLogInput,
} from '../../../api/daily-log/route';

export default function DailyLogForm(props: { personID: number }) {
  const [bodyPart, setBodyPart] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [notes, setNotes] = useState('');
  const [attributes, setAttributes] = useState([] as string[]);
  const [severity, setSeverity] = useState(0);
  const [availableSymptoms, setAvailableSymptoms] = useState(
    [] as Array<{ value: string; label: string }>,
  );
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  const bodyParts = [
    {
      value: 'eyes',
      label: ' 👁 Eyes',
      symptoms: [
        { value: 'runny', label: 'runny' },
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
        { value: 'whisteling', label: 'whisteling' },
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

  const onBodyPartChange = (selected: typeof bodyParts[number] | null) => {
    if (selected) {
      setAvailableSymptoms(selected.symptoms);
      setBodyPart(selected.value);
    }
  };

  const onAttributeChange = (
    selected: ReadonlyArray<{ value: string; label: string }>,
  ) => {
    const chosenSymptoms = selected.map((item) => {
      return item.value;
    });
    setAttributes(chosenSymptoms);
  };

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const input: DailyLogInput = {
          date: new Date(date),
          latitude,
          longitude,
          notes,
          symptoms: [{ bodyPart, attributes, severity }],
          personID: props.personID,
        };

        const response = await fetch('/api/daily-log', {
          method: 'POST',
          body: JSON.stringify(input),
        });

        const data: CreateDailyLogResponseBody = await response.json();

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
              <div key={`part-${part.value}`}>
                {part.label}:
                {part.symptoms.map((symptom) => (
                  <div key={`symptom-${symptom.value}`}>
                    <input
                      type="checkbox"
                      name={symptom.value}
                      value={symptom.value}
                      id={symptom.value}
                    />
                    <label htmlFor={symptom.value}>{symptom.label}</label>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Create Entry
            </button>
          </div>
        </div>
      </div>

      {/*  */}
    </form>
  );
}
