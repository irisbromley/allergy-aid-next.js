import LoginForm from './LoginForm';

export const metadata = {
  title: 'Allergy Aid Login',
  description:
    'Allergy Aid, your daily Allergy Symptoms Tracker here to help you get better control over your allergies and live a better live',
};

export const dynamic = 'force-dynamic';

export default function Home() {
  return <LoginForm />;
}
