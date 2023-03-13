'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Select from 'react-select';
import { RegisterResponseBody } from '../../api/(auth)/register/route';

export default function DailyLogForm() {
  const [bodyPart, setBodyPart] = useState('');
  const [symptoms, setSymptoms] = useState([] as string[]);
  const [severity, setSeverity] = useState('');
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

  const onSymptomChange = (
    selected: ReadonlyArray<{ value: string; label: string }>,
  ) => {
    const chosenSymptoms = selected.map((item) => {
      return item.value;
    });
    setSymptoms(chosenSymptoms);
  };

  function customTheme(theme: any) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary50: 'lightblue',
      },
    };
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await fetch('/api/register', {
          method: 'POST',
          body: JSON.stringify({ bodyPart, symptoms, severity }),
        });

        const data: RegisterResponseBody = await response.json();

        if ('errors' in data) {
          setErrors(data.errors);
          return;
        }

        router.push('/');
      }}
    >
      {errors.map((error) => (
        <div key={`error-${error.message}`}>Error: {error.message}</div>
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
                type="date"
                data-te-datepicker-toggle-ref
                data-te-datepicker-toggle-button-ref
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Select a date"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="select"
            >
              Body part:
              <Select
                options={bodyParts}
                placeholder="Select Body Part"
                isSearchable
                theme={customTheme}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={onBodyPartChange}
              />
            </label>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="select"
            >
              Symptom:
              <Select
                options={availableSymptoms}
                isMulti
                theme={customTheme}
                placeholder="Select symptoms"
                isSearchable
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={onSymptomChange}
                // onChange={(event) => setSymptom(event.currentTarget.value)}
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Severity {severity}:
              <input
                className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
                type="range"
                min={1}
                max={4}
                step={0.5}
                value={severity}
                onChange={(event) => setSeverity(event.currentTarget.value)}
              />
            </label>
          </div>

          <div className="mb-4">
            <label
              htmlFor="additional notes"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Notes:
              <textarea
                rows={2}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                // value={notes}
                // onChange={(event) => setNotes(event.currentTarget.value)}
              />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Create Entry
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              {' '}
              +
            </button>
          </div>
        </div>
      </div>

      {/*  */}
    </form>
  );
}
