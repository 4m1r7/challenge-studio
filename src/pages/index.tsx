import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import * as React from 'react';
import { useState } from 'react';

import client from '@/lib/apolloClient';

import Calculator from '@/components/Calculator';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import TheCube from '@/components/TheCube';

import {
  CalculatorConstantsDocument,
  CalculatorConstantsQuery,
} from '@/queries/generated-queries';
import { useTheme } from '@/ThemeContext';

import CalculatorToggleDark from '~/svg/calculator-dark.svg';
import CalculatorToggleLight from '~/svg/calculator-light.svg';

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
    x: 0,
    transition: { ease: 'easeOut', duration: 1.5 },
  },
  exit: {
    opacity: 0,
    transition: { ease: 'easeOut', duration: 0.5 },
  },
};

const calculatorComponent = {
  hidden: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: { ease: 'easeIn', duration: 2 },
  },
  exit: {
    opacity: 0,
    transition: { ease: 'easeOut', duration: 0.5 },
  },
};

export default function Home({
  pageData,
}: {
  pageData: CalculatorConstantsQuery;
}) {
  const { theme, toggleTheme } = useTheme();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
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
      setIsCalculatorOpen={setIsCalculatorOpen}
    >
      <Seo templateTitle='Home' />

      <main
        className={`relative flex flex-grow flex-col items-center justify-center overflow-hidden px-12
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
          key='home'
          variants={mainComponent}
          initial='hidden'
          animate='enter'
          exit='exit'
        >
          {/* Desktop Cube */}
          <motion.div
            className='hidden flex-grow flex-col justify-evenly md:flex'
            key='desktop-cube'
            animate={{ x: isCalculatorOpen ? '-25vw' : 0 }}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
          >
            <TheCube cursorLocation={cursorLocation} theme={theme} />
          </motion.div>

          {/* Mobile Cube */}
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

        {/* Desktop Calculator Toggle */}
        <motion.div
          className='absolute bottom-12 right-12'
          key='calculator-toggle'
          variants={calculatorComponent}
          initial='hidden'
          animate='enter'
          exit='exit'
        >
          {theme == 'light' ? (
            <CalculatorToggleLight
              className='hidden h-24 w-36 cursor-pointer md:block'
              onClick={() => setIsCalculatorOpen((prev) => !prev)}
            />
          ) : (
            <CalculatorToggleDark
              className='hidden h-24 w-36 cursor-pointer md:block '
              onClick={() => setIsCalculatorOpen((prev) => !prev)}
            />
          )}
        </motion.div>

        <AnimatePresence>
          {isCalculatorOpen && (
            <Calculator
              theme={theme}
              pageData={pageData}
              setIsCalculatorOpen={setIsCalculatorOpen}
            />
          )}
        </AnimatePresence>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data: pageData } = await client.query({
    query: CalculatorConstantsDocument,
  });

  return {
    props: {
      pageData,
    },
  };
}
