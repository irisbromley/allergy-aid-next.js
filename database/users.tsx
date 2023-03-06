// import { cache } from 'react';
import { sql } from './connect';

type User = { id: number; username: string; passwordHash: string };

// export const getUsers = cache(async () => {
//   const users = await sql`
//   SELECT * FROM users
//  `;
//   return users;
// });

// export const getUser = cache(async () => {
//   const user = await sql`
//   SELECT * FROM users
//   WHERE first_name =
//  `;
//   return user;
// });

export async function getUserByUsername(username: string) {
  const [user] = await sql<User[]>`
  SELECT
  *
  FROM
  users
  WHERE
  username = ${username}
`;
  return user;
}
