import { getUsers } from './database/users';

export const metadata = {
  title: 'Track your pollen allergy sypmtoms',
  description: 'Daily Pollen Allergy Symptoms Tracker',
};

export default async function DailyLogPage() {
  const users = await getUsers();
  return (
    <main>
      <h2>Hello </h2>
      <p>How are you feeling today?</p>
    </main>
  );
}
