import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getUserByUsername } from '../../../../database/users';

// creating a schema for strings
const userSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type RegisterResponseBody =
  | { error: { message: string }[] }
  | { user: { username: string }[] };

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const result = userSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error.issues }, { status: 400 });
  }

  if (!result.data.username || !result.data.password) {
    return NextResponse.json(
      { errors: [{ message: 'username or password are empty' }] },
      { status: 400 },
    );
  }

  const user = await getUserByUsername(result.data.username);

  if (user) {
    return NextResponse.json(
      { errors: [{ message: 'username is already taken' }] },
      { status: 400 },
    );
  }

  const passwordHash = await bcrypt.hash(result.data.password, 12);
};
