import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../database/sessions';
import {
  createPerson,
  createUser,
  getUserByEmailWithPasswordHash,
} from '../../../../database/users';
import { createSerializedRegisterSessionTokenCookie } from '../../../../utils/cookies';

// creating a schema for strings
const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: { id: number; email: string } };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<RegisterResponseBody>> {
  const body = await request.json();

  const result = userSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ errors: result.error.issues }, { status: 400 });
  }

  if (!result.data.email || !result.data.password) {
    return NextResponse.json(
      { errors: [{ message: 'email or password are empty' }] },
      { status: 400 },
    );
  }

  const user = await getUserByEmailWithPasswordHash(result.data.email);

  if (user) {
    return NextResponse.json(
      { errors: [{ message: 'email is already taken' }] },
      { status: 400 },
    );
  }

  const passwordHash = await bcrypt.hash(result.data.password, 12);

  const newUser = await createUser(
    result.data.name,
    result.data.email,
    passwordHash,
  );
  if (newUser) {
    const newPerson = await createPerson(result.data.name, newUser.id);
    console.log(newPerson);
  }

  if (!newUser) {
    return NextResponse.json(
      { errors: [{ message: 'user creation failed' }] },
      { status: 500 },
    );
  }

  // session goes here
  const token = crypto.randomBytes(80).toString('base64');

  const session = await createSession(token, newUser.id);
  console.log(session);

  if (!session) {
    return NextResponse.json(
      { errors: [{ message: 'session not created' }] },
      { status: 500 },
    );
  }

  const serializedCookie = createSerializedRegisterSessionTokenCookie(
    session.token,
  );

  return NextResponse.json(
    { user: { id: newUser.id, email: newUser.email } },
    {
      status: 200,
      headers: { 'Set-Cookie': serializedCookie },
    },
  );
}
