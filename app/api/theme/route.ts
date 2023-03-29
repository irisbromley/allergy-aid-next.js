import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { storeThemeCookie } from '../../../utils/cookies';

// creating schema for strings
const themeSchema = z.object({
  theme: z.union([z.literal('dark'), z.literal('light')]),
});

export type ThemeSchema = z.infer<typeof themeSchema>;

export type ThemeResponseBody =
  | { errors: { message: string }[] }
  | { success: boolean };

export async function PUT(
  request: NextRequest,
): Promise<NextResponse<ThemeResponseBody>> {
  const body = await request.json();
  const result = themeSchema.safeParse(body);
  console.log(result);

  if (!result.success) {
    return NextResponse.json({ errors: result.error.issues }, { status: 400 });
  }

  const serializedCookie = storeThemeCookie(result.data.theme);

  return NextResponse.json(
    { success: true },
    {
      status: 200,
      headers: { 'Set-Cookie': serializedCookie },
    },
  );
}
