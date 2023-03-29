import { Cousine } from 'next/font/google';
import { cookies } from 'next/headers';
import { storeThemeCookie } from '../../utils/cookies';
import { ThemeToggleButton } from './ThemeToggleButton';

export const metadata = {
  title: 'Track your pollen allergy sypmtoms',
  description: 'Daily Pollen Allergy Symptoms Tracker',
};

const cousine = Cousine({ subsets: ['latin'], weight: '400' });

export default function SettingsPage() {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme');
  console.log('settingspage', theme);
  return (
    <main>
      <div
        className="w-full max-w-md md:max-w-lg mx-auto                     flex flex-col
     "
      >
        <h2
          className={
            cousine.className +
            ' px-8 pt-4 font-display text-2xl md:max-w-lg font-bold  mr-4 '
          }
        >
          Settings
        </h2>
        <ThemeToggleButton theme={theme?.value ?? 'light'} />
        <label className="px-8 mt-6">
          <input type="checkbox" />
          <span className="px-2 ">Set daily reminder</span>
        </label>
      </div>
    </main>
  );
}
