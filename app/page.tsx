import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import { getPersonsByUserID, getUserBySessionToken } from '../database/users';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Allergy Aid Login',
  description:
    'Allergy Aid, your daily Allergy Symptoms Tracker here to help you get better control over your allergies and live a better live',
};

export const dynamic = 'force-dynamic';

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');
  const user = token && (await getUserBySessionToken(token.value));
  const persons = user ? await getPersonsByUserID(user.id) : [];

  const router = useRouter();
  if (user) {
    await router.push(`/daily-log/${persons[0]?.id}/new`);
  }

  return <LoginForm />;
}
