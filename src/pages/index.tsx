import { motion } from 'framer-motion';
import Link from 'next/link';
import * as React from 'react';
import { useState } from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import TheCube from '@/components/TheCube';

import { useTheme } from '@/ThemeContext';

// Menu Links
const links = [
  { href: '/projects', label: 'Projects' },
  { href: '/awards', label: 'Awards' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const mainComponent = {
  hidden: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: { ease: 'easeOut', duration: 1.5 },
  },
  exit: {
    opacity: 0,
    transition: { ease: 'easeOut', duration: 0.5 },
  },
};

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  const [cursorLocation, setCursorLocation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorLocation({
      x: (e.clientX * 2) / window.innerWidth - 1,
      y: (e.clientY * 2) / window.innerHeight - 1,
    });
  };

  return (
    <Layout
      theme={theme}
      toggleTheme={toggleTheme}
      noMobileMenu
      noFooter
      SocialLinksData={undefined}
    >
      <Seo templateTitle='Home' />

      <main
        className={`flex flex-grow flex-col items-center justify-center overflow-hidden px-12
                        ${
                          theme == 'light'
                            ? 'bg-customGray'
                            : 'bg-customDarkBlue'
                        } `}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setCursorLocation({ x: 0, y: 0 })}
      >
        <motion.div
          className='flex flex-grow flex-col justify-evenly'
          style={{}}
          key='home'
          variants={mainComponent}
          initial='hidden'
          animate='enter'
          exit='exit'
        >
          {/* Desktop Version */}
          <TheCube cursorLocation={cursorLocation} theme={theme} />

          {/* Mobile Version */}
          <TheCube
            cursorLocation={{ x: 0, y: 0 }}
            theme={theme}
            mobileVersion
          />
          <ul
            className={`flex flex-col items-center justify-center gap-8 md:hidden
                        ${
                          theme == 'light'
                            ? 'text-customDarkBlue'
                            : 'text-customGray'
                        }`}
          >
            {links.map((link, index) => (
              <li key={index} className='text-2xl'>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </main>
    </Layout>
  );
}
