'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBody } from '../../api/(auth)/register/route';

export default function DailyLogForm() {
  const [bodyPart, setBodyPart] = useState('');
  const [symptom, setSymptom] = useState('');
  const [severity, setSeverity] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await fetch('/api/register', {
          method: 'POST',
          body: JSON.stringify({ bodyPart, symptom, severity }),
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Body part:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="select"
                value={bodyPart}
                onChange={(event) => setBodyPart(event.currentTarget.value)}
              />
            </label>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Symptom:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                title="Password should be digits (0 to 9) or alphabets (a to z)."
                value={symptom}
                onChange={(event) => setSymptom(event.currentTarget.value)}
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Severity:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="range"
                min={1}
                max={4}
                value={severity}
                onChange={(event) => setSeverity(event.currentTarget.value)}
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
