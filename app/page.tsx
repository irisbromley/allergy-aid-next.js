import Image from 'next/image';

export const metadata = {
  title: 'Home',
  description: 'Daily Pollen Allergy Symptoms Tracker',
};

export default function Home() {
  return (
    <main>
      <div>
        <Image
          src="/pollen.png"
          alt="pollen flying off a dandelion"
          width="200"
          height="200"
        />

        <Image
          src="/pollen_blackAndWhite.png"
          alt="pollen flying off a dandelion"
          width="200"
          height="200"
        />
        <p>Pollen Allergy Tracker</p>
        <p>here to aide living your best life despite allergies</p>
      </div>
    </main>
  );
}
