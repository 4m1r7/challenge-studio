import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

import DarkMode from '~/svg/dark-mode.svg';
import LightMode from '~/svg/light-mode.svg';
import DarkLogo from '~/svg/logo-dark.svg';
import LightLogo from '~/svg/logo-light.svg';
import DarkSigns from '~/svg/signs-dark.svg';
import LightSigns from '~/svg/signs-light.svg';

// Menu Links
const links = [
  { href: '/projects', label: 'Projects' },
  { href: '/awards', label: 'Awards' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

// Header motion values
const mainComponent = {
  hidden: {
    opacity: 0,
    y: -40,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: { ease: 'easeOut', duration: 1.5 },
  },
  exit: {
    opacity: 0,
    y: -40,
    transition: { ease: 'easeOut', duration: 0.5 },
  },
};

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
  noThemeChanger?: boolean;
}

export default function Header({
  theme,
  toggleTheme,
  noThemeChanger,
}: HeaderProps) {
  const router = useRouter();

  return (
    <header
      className={` top-0 z-50 w-full ${
        theme == 'light' ? 'bg-customGray' : 'bg-customDarkBlue'
      }`}
    >
      <motion.div
        className='flex h-28 w-full items-center justify-start gap-6 px-12 py-5'
        key='header'
        variants={mainComponent}
        initial='hidden'
        animate='enter'
        exit='exit'
      >
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
              <li
                key={index}
                className={router.asPath == link.href ? 'font-bold' : ''}
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            <a
              href='https://www.instagram.com/challenge_studio_/'
              className='whitespace-nowrap'
            >
              Instagram {'>'}
            </a>
          </ul>
        </nav>

        {!noThemeChanger && (
          <motion.div
            className='absolute left-12 top-[90vh] cursor-pointer'
            key='header'
            initial={{ x: -40, y: 40 }}
            animate={{
              x: 0,
              y: 0,
              transition: { ease: 'easeOut', duration: 1.5 },
            }}
            exit={{
              x: -40,
              y: 40,
              transition: { ease: 'easeOut', duration: 0.5 },
            }}
            onClick={toggleTheme}
          >
            {theme == 'light' ? (
              <DarkMode className=' h-6 w-6 ' />
            ) : (
              <LightMode className=' h-6 w-6 ' />
            )}
          </motion.div>
        )}
      </motion.div>
    </header>
  );
}
