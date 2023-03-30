import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/logout'],
};

export default function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const sessionToken = request.cookies.get('sessionToken')?.value;

  if (sessionToken) {
    requestHeaders.set('name-of-sessionToken-to-be-deleted', sessionToken);
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.cookies.set({
    name: 'sessionToken',
    value: '',
    maxAge: -1,
  });

  return response;
}
