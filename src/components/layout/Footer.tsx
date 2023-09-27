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
  footerSocialsData:
    | {
        [key: string]: string | null;
      }
    | null
    | undefined;
}

export default function Footer({
  noFooter,
  theme,
  footerSocialsData,
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
          className='relative mx-12 my-10 flex justify-between border-y border-current px-1 py-4'
        >
          <p>Architecture is inherently a challenge.</p>

          <div className='absolute flex w-full justify-center'>
            {theme == 'light' ? (
              <div className=' flex gap-5 '>
                {footerSocialsData?.facebookLink && (
                  <a href={footerSocialsData?.facebookLink}>
                    <DarkFacebook className='h-6 w-6 cursor-pointer' />
                  </a>
                )}
                {footerSocialsData?.twitterLink && (
                  <a href={footerSocialsData?.twitterLink}>
                    <DarkTwitter className='h-6 w-6 cursor-pointer' />
                  </a>
                )}
                {footerSocialsData?.youtubeLink && (
                  <a href={footerSocialsData?.youtubeLink}>
                    <DarkYouTube className='h-6 w-6 cursor-pointer' />
                  </a>
                )}
                {footerSocialsData?.instagramLink && (
                  <a href={footerSocialsData?.instagramLink}>
                    <DarkInstagram className='h-6 w-6 cursor-pointer' />
                  </a>
                )}
              </div>
            ) : (
              <div className=' flex gap-5 '>
                {footerSocialsData?.facebookLink && (
                  <a href={footerSocialsData?.facebookLink}>
                    <LightFacebook className='h-6 w-6 cursor-pointer' />
                  </a>
                )}
                {footerSocialsData?.twitterLink && (
                  <a href={footerSocialsData?.twitterLink}>
                    <LightTwitter className='h-6 w-6 cursor-pointer' />
                  </a>
                )}
                {footerSocialsData?.youtubeLink && (
                  <a href={footerSocialsData?.youtubeLink}>
                    <LightYouTube className='h-6 w-6 cursor-pointer' />
                  </a>
                )}
                {footerSocialsData?.instagramLink && (
                  <a href={footerSocialsData?.instagramLink}>
                    <LightInstagram className='h-6 w-6 cursor-pointer' />
                  </a>
                )}
              </div>
            )}
          </div>

          <p>
            <span className='text-lg'>©</span> 2023 Challenge Studio, All rights
            reserved
          </p>
        </motion.div>
      )}
    </section>
  );
}
