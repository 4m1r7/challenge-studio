import { motion } from 'framer-motion';
import * as React from 'react';

import DarkFacebook from '~/svg/facebook-dark.svg';
import LightFacebook from '~/svg/facebook-light.svg';
import DarkInstagram from '~/svg/instagram-dark.svg';
import LightInstagram from '~/svg/instagram-light.svg';
import DarkTwitter from '~/svg/twitter-dark.svg';
import LightTwitter from '~/svg/twitter-light.svg';
import DarkYouTube from '~/svg/youtube-dark.svg';
import LightYouTube from '~/svg/youtube-light.svg';

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
}

export default function Footer({ noFooter, theme }: FooterProps) {
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
          className='mx-12 mb-16 mt-8 flex justify-between border-y border-current py-4'
        >
          {theme == 'light' ? (
            <div className=' flex gap-5 '>
              <DarkFacebook className='h-6 w-6 cursor-pointer' />
              <DarkTwitter className='h-6 w-6 cursor-pointer' />
              <DarkYouTube className='h-6 w-6 cursor-pointer' />
              <DarkInstagram className='h-6 w-6 cursor-pointer' />
            </div>
          ) : (
            <div className=' flex gap-5 '>
              <LightFacebook className='h-6 w-6 cursor-pointer' />
              <LightTwitter className='h-6 w-6 cursor-pointer' />
              <LightYouTube className='h-6 w-6 cursor-pointer' />
              <LightInstagram className='h-6 w-6 cursor-pointer' />
            </div>
          )}

          <p>Designed @ [ BÂZ.SPACE ]</p>
        </motion.div>
      )}
    </section>
  );
}
