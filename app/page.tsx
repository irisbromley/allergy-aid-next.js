import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getPersonsByUserID, getUserBySessionToken } from '../database/users';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Allergy Aid Login',
  description:
    'Allergy Aid, your daily Allergy Symptoms Tracker here to help you get better control over your allergies and live a better live',
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // check if there is a valid session
  const sessionTokenCookie = cookies().get('sessionToken');
  console.log({ sessionTokenCookie });

  const session =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  // if so redirect to daily_log
  if (session) {
    const persons = await getPersonsByUserID(session.id);
    redirect(`/../daily-log/${persons[0]?.id}/new`);
  }

  return <LoginForm />;
}
