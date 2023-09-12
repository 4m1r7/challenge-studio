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

  // Form result
  const [result, setResult] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setResult('Sending....');
    const formData = new FormData(event.target as HTMLFormElement);

    // TODO: change with clients access key
    formData.append('access_key', 'c6b542e4-bc5d-4ec0-ad2f-95b4623a58f1');

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
    <Layout theme={theme} toggleTheme={toggleTheme} noFooter>
      <Seo templateTitle='Contact' />

      <main
        className={`flex flex-grow flex-col items-center justify-end p-12
                        ${
                          theme == 'light'
                            ? 'bg-customGray'
                            : 'bg-customDarkBlue'
                        } `}
      >
        <motion.div
          className='flex h-fit w-full items-end'
          key='awards'
          variants={mainComponent}
          initial='hidden'
          animate='enter'
          exit='exit'
        >
          {/* Contact Info */}
          <div className='flex h-full w-1/5 flex-col justify-end gap-8'>
            <div
              className={`flex flex-col gap-4 border-l pl-4 text-sm xl:pr-[5vw] 2xl:pr-[6vw] ${
                theme == 'light'
                  ? 'border-customDarkBlue text-customDarkBlue'
                  : ' border-customGray text-customGray'
              }`}
            >
              <h2 className='text-lg'>INFO</h2>
              <div dangerouslySetInnerHTML={{ __html: contactContent || '' }} />
            </div>

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

          {/* Contact Form */}
          <div
            className={`relative mb-16 flex w-2/5 flex-col items-start justify-end border-l border-current pl-4
                            ${
                              theme == 'light'
                                ? 'text-customDarkBlue'
                                : 'text-customGray'
                            }`}
          >
            <h2 className='mb-2 text-left text-lg'>JOIN US</h2>
            <p className='mb-8 w-2/3 text-justify text-sm'>
              Challenge Studio is always looking for talented people to join its
              team. If you are interested in working with us, submit your
              portfolio & cv to work@challenge-studio.ir
            </p>

            <h2 className='mb-2 text-left text-lg'>CONTACT</h2>

            <form onSubmit={handleSubmit} className='flex w-full gap-4'>
              <div className='w-1/2'>
                <div className='flex w-full flex-col'>
                  <label htmlFor='name' className=''>
                    Full Name{'>'}
                  </label>
                  <input
                    id='name'
                    name='name'
                    type='text'
                    className=' focus:border-neutral-500 focus:ring-0'
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
                    className=' focus:border-neutral-500 focus:ring-0'
                  />
                </div>

                <div className='mt-6 flex w-full flex-col'>
                  <label htmlFor='message' className=''>
                    Message{'>'}
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    className=' focus:border-neutral-500 focus:ring-0'
                    required
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

          {/* Map Image */}
          <div className='relative flex aspect-square w-2/5 items-end'>
            <Image
              src={
                theme == 'light'
                  ? '/images/map-dark-tinified.png'
                  : '/images/map-light-tinified.png'
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
