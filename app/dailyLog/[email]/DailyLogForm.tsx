// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!

// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!

// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!
// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!
// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!

// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!
// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!// THIS NEEDS TO BE ADJUSTED FOR THE DAILY LOG!!!!!!!!!

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBody } from '../../api/(auth)/register/route';

export default function DailyLogForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await fetch('/api/register', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
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
      <label>
        Email:
        <input
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
      </label>
      <label>
        Password:
        <input
          type={password}
          title="Password should be digits (0 to 9) or alphabets (a to z)."
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <button>Register</button>
      <form action="submit">
        <label htmlFor="">
          <input />
        </label>
      </form>
    </form>
  );
}
