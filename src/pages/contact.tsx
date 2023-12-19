import { motion } from 'framer-motion';
import Image from 'next/image';
import * as React from 'react';
import { FormEventHandler, useState } from 'react';

import client from '@/lib/apolloClient';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import {
  ContactPageDocument,
  ContactPageQuery,
  FooterSocialsDocument,
  FooterSocialsQuery,
} from '@/queries/generated-queries';
import { useTheme } from '@/ThemeContext';

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
  data: ContactPageQuery;
  socials: FooterSocialsQuery;
}

export default function Contact({ data, socials }: ContactProps) {
  // clean up the project array before use
  const contactData = data.pageBy;
  const SocialLinksData = socials.pageBy?.contactPageFields?.socialMedia;

  // light/dark themeheme context
  const { theme, toggleTheme } = useTheme();

  // Form result
  const [result, setResult] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setResult('Sending....');
    const formData = new FormData(event.target as HTMLFormElement);

    formData.append('access_key', '3ec60215-7d0d-457f-8900-b84f874ea3a7');

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    }).then((res) => res.json());

    if (res.success) {
      // console.log("Success", res);
      setResult(res.message);
    } else {
      // console.log("Error", res);
      setResult(res.message);
    }
  };

  return (
    <Layout
      theme={theme}
      toggleTheme={toggleTheme}
      SocialLinksData={SocialLinksData}
    >
      <Seo templateTitle='Contact' />

      <main
        className={`flex flex-grow flex-col items-center justify-end px-12
                        ${
                          theme == 'light'
                            ? 'bg-customGray'
                            : 'bg-customDarkBlue'
                        } `}
      >
        <motion.div
          className='flex h-fit w-full flex-col items-end gap-14 md:flex-row md:gap-0'
          key='awards'
          variants={mainComponent}
          initial='hidden'
          animate='enter'
          exit='exit'
        >
          {/* Mobile Map Image */}
          <a
            href={
              contactData?.contactPageFields?.googleMapsLink ||
              'maps.google.com'
            }
            target='_blank'
            className='relative mt-10 flex aspect-square w-full items-end md:hidden'
          >
            {theme == 'light' ? (
              <Image
                src={
                  contactData?.contactPageFields?.maps?.lightModeMap
                    ?.mediaItemUrl || ''
                }
                alt='Location Map'
                fill
                loading='eager'
                className='object-cover'
              />
            ) : (
              <Image
                src={
                  contactData?.contactPageFields?.maps?.darkModeMap
                    ?.mediaItemUrl || ''
                }
                alt='Location Map'
                fill
                loading='eager'
                className='object-cover'
              />
            )}
          </a>

          {/* Contact Info */}
          <div
            className={`flex h-full w-full flex-col gap-4 border-l pl-4 text-sm md:w-1/5 xl:pr-[5vw] 2xl:pr-[6vw] ${
              theme == 'light'
                ? 'border-customDarkBlue text-customDarkBlue'
                : ' border-customGray text-customGray'
            }`}
          >
            <h2 className='text-lg'>INFO</h2>
            <div
              className='flex flex-col gap-5'
              dangerouslySetInnerHTML={{ __html: contactData?.content || '' }}
            />
          </div>

          {/* Contact Form */}
          <div
            className={`relative flex w-full flex-col items-start justify-end border-l border-current pl-4 md:w-2/5
                            ${
                              theme == 'light'
                                ? 'text-customDarkBlue'
                                : 'text-customGray'
                            }`}
          >
            <h2 className='mb-2 text-left text-lg'>JOIN US</h2>
            <p className='mb-8 w-full text-justify text-sm font-light md:w-2/3'>
              Challenge Studio is always looking for talented people to join its
              team. If you are interested in working with us, submit your
              portfolio & cv to{' '}
              <a href='mailto:work@challenge-studio.com' className='font-bold '>
                work@challenge-studio.com
              </a>
            </p>

            <h2 className='mb-2 text-left text-lg'>CONTACT</h2>

            <form
              onSubmit={handleSubmit}
              className='flex w-full flex-col gap-4 md:flex-row'
            >
              <div className='w-full md:w-1/2'>
                <div className='flex w-full flex-col'>
                  <label htmlFor='name' className=''>
                    Full Name{'>'}
                  </label>
                  <input
                    id='name'
                    name='name'
                    type='text'
                    className='text-customDarkBlue focus:ring-0'
                    required
                  />
                </div>

                <div className='mt-6 flex w-full flex-col'>
                  <label htmlFor='email' className=''>
                    Email{'>'}
                  </label>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    className='text-customDarkBlue focus:ring-0'
                    required
                  />
                </div>

                <div className='mt-6 flex w-full flex-col'>
                  <label htmlFor='message' className=''>
                    Message{'>'}
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    className='text-customDarkBlue focus:ring-0'
                    required
                    rows={3}
                  ></textarea>
                </div>
              </div>

              <div className='items-between flex flex-col justify-end'>
                {/* TODO create proper submit results window */}
                <p>{result}</p>
                <button
                  type='submit'
                  className='border border-current px-2 py-0'
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Desktop Map Image */}
          <a
            href={
              contactData?.contactPageFields?.googleMapsLink ||
              'maps.google.com'
            }
            target='_blank'
            className='relative hidden aspect-square w-2/5 items-end md:flex '
          >
            {theme == 'light' ? (
              <Image
                src={
                  contactData?.contactPageFields?.maps?.lightModeMap
                    ?.mediaItemUrl || ''
                }
                alt='Location Map'
                fill
                loading='eager'
                className='object-cover'
              />
            ) : (
              <Image
                src={
                  contactData?.contactPageFields?.maps?.darkModeMap
                    ?.mediaItemUrl || ''
                }
                alt='Location Map'
                fill
                loading='eager'
                className='object-cover'
              />
            )}
          </a>
        </motion.div>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: ContactPageDocument,
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
