import { cache } from 'react';
import { sql } from './connect';

export const createSession = cache(async (token: string, userId: number) => {
  const [session] = await sql<{ id: number; token: string; user_id: number }[]>`
    INSERT INTO sessions
    (token, user_id)
    VALUES
    (${token}, ${userId})
    RETURNING
    id, user_id, token
  `;
  return session;
});
