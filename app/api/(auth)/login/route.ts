import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../database/sessions';
import { getUserByEmailWithPasswordHash } from '../../../../database/users';
import { createSerializedRegisterSessionTokenCookie } from '../../../../utils/cookies';

// creating a schema for strings
const userSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: { email: string; id: number } };

export const POST = async (
  request: NextRequest,
): Promise<NextResponse<RegisterResponseBody>> => {
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

  const userWithPasswordHash = await getUserByEmailWithPasswordHash(
    result.data.email,
  );

  if (!userWithPasswordHash) {
    return NextResponse.json(
      { errors: [{ message: 'not found' }] },
      { status: 401 },
    );
  }

  const passwordIsValid = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );

  if (!passwordIsValid) {
    return NextResponse.json(
      { errors: [{ message: 'password is not valid' }] },
      { status: 401 },
    );
  }

  // session goes here
  const token = crypto.randomBytes(80).toString('base64');

  const session = await createSession(token, userWithPasswordHash.id);
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
    {
      user: { id: userWithPasswordHash.id, email: userWithPasswordHash.email },
    },
    {
      status: 200,
      headers: { 'Set-Cookie': serializedCookie },
    },
  );
};
