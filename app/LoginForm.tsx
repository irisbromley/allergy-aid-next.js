'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoginResponseBody } from './api/(auth)/login/route';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  return (
    <form
      className="h-full"
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });

        const data: LoginResponseBody = await response.json();

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

        // if there is only 1 person which is the user
        router.push(`/../daily-log/${data.user.persons[0]?.id}/new`);
        router.refresh();
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

      <div className="w-full h-full md:max-w-lg mx-auto mt-16 ">
        <div className="bg-white rounded px-4 pt-8 pb-8 mb-4 ">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              <input
                className="form-input"
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
                className=" form-input"
                placeholder="What is your Password?"
                type="password"
                minLength={8}
                title="Password should be digits (0 to 9) or alphabets (a to z)."
                value={password}
                required
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <Link
              className="inline-block align-baseline font-bold text-sm text-teal-600 underline-offset-8 hover:underline"
              href="/register"
            >
              Register here
            </Link>
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline">
              Log in
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
