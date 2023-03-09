'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBody } from './api/(auth)/register/route';

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
        // // Validate the input data with regex but is not working
        // if (
        //   props.returnTo &&
        //   !Array.isArray(props.returnTo) &&
        //   /^\[a-zA-Z0-9-?=/]*$/.test(props.returnTo)
        //   ) {
        //   router.push(props.returnTo);
        //   return;
        // }
        router.push(`/../dailyLog/${data.user.email}`);
      }}
    >
      {errors.map((error) => (
        <div key={`error-${error.message}`}>Error: {error.message}</div>
      ))}
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          minLength={4}
          title="Password should be digits (0 to 9) or alphabets (a to z)."
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Login
      </button>
    </form>
  );
}
