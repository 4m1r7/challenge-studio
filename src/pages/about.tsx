import { motion } from 'framer-motion';
import Image from 'next/image';
import * as React from 'react';

import client from '@/lib/apolloClient';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import {
  AboutPageDocument,
  AboutPageQuery,
  FooterSocialsDocument,
  FooterSocialsQuery,
  MembersDocument,
  MembersQuery,
} from '@/queries/generated-queries';
import { useTheme } from '@/ThemeContext';

import AboutImageDark from '~/svg/about-signs-dark.svg';
import AboutImageLight from '~/svg/about-signs-light.svg';

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

interface AboutProps {
  membersData: MembersQuery;
  pageData: AboutPageQuery;
  socials: FooterSocialsQuery;
}

export default function About({ membersData, pageData, socials }: AboutProps) {
  // clean up About data & footer socials before use
  const footerSocialsData = socials.pageBy?.contactPageFields?.socialMedia;
  const aboutContent = pageData.pageBy?.content;
  const allMembers = membersData?.members?.edges || [];
  const founder = allMembers[allMembers.length - 1]?.node;
  const members = allMembers
    .slice(0, allMembers.length - 1)
    .map((edge) => edge.node);
  const currentMembers = members
    .reverse()
    .filter((member) => !member.memberFields?.oldMember);
  const previousMembers = members
    .reverse()
    .filter((member) => member.memberFields?.oldMember);

  // light/dark themeheme context
  const { theme, toggleTheme } = useTheme();

  return (
    <Layout
      theme={theme}
      toggleTheme={toggleTheme}
      footerSocialsData={footerSocialsData}
    >
      <Seo templateTitle='About' />

      <main
        className={`flex flex-grow flex-col items-center justify-start px-12 py-10
                        ${
                          theme == 'light'
                            ? 'bg-customGray'
                            : 'bg-customDarkBlue'
                        } `}
      >
        <motion.div
          className='flex w-full flex-grow flex-col'
          key='awards'
          variants={mainComponent}
          initial='hidden'
          animate='enter'
          exit='exit'
        >
          {/* Top Section */}
          <div className='grid h-[82vh] w-full grid-cols-3 items-center justify-center pb-24'>
            {/* Founder */}
            <div className='flex h-[50vh] w-full'>
              <div
                className={`flex flex-col items-end justify-start border-r pr-6
                              ${
                                theme == 'light'
                                  ? 'border-customDarkBlue text-customDarkBlue'
                                  : ' border-customGray text-customGray'
                              } `}
              >
                <h2 className='text-base'>Founder{'>'}</h2>
                <p className='whitespace-nowrap text-sm'>{founder.title}</p>
              </div>

              <div className='relative ml-6 w-full'>
                <Image
                  src={founder.featuredImage?.node.sourceUrl || ''}
                  fill
                  className='object-cover'
                  loading='eager'
                  alt={founder.title || 'founder'}
                />
              </div>
            </div>

            {/* Middle Image */}
            <div className='flex h-[50vh] w-full items-center justify-center p-20'>
              {theme == 'light' ? (
                <AboutImageDark className='h-full w-full' />
              ) : (
                <AboutImageLight className='h-full w-full' />
              )}
            </div>

            {/* About Paragraph */}
            <div className='flex h-[50vh] w-full items-center justify-start'>
              <div
                dangerouslySetInnerHTML={{ __html: aboutContent || '' }}
                className={`h-full border-l pl-4 text-sm xl:pr-[5vw] 2xl:pr-[6vw] ${
                  theme == 'light'
                    ? 'border-customDarkBlue text-customDarkBlue'
                    : ' border-customGray text-customGray'
                }`}
              />
            </div>
          </div>

          {/* Members */}
          <div
            className={`flex w-full flex-col items-center gap-16 text-center
                          ${
                            theme == 'light'
                              ? 'text-customDarkBlue'
                              : ' text-customGray'
                          }`}
          >
            {/* Current Members */}
            <h2 className='font-normal'>
              {'<'} Challenge Team {'>'}
            </h2>

            <div className='grid w-11/12 grid-cols-4 gap-16 xl:w-9/12'>
              {currentMembers.map((member) => (
                <div key={member.id} id={member.slug || ''} className='lol'>
                  <div className='relative mb-5 aspect-square w-full'>
                    <Image
                      src={member.featuredImage?.node.sourceUrl || ''}
                      alt={member.title || 'studio-member'}
                      fill
                    />
                  </div>

                  <h2 className='mb-1 text-sm'>{member.title}</h2>

                  <p className='text-xs font-light'>
                    {member.memberFields?.position}
                  </p>
                  <div
                    className='mt-2 text-left text-xs font-light'
                    dangerouslySetInnerHTML={{
                      __html: member?.content || '',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Previuos Members */}
            {previousMembers.length > 0 && (
              <>
                <hr
                  className={`w-full border-t
                            ${
                              theme == 'light'
                                ? 'border-customDarkBlue'
                                : ' border-customGra'
                            }`}
                />

                <h2 className='font-normal'>
                  {'<'} Previous Members {'>'}
                </h2>

                <div className='grid w-11/12 grid-cols-4 gap-16 xl:w-9/12'>
                  {previousMembers.map((member) => (
                    <div key={member.id} id={member.slug || ''}>
                      <div className='relative mb-5 aspect-square w-full'>
                        <Image
                          src={member.featuredImage?.node.sourceUrl || ''}
                          alt={member.title || 'studio-member'}
                          fill
                        />
                      </div>

                      <h2 className='mb-1 text-sm'>{member.title}</h2>

                      <p className='text-xs font-light'>
                        {member.memberFields?.position}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data: pageData } = await client.query({
    query: AboutPageDocument,
  });

  const { data: membersData } = await client.query({
    query: MembersDocument,
  });

  const { data: socials } = await client.query({
    query: FooterSocialsDocument,
  });

  return {
    props: {
      pageData,
      membersData,
      socials,
    },
  };
}
