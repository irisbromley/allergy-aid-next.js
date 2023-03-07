// import { cache } from 'react';
import { cache } from 'react';
import { sql } from './connect';

type User = {
  id: number;
  firstname: string;
  email: string;
  passwordHash: string;
};

export const getUserByEmailWithPasswordHash = cache(async (email: string) => {
  const [user] = await sql<User[]>`
  SELECT
*
  FROM
  users
  WHERE
  email = ${email}
`;
  return user;
});

export const getUserByEmail = cache(async (email: string) => {
  const [user] = await sql<
    {
      firstname: string;
      id: number;
      email: string;
    }[]
  >`
  SELECT
  id,
  firstname,
  email
  FROM
  users
  WHERE
  email = ${email}
`;
  return user;
});

export const createUser = cache(
  async (firstname: string, email: string, passwordHash: string) => {
    const [user] = await sql<
      { id: number; firstname: string; email: string }[]
    >`
    INSERT INTO users
    (firstname, email, password_hash)
    VALUES
    (${firstname}, ${email}, ${passwordHash})
    RETURNING
    id, firstname, email
  `;
    return user;
  },
);
