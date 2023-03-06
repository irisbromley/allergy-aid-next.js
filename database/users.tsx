import { cache } from 'react';
import { sql } from './connect';

export const getUsers = cache(async () => {
  const users = await sql`
  SELECT * FROM users
 `;
  return users;
});


export const getUser = cache(async (firstName: ty) => {
  const user = await sql`
  SELECT * FROM users
  WHERE first_name = ${firstName}
 `;
  return user;
});
