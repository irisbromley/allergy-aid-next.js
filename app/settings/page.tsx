import { Cousine } from 'next/font/google';
import { cookies } from 'next/headers';
import { ThemeToggleButton } from './ThemeToggleButton';

export const metadata = {
  title: 'Allergy Aid Settings',
  description:
    'Allergy Aid, your daily Allergy Symptoms Tracker here to help you get better control over your allergies and live a better live',
};

const cousine = Cousine({ subsets: ['latin'], weight: '400' });

export default function SettingsPage() {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme');
  console.log('settingspage', theme);
  return (
    <div className="w-full max-w-md md:max-w-lg mx-auto ">
      <h2
        className={
          cousine.className +
          ' px-8 pt-4 font-display text-2xl md:-4xl font-bold  mr-4  '
        }
      >
        Settings
      </h2>
      <div className="px-8 pt-6 pb-8 mb-6">
        <ThemeToggleButton theme={theme?.value ?? 'light'} />
        <label className="mt-6">
          <input type="checkbox" />
          <span className="px-2 ">Set daily reminder</span>
        </label>
      </div>
    </div>
  );
}
