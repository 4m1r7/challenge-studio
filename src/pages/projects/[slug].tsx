import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import client from '@/lib/apolloClient';

import Layout from '@/components/layout/Layout';
import MediaModal from '@/components/MediaModal';
import ModelViewer from '@/components/ModelViewer';
import Seo from '@/components/Seo';

import {
  FooterSocialsDocument,
  FooterSocialsQuery,
  ProjectDataDocument,
  ProjectDataQuery,
  ProjectRoutesDocument,
  RootQueryToProjectConnectionEdge,
} from '@/queries/generated-queries';
import { useTheme } from '@/ThemeContext';

import DarkArrow from '~/svg/back-arrow-dark.svg';
import LightArrow from '~/svg/back-arrow-light.svg';
import DownChevDark from '~/svg/down-chev-dark.svg';
import DownChevLight from '~/svg/down-chev-light.svg';
import Play from '~/svg/play-button.svg';
import DarkRotate from '~/svg/rotate-dark.svg';
import LightRotate from '~/svg/rotate-light.svg';

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
  projectData: ProjectDataQuery;
  socials: FooterSocialsQuery;
}

export default function Project({ projectData, socials }: ContactProps) {
  // clean up the project data & footer socials before use
  const project = useMemo(() => projectData.projectBy, [projectData]);
  const SocialLinksData = socials.pageBy?.contactPageFields?.socialMedia;

  const mediaUrls = [
    ...(project?.projectFields?.mainVideos || [])
      .map((item, index) => ({
        mediaUrl: item?.videoItem?.mediaItemUrl,
        mediaType: 'video',
        coverImage: project?.projectFields?.allVideoImages
          ? project?.projectFields?.allVideoImages[index]?.mediaItemUrl
          : 'null',
      }))
      .filter((item) => item.mediaUrl),
    ...(project?.projectFields?.projectImages || [])
      .map((item) => ({
        mediaUrl: item?.mediaItemUrl,
        mediaType: 'image',
        coverImage: '',
      }))
      .filter((item) => item.mediaUrl),
    ...(project?.projectFields?.projectVideos || [])
      .map((item, index) => ({
        mediaUrl: item?.videoItem?.mediaItemUrl,
        mediaType: 'video',
        coverImage: project?.projectFields?.allVideoImages
          ? project?.projectFields?.allVideoImages[
              index +
                (project?.projectFields?.mainVideos
                  ? project?.projectFields?.mainVideos?.length
                  : 0)
            ]?.mediaItemUrl
          : 'null',
      }))
      .filter((item) => item.mediaUrl),
  ];

  // light/dark themeheme context
  const { theme, toggleTheme } = useTheme();

  // Image modal set up
  const [modalVisible, setModalVisible] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentMediaIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const goToPrevImage = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === 0 ? mediaUrls.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === mediaUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Setting height for the negative space element
  const negativeSpace = useRef<HTMLDivElement | null>(null);
  const [isHeightSet, setIsHeightSet] = useState<boolean>(false);

  useEffect(() => {
    if (negativeSpace.current && !isHeightSet) {
      negativeSpace.current.style.height = `calc(88vh - ${
        negativeSpace.current.getBoundingClientRect().top
      }px)`;
      setIsHeightSet(true);
    }
  }, [isHeightSet]);

  return (
    <Layout
      theme={theme}
      toggleTheme={toggleTheme}
      SocialLinksData={SocialLinksData}
    >
      <Seo templateTitle={project?.title || ''} />

      <main
        className={`flex h-full flex-col items-center justify-start px-12
                        ${
                          theme == 'light'
                            ? 'bg-customGray'
                            : 'bg-customDarkBlue'
                        } `}
      >
        <motion.div
          className={`flex h-full w-full flex-col items-center pt-10
                    ${
                      theme == 'light'
                        ? 'text-customDarkBlue'
                        : ' text-customGray'
                    }`}
          style={{}}
          key='projects'
          variants={mainComponent}
          initial='hidden'
          animate='enter'
          exit='exit'
        >
          {/* Top Section –– Mobile version is reversed and and has primary info for mobile at the end to engulf model, and original primary info hidden */}
          <div className='flex w-full flex-col-reverse md:flex-row'>
            {/* Project Info */}
            <div className='flex h-full w-full flex-col gap-8 md:w-1/4'>
              {/* Desktop Project Primary Info (minus) description */}
              <div className='hidden flex-col gap-8 md:flex'>
                <Link href='/projects'>
                  {theme == 'light' ? (
                    <DarkArrow className='h-10 w-10 ' />
                  ) : (
                    <LightArrow className='h-10 w-10 ' />
                  )}
                </Link>

                <h1 className='-mb-5 border-l border-current pl-4 text-current'>
                  {project?.title}
                </h1>

                {project?.projectFields?.locationInformation && (
                  <div className='info-box-text border-l border-current pl-4 text-current'>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: project?.projectFields?.locationInformation,
                      }}
                    />
                  </div>
                )}

                {project?.projectFields?.architectsInformation && (
                  <div className='info-box-text border-l border-current pl-4 text-current'>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: project?.projectFields?.architectsInformation,
                      }}
                    />
                  </div>
                )}
              </div>

              {project?.content && (
                <div className='project-description border-l border-current pl-4 text-sm text-current'>
                  <div className='negative-space' ref={negativeSpace} />
                  <div dangerouslySetInnerHTML={{ __html: project?.content }} />
                </div>
              )}
            </div>

            {/* Project Model */}
            <div className='relative my-4 flex h-[40vh] w-[100vw] -translate-x-12 items-center justify-center text-center md:min-h-[65vh] md:w-3/4 md:translate-x-0 md:p-0'>
              <div className='h-full w-full overflow-hidden'>
                <ModelViewer
                  fileUrl={
                    project?.projectFields?.projectModel?.mediaItemUrl || null
                  }
                  theme={theme}
                />
              </div>

              {theme == 'light' ? (
                <DarkRotate className='absolute right-0 top-0 h-20 w-20 md:right-0 md:top-auto md:h-24 md:w-24 ' />
              ) : (
                <LightRotate className='absolute right-0 top-0 h-20 w-20 md:right-0 md:top-auto md:h-24 md:w-24 ' />
              )}
            </div>

            {/* Desktop Project Primary Info (minus) description */}
            <div className='flex flex-col gap-8 md:hidden'>
              <Link href='/projects'>
                {theme == 'light' ? (
                  <DarkArrow className='h-10 w-10 ' />
                ) : (
                  <LightArrow className='h-10 w-10 ' />
                )}
              </Link>

              <h1 className='-mb-4 border-l border-current pl-4 text-current'>
                {project?.title}
              </h1>

              {project?.projectFields?.locationInformation && (
                <div className='project-description border-l border-current pl-4 text-current'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: project?.projectFields?.locationInformation,
                    }}
                  />
                </div>
              )}

              {project?.projectFields?.architectsInformation && (
                <div className='project-description border-l border-current pl-4 text-current'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: project?.projectFields?.architectsInformation,
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Down Arrow */}
          {theme == 'light' ? (
            <DownChevDark className='right-0 mt-10 hidden h-6 w-6 md:block' />
          ) : (
            <DownChevLight className='right-0 mt-10 hidden h-6 w-6 md:block' />
          )}

          {/* Gallery */}
          <div id='gallery' className='mt-24 w-full md:mt-40'>
            <h2 className='mb-4 text-3xl font-normal text-current'>Gallery</h2>

            <div className='grid w-full grid-cols-2 gap-2 md:grid-cols-6 md:gap-5'>
              {mediaUrls.map((item, index) => (
                <div
                  key={`image-${index}`}
                  onClick={() => openModal(index)}
                  className='relative aspect-square w-full cursor-pointer'
                >
                  {item.mediaType === 'image' ? (
                    <Image
                      src={item.mediaUrl || ''}
                      fill
                      className='object-cover'
                      alt='Gallery Image'
                    />
                  ) : (
                    <div className='flex aspect-square w-full items-center justify-center'>
                      <video
                        poster={item.coverImage || ''}
                        preload='metadata'
                        className='aspect-square w-full bg-stone-700 object-cover'
                      >
                        <source src={item.mediaUrl || ''} type='video/mp4' />
                      </video>
                      <Play className='absolute h-16 w-16 ' />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Project Images Modal */}
          {modalVisible && (
            <MediaModal
              mediaUrls={
                (mediaUrls || []) // Sanitize the array before passing it in
                  .filter((item) => item.mediaUrl)
                  .map((item) => ({
                    mediaUrl: item.mediaUrl || '',
                    mediaType: item.mediaType || '',
                    coverImage: item.mediaType || '',
                  })) as {
                  mediaUrl: string;
                  mediaType: string;
                  coverImage: string;
                }[]
              }
              currentMediaIndex={currentMediaIndex}
              setCurrentMediaIndex={setCurrentMediaIndex}
              onClose={closeModal}
              onPrev={goToPrevImage}
              onNext={goToNextImage}
              theme={theme}
            />
          )}
        </motion.div>
      </main>
    </Layout>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: ProjectRoutesDocument,
  });

  const paths = data.projects.edges.map(
    (edge: RootQueryToProjectConnectionEdge) => ({
      params: { slug: edge.node.slug },
    })
  );

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  const { data: projectData } = await client.query({
    query: ProjectDataDocument,
    variables: {
      slug: slug,
    },
  });

  const { data: socials } = await client.query({
    query: FooterSocialsDocument,
  });

  return {
    props: {
      projectData,
      socials,
    },
  };
};
