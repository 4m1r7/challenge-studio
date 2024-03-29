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
  ProjectsPageDocument,
  ProjectsPageQuery,
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
  portfolioLink: ProjectsPageQuery;
  socials: FooterSocialsQuery;
}

export default function About({
  membersData,
  pageData,
  portfolioLink,
  socials,
}: AboutProps) {
  // clean up About data & footer socials before use
  const SocialLinksData = socials.pageBy?.contactPageFields?.socialMedia;
  const aboutContent = pageData.pageBy?.content;
  const allMembers = membersData?.members?.edges || [];
  const founder = allMembers[allMembers.length - 1]?.node;
  const members = allMembers
    .slice(0, allMembers.length - 1)
    .map((edge) => edge.node);
  const currentMembers = members
    .reverse()
    .filter((member) => !member.memberFields?.oldMember);
  const currentMembersWimage = currentMembers.filter(
    (member) => member.featuredImage?.node.sourceUrl
  );
  const currentMembersWOimage = currentMembers.filter(
    (member) => !member.featuredImage?.node.sourceUrl
  );
  const previousMembers = members
    .reverse()
    .filter((member) => member.memberFields?.oldMember);
  const previousMembersWimage = previousMembers.filter(
    (member) => member.featuredImage?.node.sourceUrl
  );
  const previousMembersWOimage = previousMembers.filter(
    (member) => !member.featuredImage?.node.sourceUrl
  );

  // light/dark themeheme context
  const { theme, toggleTheme } = useTheme();

  return (
    <Layout
      theme={theme}
      toggleTheme={toggleTheme}
      portfolioLink={
        portfolioLink.pageBy?.projectsPageFields?.portfolioFile?.mediaItemUrl
      }
      SocialLinksData={SocialLinksData}
    >
      <Seo templateTitle='About' />

      <main
        className={`flex flex-grow flex-col items-center justify-start px-12 pt-10
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
          <div className='grid h-fit w-full grid-flow-row items-center justify-center gap-10 pb-24 md:h-[82vh] md:grid-cols-3 md:gap-0'>
            {/* Founder */}
            <div className='flex h-[50vh] w-full flex-col-reverse gap-4 md:flex-row md:gap-0'>
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

              <div className='relative h-2/3 w-full md:ml-6 md:h-full'>
                <Image
                  className='object-cover'
                  src={founder.featuredImage?.node.sourceUrl || ''}
                  fill
                  sizes='(min-width: 767px) 77vw, 25vw'
                  priority
                  alt={founder.title || 'founder'}
                />
              </div>
            </div>

            {/* Middle Image */}
            <div className='hidden h-[50vh] w-full items-center justify-center p-20 md:flex'>
              {theme == 'light' ? (
                <AboutImageDark className='h-full w-full' />
              ) : (
                <AboutImageLight className='h-full w-full' />
              )}
            </div>

            {/* About Paragraph */}
            <div className='flex h-fit w-full items-center justify-start md:h-[50vh]'>
              <div
                dangerouslySetInnerHTML={{ __html: aboutContent || '' }}
                className={`h-fit border-l pl-4 text-sm md:h-full xl:pr-[5vw] 2xl:pr-[6vw] ${
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

            {/* Current Members with Image */}
            <div className='grid w-11/12 grid-cols-2 gap-10 md:grid-cols-4 md:gap-16 xl:w-9/12'>
              {currentMembersWimage.map((member) => (
                <div key={member.id} id={member.slug || ''}>
                  <div className='relative mb-2 aspect-square w-full md:mb-5'>
                    <Image
                      src={member.featuredImage?.node.sourceUrl || ''}
                      alt={member.title || 'studio-member'}
                      fill
                      sizes='(min-width: 767px) 32vw, 17vw'
                    />
                  </div>

                  <h2 className='mb-1 text-sm'>{member.title}</h2>

                  <p className='text-xs font-light'>
                    {member.memberFields?.position}
                  </p>
                  <div
                    className='mt-2 hidden text-left text-xs font-light md:flex'
                    dangerouslySetInnerHTML={{
                      __html: member?.content || '',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Current Members without Image */}
            {currentMembersWOimage.length > 0 && (
              <div className='grid w-11/12 grid-cols-2 gap-10 md:grid-cols-4 md:gap-16 xl:w-9/12'>
                {currentMembersWOimage.map((member) => (
                  <div key={member.id} id={member.slug || ''}>
                    <h2 className='mb-1 text-sm'>{member.title}</h2>
                    <p className='text-xs font-light'>
                      {member.memberFields?.position}
                    </p>
                    <div
                      className='mt-2 hidden text-left text-xs font-light md:flex'
                      dangerouslySetInnerHTML={{
                        __html: member?.content || '',
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

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

                {/* Current Members with Image */}
                {previousMembersWimage.length > 0 && (
                  <div className='grid w-11/12 grid-cols-2 gap-10 md:grid-cols-4 md:gap-16 xl:w-9/12'>
                    {previousMembersWimage.map((member) => (
                      <div key={member.id} id={member.slug || ''}>
                        <div className='relative mb-5 aspect-square w-full'>
                          <Image
                            src={member.featuredImage?.node.sourceUrl || ''}
                            alt={member.title || 'studio-member'}
                            fill
                            sizes='(min-width: 767px) 32vw, 17vw'
                          />
                        </div>

                        <h2 className='mb-1 text-sm'>{member.title}</h2>

                        <p className='text-xs font-light'>
                          {member.memberFields?.position}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Current Members without Image */}
                {previousMembersWOimage.length > 0 && (
                  <div className='grid w-11/12 grid-cols-2 gap-10 md:grid-cols-4 md:gap-16 xl:w-9/12'>
                    {previousMembersWOimage.map((member) => (
                      <div key={member.id} id={member.slug || ''}>
                        <h2 className='mb-1 text-sm'>{member.title}</h2>

                        <p className='text-xs font-light'>
                          {member.memberFields?.position}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
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

  const { data: portfolioLink } = await client.query({
    query: ProjectsPageDocument,
  });

  const { data: socials } = await client.query({
    query: FooterSocialsDocument,
  });

  return {
    props: {
      pageData,
      membersData,
      portfolioLink,
      socials,
    },
  };
}
