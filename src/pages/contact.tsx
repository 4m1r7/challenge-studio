import { motion } from 'framer-motion';
import Image from 'next/image';
import * as React from 'react';

import client from '@/lib/apolloClient';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import {
  ContactPageDocument,
  ContactPageQuery,
} from '@/queries/generated-queries';
import { useTheme } from '@/ThemeContext';

import DarkFacebook from '~/svg/facebook-dark.svg';
import LightFacebook from '~/svg/facebook-light.svg';
import DarkInstagram from '~/svg/instagram-dark.svg';
import LightInstagram from '~/svg/instagram-light.svg';
import DarkTwitter from '~/svg/twitter-dark.svg';
import LightTwitter from '~/svg/twitter-light.svg';
import DarkYouTube from '~/svg/youtube-dark.svg';
import LightYouTube from '~/svg/youtube-light.svg';

// page motion values
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

export default function Contact(data: { data: ContactPageQuery }) {
  // clean up the project array before use
  const contactContent = data.data.pageBy?.content;

  // light/dark themeheme context
  const { theme, toggleTheme } = useTheme();

  return (
    <Layout theme={theme} toggleTheme={toggleTheme} noThemeChanger noFooter>
      <Seo templateTitle='Contact' />

      <main
        className={`flex flex-grow flex-col items-center justify-start px-12
                        ${
                          theme == 'light'
                            ? 'bg-customGray'
                            : 'bg-customDarkBlue'
                        } `}
      >
        <motion.div
          className='flex h-[81vh] w-full pt-10'
          key='awards'
          variants={mainComponent}
          initial='hidden'
          animate='enter'
          exit='exit'
        >
          {/* Contact Info */}
          <div className='flex h-full w-1/5 flex-col justify-end gap-8'>
            <div
              dangerouslySetInnerHTML={{ __html: contactContent || '' }}
              className={`border-l pl-4 text-sm xl:pr-[5vw] 2xl:pr-[6vw] ${
                theme == 'light'
                  ? 'border-customDarkBlue text-customDarkBlue'
                  : ' border-customGray text-customGray'
              }`}
            />
            {theme == 'light' ? (
              <div className='flex gap-5'>
                <DarkFacebook className='h-8 w-8' />
                <DarkTwitter className='h-8 w-8' />
                <DarkYouTube className='h-8 w-8' />
                <DarkInstagram className='h-8 w-8' />
              </div>
            ) : (
              <div className='flex gap-5'>
                <LightFacebook className='h-8 w-8' />
                <LightTwitter className='h-8 w-8' />
                <LightYouTube className='h-8 w-8' />
                <LightInstagram className='h-8 w-8' />
              </div>
            )}
          </div>

          {/* Map Image */}
          <div className='relative flex h-full w-4/5 items-end'>
            <Image
              src={
                theme == 'light'
                  ? '/images/map-dark.png'
                  : '/images/map-light.png'
              }
              alt='Location Map'
              fill
              className='object-cover'
            />
          </div>
        </motion.div>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: ContactPageDocument,
  });

  return {
    props: {
      data,
    },
  };
}
