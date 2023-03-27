/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      logo: ['Oxygen', 'sans-serif'],
      display: ['Cousine', 'sans'],
    },

    extend: {
      backgroundImage: () => ({
        'comic-clouds': "url('/cartoon-clouds.webp')",
      }),
      scale: {
        '-100': '-1',
      },
    },
  },
  plugins: [],
};
