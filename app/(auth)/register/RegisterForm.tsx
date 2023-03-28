'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBody } from '../../api/(auth)/register/route';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  return (
    <form
      className="h-full max-w-md mx-auto"
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await fetch('/api/register', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
        });

        const data: RegisterResponseBody = await response.json();

        if ('errors' in data) {
          setErrors(data.errors);
          return;
        }

        router.push(`./../daily-log/${data.user.id}/new`);
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
      <div className="w-full h-full md:max-w-lg mx-auto mt-16 ">
        <div className="bg-white rounded px-4 pt-8 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <input
                className="form-input"
                value={name}
                placeholder="What is your Name?"
                required
                onChange={(event) => setName(event.currentTarget.value)}
              />
            </label>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              <input
                className="form-input"
                type="email"
                placeholder="What is your Email?"
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
                className="form-input"
                type="password"
                placeholder="What is your password?"
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
              href="/"
            >
              Return to Login
            </Link>
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline">
              Register
            </button>
          </div>
        </div>
      </div>

      {/*  */}
    </form>
  );
}
