'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBody } from './api/(auth)/login/route';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });

        const data: RegisterResponseBody = await response.json();

        if ('errors' in data) {
          setErrors(data.errors);
          return;
        }
        // Validate the input data with regex but is not working
        // if (
        //   props.returnTo &&
        //   !Array.isArray(props.returnTo) &&
        //   /^\[a-zA-Z0-9-?=/]*$/.test(props.returnTo)
        //   ) {
        //   router.push(props.returnTo);
        //   return;
        // }
        router.push(`/../daily-log/${data.user.id}`);
        router.refresh();
      }}
    >
      {errors.map((error) => (
        <div key={`error-${error.message}`}>Error: {error.message}</div>
      ))}

      <div className="w-full max-w-md md:max-w-lg mx-auto">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="What is your Email?"
                type="email"
                value={email}
                required
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </label>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="What is your Password?"
                type="password"
                minLength={4}
                title="Password should be digits (0 to 9) or alphabets (a to z)."
                value={password}
                required
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/register"
            >
              Register here
            </Link>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Log in
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
