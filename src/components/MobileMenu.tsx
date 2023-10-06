import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

import SocialIcons from '@/components/SocialIcons';

import DarkCloseMenu from '~/svg/close-menu-dark.svg';
import LightCloseMenu from '~/svg/close-meu-light.svg';
import DarkLogo from '~/svg/logo-dark.svg';
import LightLogo from '~/svg/logo-light.svg';

interface ComponentProps {
  links: { href: string; label: string }[];
  currentSlug: string;
  theme: string;
  setIsMenuOpen: (status: boolean) => void;
  SocialLinksData: { [key: string]: string | null } | null | undefined;
}

export default function MobileMenu({
  theme,
  setIsMenuOpen,
  links,
  currentSlug,
  SocialLinksData,
}: ComponentProps) {
  return (
    <motion.div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-start
                  ${theme == 'light' ? 'bg-customGray' : 'bg-customDarkBlue'}`}
      key='mobile-menu'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        ease: 'easeInOut',
        duration: 0.3,
      }}
    >
      {/* Menu Header */}
      <div className='flex h-20 w-full items-center justify-between gap-6 px-12 pb-3 pt-10'>
        {/* Site Logo */}
        <Link href='/'>
          {theme == 'light' ? (
            <DarkLogo className='plyarn-2 border-customDarkBlue h-9 min-w-[6.75rem] border-l md:h-8 md:min-w-[6rem] ' />
          ) : (
            <LightLogo className='plyarn-2 border-customGray h-9 min-w-[6.75rem] border-l md:h-8 md:min-w-[6rem] ' />
          )}
        </Link>

        {/* Mobile Menu Toggle */}
        {theme == 'light' ? (
          <DarkCloseMenu
            className=' h-12 w-6 cursor-pointer md:hidden'
            onClick={() => setIsMenuOpen(false)}
          />
        ) : (
          <LightCloseMenu
            className=' h-12 w-6 cursor-pointer md:hidden'
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </div>

      {/* Menu Content */}
      <div className='flex w-full flex-grow flex-col justify-evenly'>
        {/* Navigation Items */}
        <ul
          className={`flex flex-col items-center justify-center gap-12 
                      ${
                        theme == 'light'
                          ? 'text-customDarkBlue'
                          : 'text-customGray'
                      }`}
        >
          {links.map((link, index) => (
            <li
              key={index}
              className={` text-4xl ${
                currentSlug == link.href ? 'font-bold' : 'font-light'
              }`}
              onClick={() => {
                currentSlug == link.href ? setIsMenuOpen(false) : null;
              }}
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className='h-fit w-full scale-150'>
          <SocialIcons
            theme={theme}
            SocialLinksData={SocialLinksData}
            mobileVersion
          />
        </div>
      </div>
    </motion.div>
  );
}
