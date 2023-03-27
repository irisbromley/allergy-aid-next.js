import { Cousine } from 'next/font/google';

const cousine = Cousine({ subsets: ['latin'], weight: '400' });
export const metadata = {
  title: 'Track your pollen allergy sypmtoms',
  description: 'Daily Pollen Allergy Symptoms Tracker',
};

export default function SettingsPage() {
  return (
    <div
      className=" mt-16 px-6 flex flex-col
     "
    >
      <h2
        className={
          cousine.className +
          ' font-display text-2xl md:max-w-lg font-bold  mr-4 '
        }
      >
        Settings
      </h2>
      <div className="flex justify-around gap-x-4 w-full h-full md:max-w-lg mx-auto mt-6 ">
        <button className="flex space-x-1 rounded-full border border-gray-700 p-2">
          {' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
          <span>Dark</span>
        </button>
        <button className="flex space-x-1 rounded-full border border-gray-700 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
          <span>Light</span>
        </button>
      </div>
      <label className="p-2 mt-6">
        <input type="checkbox" />
        <span className="px-2 ">Set daily reminder</span>
      </label>
    </div>
  );
}
