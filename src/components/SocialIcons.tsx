import React from 'react';

import DarkFacebook from '~/svg/facebook-dark.svg';
import LightFacebook from '~/svg/facebook-light.svg';
import DarkInstagram from '~/svg/instagram-dark.svg';
import LightInstagram from '~/svg/instagram-light.svg';
import DarkTwitter from '~/svg/twitter-dark.svg';
import LightTwitter from '~/svg/twitter-light.svg';
import DarkYouTube from '~/svg/youtube-dark.svg';
import LightYouTube from '~/svg/youtube-light.svg';

interface ComponentProps {
  theme: string;
  SocialLinksData: { [key: string]: string | null } | null | undefined;
  mobileVersion?: boolean;
}

export default function ScialIcons({
  theme,
  SocialLinksData,
  mobileVersion,
}: ComponentProps) {
  return (
    <div
      className={`w-full justify-center
                          ${
                            mobileVersion
                              ? 'my-1 flex md:hidden'
                              : 'absolute hidden md:flex'
                          }`}
    >
      {theme == 'light' ? (
        <div className=' flex gap-5 '>
          {SocialLinksData?.facebookLink && (
            <a href={SocialLinksData?.facebookLink}>
              <DarkFacebook className='h-6 w-6 cursor-pointer' />
            </a>
          )}
          {SocialLinksData?.twitterLink && (
            <a href={SocialLinksData?.twitterLink}>
              <DarkTwitter className='h-6 w-6 cursor-pointer' />
            </a>
          )}
          {SocialLinksData?.youtubeLink && (
            <a href={SocialLinksData?.youtubeLink}>
              <DarkYouTube className='h-6 w-6 cursor-pointer' />
            </a>
          )}
          {SocialLinksData?.instagramLink && (
            <a href={SocialLinksData?.instagramLink}>
              <DarkInstagram className='h-6 w-6 cursor-pointer' />
            </a>
          )}
        </div>
      ) : (
        <div className=' flex gap-5 '>
          {SocialLinksData?.facebookLink && (
            <a href={SocialLinksData?.facebookLink}>
              <LightFacebook className='h-6 w-6 cursor-pointer' />
            </a>
          )}
          {SocialLinksData?.twitterLink && (
            <a href={SocialLinksData?.twitterLink}>
              <LightTwitter className='h-6 w-6 cursor-pointer' />
            </a>
          )}
          {SocialLinksData?.youtubeLink && (
            <a href={SocialLinksData?.youtubeLink}>
              <LightYouTube className='h-6 w-6 cursor-pointer' />
            </a>
          )}
          {SocialLinksData?.instagramLink && (
            <a href={SocialLinksData?.instagramLink}>
              <LightInstagram className='h-6 w-6 cursor-pointer' />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
