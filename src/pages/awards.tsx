import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import client from '@/lib/apolloClient';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import {
  AwardsDocument,
  AwardsQuery,
  FooterSocialsDocument,
  FooterSocialsQuery,
} from '@/queries/generated-queries';
import { useTheme } from '@/ThemeContext';

import Arrow from '~/svg/right-arrow.svg';

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

interface ContactProps {
  data: AwardsQuery;
  socials: FooterSocialsQuery;
}

export default function Awards({ data, socials }: ContactProps) {
  // clean up Awards data & footer socials before use
  const awards = data?.awards?.edges;
  const footerSocialsData = socials.pageBy?.contactPageFields?.socialMedia;

  // light/dark themeheme context
  const { theme, toggleTheme } = useTheme();

  return (
    <Layout
      theme={theme}
      toggleTheme={toggleTheme}
      footerSocialsData={footerSocialsData}
    >
      <Seo templateTitle='Awards' />

      <main
        className={`flex flex-grow flex-col items-center justify-start px-12
                        ${
                          theme == 'light'
                            ? 'bg-customGray'
                            : 'bg-customDarkBlue'
                        } `}
      >
        <motion.div
          className='flex h-full w-full pt-10'
          key='awards'
          variants={mainComponent}
          initial='hidden'
          animate='enter'
          exit='exit'
        >
          {/* Awards grid */}
          <div className='grid h-fit w-full grid-cols-3 gap-16'>
            {awards &&
              awards.map((item) => {
                return (
                  <div key={item.node.id} className='relative aspect-square'>
                    <Image
                      src={item.node.featuredImage?.node.sourceUrl || ''}
                      alt={item.node.title || 'award-image'}
                      fill
                      className='object-cover'
                      quality={100}
                    />
                    <div className='text-customGray bg-customDarkBlue/75 absolute inset-0 flex flex-col justify-between p-10 opacity-0 transition duration-200 hover:opacity-100'>
                      <p className=' text-left text-3xl font-bold '>
                        {item.node.title}
                      </p>
                      <div className='flex items-center justify-between gap-8 text-center text-2xl font-light'>
                        <Link
                          href={
                            item.node.awardFields?.relatedProject?.uri ||
                            '/projects'
                          }
                          className='bg-customGray flex-grow p-3 text-black'
                        >
                          Project
                        </Link>
                        <Link
                          href={item.node.awardFields?.awardLink || '#'}
                          className='border-customGray flex flex-grow items-center justify-center gap-2 border p-3'
                        >
                          <p>Award</p>
                          <Arrow className='h-5 w-5' />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </motion.div>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: AwardsDocument,
  });

  const { data: socials } = await client.query({
    query: FooterSocialsDocument,
  });

  return {
    props: {
      data,
      socials,
    },
  };
}
