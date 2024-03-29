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
  ProjectsPageDocument,
  ProjectsPageQuery,
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
  portfolioLink: ProjectsPageQuery;
  socials: FooterSocialsQuery;
}

export default function Awards({ data, socials, portfolioLink }: ContactProps) {
  // clean up Awards data & footer socials before use
  const awards = data?.awards?.edges;
  const SocialLinksData = socials.pageBy?.contactPageFields?.socialMedia;

  // light/dark themeheme context
  const { theme, toggleTheme } = useTheme();

  return (
    <Layout
      theme={theme}
      toggleTheme={toggleTheme}
      portfolioLink={
        portfolioLink?.pageBy?.projectsPageFields?.portfolioFile?.mediaItemUrl
      }
      SocialLinksData={SocialLinksData}
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
          <div className='grid h-fit w-full grid-cols-1 gap-16 md:grid-cols-3'>
            {awards &&
              awards.map((item, index) => {
                return (
                  <div key={item.node.id} className='flex flex-col gap-2'>
                    <div className='relative aspect-square'>
                      {/* Award Image */}
                      <Image
                        className='object-cover'
                        src={item.node.featuredImage?.node.sourceUrl || ''}
                        alt={item.node.title || 'award-image'}
                        fill
                        sizes='(max-width: 767px) 77vw, 35vw'
                        quality={100}
                        priority={index < 4 ? true : false}
                      />

                      {/* OverLay */}
                      <div className='text-customGray md:bg-customDarkBlue/75 absolute inset-0 flex flex-col justify-end p-5 transition duration-200 md:justify-between md:p-10 md:opacity-0 md:hover:opacity-100 '>
                        {/* Title */}
                        <p className=' hidden text-left text-3xl font-bold md:flex'>
                          {item.node.title}
                        </p>

                        {/* Buttons */}
                        <div className='flex items-center justify-between gap-8 text-center text-xl font-light md:text-2xl'>
                          <Link
                            href={
                              item.node.awardFields?.relatedProject?.uri ||
                              '/projects'
                            }
                            aria-label='Related Project'
                            className='bg-customGray flex-grow p-3 text-black'
                          >
                            Project
                          </Link>
                          <Link
                            href={item.node.awardFields?.awardLink || '#'}
                            target='_blank'
                            aria-label='Award Link'
                            className='bg-customGray md:text-customGray border-customGray flex flex-grow items-center justify-center gap-2 border p-3 text-black md:bg-transparent'
                          >
                            <p>Award</p>
                            <Arrow className='black-in-mobile h-5 w-7' />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Title */}
                    <p
                      className={`text-left text-xl md:hidden
                                ${
                                  theme == 'light'
                                    ? 'text-customDarkBlue'
                                    : 'text-customGray'
                                }`}
                    >
                      {item.node.title}
                    </p>
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

  const { data: portfolioLink } = await client.query({
    query: ProjectsPageDocument,
  });

  const { data: socials } = await client.query({
    query: FooterSocialsDocument,
  });

  return {
    props: {
      data,
      portfolioLink,
      socials,
    },
  };
}
