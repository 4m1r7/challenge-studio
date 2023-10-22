import { motion } from 'framer-motion';
import * as React from 'react';

import SocialIcons from '@/components/SocialIcons';

// Header motion values
const mainComponent = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: { ease: 'easeOut', duration: 1.5 },
  },
  exit: {
    opacity: 0,
    y: 40,
    transition: { ease: 'easeOut', duration: 0.5 },
  },
};

interface FooterProps {
  noFooter?: boolean;
  theme: string;
  SocialLinksData:
    | {
        [key: string]: string | null;
      }
    | null
    | undefined;
}

export default function Footer({
  noFooter,
  theme,
  SocialLinksData,
}: FooterProps) {
  return (
    <section
      className={
        theme == 'light'
          ? 'text-customDarkBlue bg-customGray'
          : ' text-customGray bg-customDarkBlue'
      }
    >
      {!noFooter && (
        <motion.div
          key='header'
          variants={mainComponent}
          initial='hidden'
          animate='enter'
          exit='exit'
          className='relative mx-12 mb-10 mt-24 flex flex-col justify-between border-y border-current py-4 md:flex-row md:px-1'
        >
          <SocialIcons
            theme={theme}
            SocialLinksData={SocialLinksData}
            mobileVersion
          />

          <p className='mt-3 flex items-center justify-center whitespace-nowrap text-center text-sm tracking-tighter md:mt-0'>
            Architecture is inherently a challenge.
          </p>

          <SocialIcons theme={theme} SocialLinksData={SocialLinksData} />

          <p className='flex items-center justify-center gap-2 text-xs tracking-tighter md:tracking-normal'>
            <span className='text-lg'>©</span> 2023 Challenge Studio, All rights
            reserved
          </p>
        </motion.div>
      )}
    </section>
  );
}
