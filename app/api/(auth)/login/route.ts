import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../database/sessions';
import { getUserByEmailWithPasswordHash } from '../../../../database/users';

// creating a schema for strings
const userSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: { email: string }[] };

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const result = userSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error.issues }, { status: 400 });
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

  return NextResponse.json({ user: { email: userWithPasswordHash.email } });
};
