import * as React from 'react';

import DarkFacebook from '~/svg/facebook-dark.svg';
import LightFacebook from '~/svg/facebook-light.svg';
import DarkInstagram from '~/svg/instagram-dark.svg';
import LightInstagram from '~/svg/instagram-light.svg';
import DarkTwitter from '~/svg/twitter-dark.svg';
import LightTwitter from '~/svg/twitter-light.svg';
import DarkYouTube from '~/svg/youtube-dark.svg';
import LightYouTube from '~/svg/youtube-light.svg';

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
      {' '}
      {!noFooter && (
        <div>
          {theme == 'light' ? (
            <div className='mx-12 mb-16 mt-8 flex gap-5 border-y border-current py-5'>
              <DarkFacebook className='h-7 w-7' />
              <DarkTwitter className='h-7 w-7' />
              <DarkYouTube className='h-7 w-7' />
              <DarkInstagram className='h-7 w-7' />
            </div>
          ) : (
            <div className='mx-12 mb-16 mt-8 flex gap-5 border-y border-current py-5'>
              <LightFacebook className='h-7 w-7' />
              <LightTwitter className='h-7 w-7' />
              <LightYouTube className='h-7 w-7' />
              <LightInstagram className='h-7 w-7' />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
