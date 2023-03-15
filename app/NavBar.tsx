'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { use, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { getUserBySessionToken } from '../database/users';

export default function NavBar({
  user,
}: {
  user: { id: number; email: string } | undefined;
}) {
  // const cookieStore = cookies();
  // const token = cookieStore.get('sessionToken');
  // const user = token && getUserBySessionToken(token.value);
  // console.log('user', user);

  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="w-full">
      <div className="max-w-4xl m-auto flex justify-between items-center text-white font-bold p-6">
        {user && (
          <Link href="/">
            <h1 className="font-bold text-4xl">Allergy Diary</h1>
          </Link>
        )}
        <ul className="hidden sm:flex">
          <li className="p-6">
            {user && <Link href="/settings">Settings</Link>}
          </li>
          <li className="p-6">
            {user && <Link href="/daily-log">Log my day</Link>}
          </li>
          <li className="p-6">
            {user && (
              <Link href="/logout" prefetch={false}>
                Logout
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile button */}
        {user && (
          <button onClick={handleNav} className="block sm:hidden z-20">
            {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
          </button>
        )}

        {/* Mobile menu */}
        <div
          className={`sm:hidden z-10 absolute top-0  right-0 bottom-0 flex justify-center items-center w-full h-screen text-center bg-blue-300 ease-in duration-300 ${nav ? 'left-0' : 'left-[-100%]'}`}
        >
          <ul>
            <li className="p-6 text-4xl hover:text-blue-700">
              {user && <Link href="/settings">Settings</Link>}
            </li>
            <li className="p-6 text-4xl hover:text-blue-700">
              {user && <Link href="/daily-log">Log my Day</Link>}
            </li>
            <li className="p-6 text-4xl hover:text-blue-700">
              {user && (
                <Link href="/logout" prefetch={false}>
                  Logout
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
