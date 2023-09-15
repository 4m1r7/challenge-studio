import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import DarkClose from '~/svg/close-dark.svg';
import LightClose from '~/svg/close-light.svg';
import DarkChevron from '~/svg/down-chev-dark.svg';
import LightChevron from '~/svg/down-chev-light.svg';
import DarkFullscreen from '~/svg/fullscreen-dark.svg';
import LightFullscreen from '~/svg/fullscreen-light.svg';

interface MediaModalProps {
  mediaUrls: { mediaUrl: string; mediaType: string }[];
  currentMediaIndex: number;
  setCurrentMediaIndex: (index: number) => void;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  theme: string;
}

export default function MediaModal({
  mediaUrls,
  currentMediaIndex,
  setCurrentMediaIndex,
  onClose,
  onPrev,
  onNext,
  theme,
}: MediaModalProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    // Pause video when modal is closed
    return () => {
      setIsVideoPlaying(false);
    };
  }, []);

  const toggleVideoPlayback = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  const handleClose = () => {
    setIsVideoPlaying(false);
    onClose();
  };

  return (
    <motion.div
      key='modal'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex flex-col gap-5
                ${
                  theme == 'light'
                    ? 'bg-customGray text-customDarkBlue'
                    : 'bg-customDarkBlue text-customGray'
                }
                ${isFullScreen == true ? 'px-6 py-1' : 'p-20 pt-28'}`}
    >
      {/* Gallery Image and Controls */}
      <div
        className={` z-50 flex w-full flex-grow items-center justify-between 
                      ${isFullScreen == true ? 'gap-0' : 'gap-24'}`}
      >
        {/* Close Button */}
        {theme == 'light' ? (
          <DarkClose
            className={` absolute top-28 h-6 w-6 cursor-pointer 
                        ${isFullScreen == true ? 'right-8' : 'right-20'}`}
            onClick={handleClose}
          />
        ) : (
          <LightClose
            className={` absolute  top-28 h-6 w-6 cursor-pointer 
                        ${isFullScreen == true ? 'right-8' : 'right-20'}`}
            onClick={handleClose}
          />
        )}

        {/* Fullscreen Button */}
        {theme == 'light' ? (
          <DarkFullscreen
            className={` absolute  top-28 h-8 w-8 cursor-pointer 
                        ${isFullScreen == true ? 'left-8' : 'left-20'}`}
            onClick={() => setIsFullScreen(!isFullScreen)}
          />
        ) : (
          <LightFullscreen
            className={` absolute  top-28 h-8 w-8 cursor-pointer 
                        ${isFullScreen == true ? 'left-8' : 'left-20'}`}
            onClick={() => setIsFullScreen(!isFullScreen)}
          />
        )}

        {/* Previous Button */}
        {theme == 'light' ? (
          <DarkChevron
            className='top-1/2 h-10 w-10 -translate-y-1/2 rotate-90 transform cursor-pointer'
            onClick={onPrev}
          />
        ) : (
          <LightChevron
            className='top-1/2 h-10 w-10 -translate-y-1/2 rotate-90 transform cursor-pointer'
            onClick={onPrev}
          />
        )}

        {/* Media */}
        <div className=' relative flex h-full w-full flex-col'>
          {mediaUrls[currentMediaIndex].mediaType === 'image' ? (
            <>
              <Image
                src={mediaUrls[currentMediaIndex].mediaUrl}
                alt='Project Photo'
                fill
                quality={100}
                className='object-contain'
              />
              <div
                className='prev-overlay left-chev-cursor absolute left-0 top-0 h-full w-1/2'
                onClick={onPrev}
              />
              <div
                className='next-overlay right-cursor right-chev-cursor absolute right-0 top-0 h-full w-1/2'
                onClick={onNext}
              />
            </>
          ) : (
            <video
              src={mediaUrls[currentMediaIndex].mediaUrl}
              controls
              preload='auto'
              onClick={toggleVideoPlayback}
              className=' absolute left-0 top-0 h-full w-full '
            />
          )}
        </div>

        {/* Next Button */}
        {theme == 'light' ? (
          <DarkChevron
            className='top-1/2 h-10 w-10 -translate-y-1/2 -rotate-90 transform cursor-pointer'
            onClick={onNext}
          />
        ) : (
          <LightChevron
            className='top-1/2 h-10 w-10 -translate-y-1/2 -rotate-90 transform cursor-pointer'
            onClick={onNext}
          />
        )}
      </div>

      {/* Gallery Thumbnails */}
      {!isFullScreen && (
        <div className=' mt-4 flex flex-nowrap space-x-2 overflow-x-scroll'>
          {mediaUrls.map((item, index) => (
            <div
              key={item.mediaUrl}
              onClick={() => {
                if (index !== currentMediaIndex) {
                  setCurrentMediaIndex(index);
                  setIsVideoPlaying(false);
                }
              }}
              className={`relative m-1 h-20 w-20 min-w-[5rem] cursor-pointer rounded-sm ${
                index === currentMediaIndex
                  ? 'border-blue-500'
                  : 'border-gray-300'
              } overflow-hidden border-2`}
            >
              {item.mediaType === 'image' ? (
                <Image
                  src={item.mediaUrl || ''}
                  fill
                  className='object-cover'
                  alt='Gallery Image'
                />
              ) : (
                <video
                  poster={item.mediaUrl || ''}
                  controls
                  preload='metadata'
                  className='aspect-square w-full object-cover'
                >
                  <source src={item.mediaUrl || ''} type='video/mp4' />
                </video>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
