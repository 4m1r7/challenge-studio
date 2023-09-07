import Link from 'next/link';
import * as React from 'react';

import DarkMode from '~/svg/dark-mode.svg';
import LightMode from '~/svg/light-mode.svg';
import DarkLogo from '~/svg/logo-dark.svg';
import LightLogo from '~/svg/logo-light.svg';
import DarkSigns from '~/svg/signs-dark.svg';
import LightSigns from '~/svg/signs-light.svg';

const links = [
  { href: '/projects', label: 'Projects' },
  { href: '/awards', label: 'Award' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

export default function Header({ theme, toggleTheme }: HeaderProps) {
  return (
    <header
      className={` top-0 z-50 w-full 
                        ${
                          theme == 'light'
                            ? 'bg-customGray'
                            : 'bg-customDarkBlue'
                        }`}
    >
      <div className='flex h-28 w-full items-center justify-start gap-6 px-12 py-5'>
        <Link href='/'>
          {theme == 'light' ? (
            <DarkLogo className='plyarn-2 border-customDarkBlue h-8 min-w-[6rem] border-l ' />
          ) : (
            <LightLogo className='plyarn-2 border-customGray h-8 min-w-[6rem] border-l ' />
          )}
        </Link>

        <div className='flex flex-grow items-center justify-end '>
          {theme == 'light' ? (
            <DarkSigns className='h-full w-52' />
          ) : (
            <LightSigns className='h-full w-52' />
          )}
        </div>

        <nav>
          <ul
            className={`site-menu flex justify-end gap-8 
                        ${
                          theme == 'light'
                            ? 'text-customDarkBlue'
                            : 'text-customGray'
                        }`}
          >
            {links.map((link, index) => (
              <li key={index}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            <a href='https://www.instagram.com/challenge_studio_/'>
              Instagram &gt;
            </a>
          </ul>
        </nav>

        <div
          className='absolute left-12 top-[90vh] cursor-pointer'
          onClick={toggleTheme}
        >
          {theme == 'light' ? (
            <DarkMode className=' h-6 w-6 ' />
          ) : (
            <LightMode className=' h-6 w-6 ' />
          )}
        </div>
      </div>
    </header>
  );
}
