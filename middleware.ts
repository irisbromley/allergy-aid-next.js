import { NextRequest, NextResponse } from 'next/server';
import { getPersonsByUserID, getUserBySessionToken } from './database/users';

export const config = {
  matcher: ['/logout'],
};

// async function redirectIfUserIsAlreadyLoggedIn(request: NextRequest) {
//   const token = request.cookies.get('sessionToken');

//   const user = token && (await getUserBySessionToken(token.value));
//   const persons = user ? await getPersonsByUserID(user.id) : [];

//   if (user) {
//     return NextResponse.redirect(new URL(`/daily-log/${persons[0]?.id}/new`));
//   }
// }

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

  // if (request.nextUrl.pathname === `/`) {
  //   const itIsMaybeAResponse = await redirectIfUserIsAlreadyLoggedIn(request);
  //   return itIsMaybeAResponse;
  // }

  return response;
}
