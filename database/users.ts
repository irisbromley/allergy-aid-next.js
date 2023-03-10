import { cache } from 'react';
import { sql } from './connect';

type User = {
  id: number;
  name: string;
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
  const [user] = await sql<{ name: string; id: number; email: string }[]>`
  SELECT id, name, email
  FROM users
  WHERE
  email = ${email}
`;
  return user;
});

export const getUserByID = cache(async (userID: number) => {
  const [user] = await sql<{ name: string; id: number; email: string }[]>`
  SELECT id, "name", email
  FROM users
  WHERE
  id = ${userID}
`;
  return user;
});

export const getPersonInUser = cache(async (name: string) => {
  const [person] = await sql<{ name: string; user_id: number }[]>`
  SELECT "name", user_id
  FROM persons
  WHERE
  "name" = ${name}`;
  return person;
});

export const createUser = cache(
  async (name: string, email: string, passwordHash: string) => {
    const [user] = await sql<{ id: number; name: string; email: string }[]>`
    INSERT INTO users
    (name, email, password_hash)
    VALUES
    (${name}, ${email}, ${passwordHash})
    RETURNING
    id, name, email
  `;
    return user;
  },
);
export const createPerson = cache(async (name: string, userId: number) => {
  const [person] = await sql<{ id: number; name: string; user_id: number }[]>`
    INSERT INTO persons
    (name,user_id)
    VALUES
    (${name}, ${userId})
    RETURNING
    id, name, user_id
  `;
  return person;
});
