import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';

import MobileMenu from '@/components/MobileMenu';

import DarkMode from '~/svg/dark-mode.svg';
import DarkOpenFilters from '~/svg/down-chev-dark.svg';
import LightOpenFilters from '~/svg/down-chev-light.svg';
import LightMode from '~/svg/light-mode.svg';
import DarkLogo from '~/svg/logo-dark.svg';
import LightLogo from '~/svg/logo-light.svg';
import DarkOpenMenu from '~/svg/open-menu-dark.svg';
import LightOpenMenu from '~/svg/open-menu-light.svg';
import DarkSigns from '~/svg/signs-dark.svg';
import LightSigns from '~/svg/signs-light.svg';

// Menu Links
const links = [
  { href: '/projects', label: 'Projects' },
  { href: '/awards', label: 'Awards' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/?calculator=open', label: 'Fee' },
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
  noMobileMenu?: boolean;
  portfolioLink?: string | null;
  SocialLinksData: { [key: string]: string | null } | null | undefined;
  setIsCalculatorOpen?: (isOpen: boolean) => void;
}

export default function Header({
  theme,
  toggleTheme,
  noMobileMenu,
  portfolioLink,
  SocialLinksData,
  setIsCalculatorOpen = () => null,
}: HeaderProps) {
  const router = useRouter();
  const currentSlug = router.asPath;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={` sticky top-0 z-40 w-full ${
        theme == 'light' ? 'bg-customGray' : 'bg-customDarkBlue'
      }`}
    >
      <motion.div
        className='flex h-24 w-full items-center justify-between gap-6 px-12 pb-3 pt-6 md:h-20 md:justify-start md:pt-5'
        key='header'
        variants={mainComponent}
        initial='hidden'
        animate='enter'
        exit='exit'
      >
        {/* Site Logo */}
        <Link href='/'>
          {theme == 'light' ? (
            <DarkLogo className='plyarn-2 border-customDarkBlue h-9 min-w-[6.75rem] border-l md:h-8 md:min-w-[6rem] ' />
          ) : (
            <LightLogo className='plyarn-2 border-customGray h-9 min-w-[6.75rem] border-l md:h-8 md:min-w-[6rem] ' />
          )}
        </Link>

        {/* Brands Signs */}
        <div className='hidden flex-grow items-center justify-end md:flex'>
          {theme == 'light' ? (
            <DarkSigns className='h-16 w-52' />
          ) : (
            <LightSigns className='h-16 w-52' />
          )}
        </div>

        {/* Desktop Navigation Menu */}
        <nav className='hidden md:flex '>
          <ul
            className={`site-menu flex items-center justify-end gap-8 
                        ${
                          theme == 'light'
                            ? 'text-customDarkBlue'
                            : 'text-customGray'
                        }`}
          >
            {links.map((link, index) => (
              <li
                key={index}
                className={currentSlug == link.href ? 'font-bold' : ''}
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}

            {theme == 'light' ? (
              <DarkMode
                className=' h-5 w-5 cursor-pointer '
                onClick={toggleTheme}
              />
            ) : (
              <LightMode
                className=' h-6 w-6 cursor-pointer '
                onClick={toggleTheme}
              />
            )}
          </ul>
        </nav>

        <div className='flex gap-8 md:hidden'>
          {/* Theme Toggle */}
          {theme == 'light' ? (
            <DarkMode
              className=' h-5 w-5 translate-y-0.5 cursor-pointer'
              onClick={toggleTheme}
            />
          ) : (
            <LightMode
              className=' h-6 w-6 cursor-pointer '
              onClick={toggleTheme}
            />
          )}

          {/* Mobile Calculator Toggle */}
          {noMobileMenu &&
            (theme == 'light' ? (
              <DarkOpenFilters
                className='h-6 w-6 rotate-90 cursor-pointer md:hidden'
                onClick={() => setIsCalculatorOpen(true)}
              />
            ) : (
              <LightOpenFilters
                className='h-6 w-6 rotate-90 cursor-pointer md:hidden'
                onClick={() => setIsCalculatorOpen(true)}
              />
            ))}

          {/* Mobile Menu Toggle */}
          {!noMobileMenu &&
            (theme == 'light' ? (
              <DarkOpenMenu
                className=' h-6 w-6 cursor-pointer'
                onClick={() => setIsMenuOpen(true)}
              />
            ) : (
              <LightOpenMenu
                className=' h-6 w-6 cursor-pointer'
                onClick={() => setIsMenuOpen(true)}
              />
            ))}
        </div>
      </motion.div>

      {/* Mobile Menu Component */}
      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            links={links}
            portfolioLink={portfolioLink}
            currentSlug={currentSlug}
            theme={theme}
            setIsMenuOpen={setIsMenuOpen}
            SocialLinksData={SocialLinksData}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
