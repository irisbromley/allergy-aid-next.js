import { NextResponse } from 'next/server';

export const config = {
  matcher: '/logout',
};

export default function middleware(request) {
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
    name: 'sessonToken',
    maxAge: -1,
  });

  return response;
}
