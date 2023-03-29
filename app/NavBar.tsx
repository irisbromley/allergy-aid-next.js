'use client';

import { Inter } from 'next/font/google';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Logo from './Logo';

const inter = Inter({ subsets: ['latin'], weight: '400' });

export default function NavBar({
  user,
  persons,
}: {
  user: { id: number; email: string } | undefined;
  persons: { id: number }[];
}) {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="w-full">
      <div className="font-sans max-w-4xl m-auto flex justify-between items-center text-rgba font-bold px-4 py-6">
        <div className="fill-teal-600">
          <Logo />
        </div>
        {/* <Link href="/"> */}
          <h1
            className={inter.className + ' text-2xl pt-1 dark:text-gray-100 '}
          >
            ALLERGY AID
          </h1>
        {/* </Link> */}

        {/* {user && (
          // <Link href="/">
          //   <h1 className="font-bold text-4xl">Allergy Diary</h1>
          // </Link>
        )} */}
        <ul className="hidden sm:flex gap-x-2">
          <li className=" text-gray-600 hover:underline underline-offset-8">
            {user && (
              <Link href={`/daily-log/${persons[0]?.id}/new`}>New Entry</Link>
            )}
          </li>
          <li className=" text-gray-600 hover:underline underline-offset-8">
            {user && (
              <Link href={`/daily-log/${persons[0]?.id}`}>All Entries</Link>
            )}
          </li>
          <li className="  text-gray-400 hover:text-gray-700  ">
            {user && (
              <Link href="/settings">
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
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </Link>
            )}
          </li>
          <li className=" text-gray-400 hover:text-gray-700">
            {user && (
              <Link href="/logout" prefetch={false}>
                {/* Logout{' '} */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6  transform -scale-100"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile button */}
        {user && (
          <button
            onClick={handleNav}
            className={(nav ? ' text-white' : ' ') + ' block sm:hidden z-20'}
          >
            {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
          </button>
        )}

        {/* Mobile menu */}
        <div
          className={`sm:hidden z-10 absolute top-0  right-0 bottom-0 flex justify-center items-center w-full h-screen text-center text-white bg-teal-600 ease-in duration-300 ${
            nav ? 'left-0' : 'left-[-100%]'
          }`}
        >
          <ul>
            <li className="p-6 text-2xl underline-offset-8 hover:underline">
              {user && (
                <Link
                  href={`/daily-log/${persons[0]?.id}/new`}
                  onClick={handleNav}
                >
                  New Entry
                </Link>
              )}
            </li>
            <li className="p-6 text-2xl underline-offset-8 hover:underline">
              {user && (
                <Link href={`/daily-log/${persons[0]?.id}`} onClick={handleNav}>
                  All Entries
                </Link>
              )}
            </li>
            <li className="p-6 text-2xl underline-offset-8 hover:underline">
              {user && (
                <Link href="/settings" onClick={handleNav}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 m-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </Link>
              )}
            </li>
            <li className="p-6 text-2xl underline-offset-8 hover:underline">
              {user && (
                <Link href="/logout" prefetch={false} onClick={handleNav}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8  transform -scale-100 m-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
