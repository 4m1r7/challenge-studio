import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { useState } from 'react';

import client from '@/lib/apolloClient';

import Layout from '@/components/layout/Layout';
import MediaModal from '@/components/MediaModal';
import ModelViewer from '@/components/ModelViewer';
import Seo from '@/components/Seo';

import {
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

export default function Projects(data: { projectData: ProjectDataQuery }) {
  // clean up the project data before use
  const project = data.projectData.projectBy;

  const mediaUrls = [
    ...(project?.projectFields?.mainVideos || [])
      .map((item) => ({
        mediaUrl: item?.videoItem?.mediaItemUrl,
        mediaType: 'video',
      }))
      .filter((item) => item.mediaUrl),
    ...(project?.projectFields?.projectImages || [])
      .map((item) => ({
        mediaUrl: item?.mediaItemUrl,
        mediaType: 'image',
      }))
      .filter((item) => item.mediaUrl),
    ...(project?.projectFields?.projectVideos || [])
      .map((item) => ({
        mediaUrl: item?.videoItem?.mediaItemUrl,
        mediaType: 'video',
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

  return (
    <Layout theme={theme} toggleTheme={toggleTheme}>
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
          className={`flex h-full w-full flex-col items-center py-10
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
          {/* Top Section */}
          <div className='flex w-full'>
            {/* Project Info */}
            <div className='flex h-full w-1/4 flex-col gap-8'>
              <Link href='/projects'>
                {theme == 'light' ? (
                  <DarkArrow className='h-10 w-10 ' />
                ) : (
                  <LightArrow className='h-10 w-10 ' />
                )}
              </Link>

              <h1 className='border-l border-current pl-4 text-current'>
                {project?.title}
              </h1>

              <div className='border-l border-current pl-4 text-current'>
                <div className='flex'>
                  <p className='mr-3 whitespace-nowrap font-light'>
                    Type {'>'}
                  </p>
                  <div className='flex flex-col'>
                    {project?.projectFields?.type?.map((type) => (
                      <p key={type}>{type}</p>
                    ))}
                  </div>
                </div>
                <div className='flex'>
                  <p className='mr-3 whitespace-nowrap font-light'>
                    Status {'>'}
                  </p>
                  <p>{project?.projectFields?.status}</p>
                </div>
                <div className='flex'>
                  <p className='mr-3 whitespace-nowrap font-light'>
                    Scale {'>'}
                  </p>
                  <p>{project?.projectFields?.scale}</p>
                </div>
                <div className='flex'>
                  <p className='mr-3 whitespace-nowrap font-light'>
                    Year {'>'}
                  </p>
                  <p>{project?.projectFields?.year}</p>
                </div>
              </div>

              {project?.projectFields?.members && (
                <div className='border-l border-current pl-4 text-current'>
                  <p className='font-light'>Architects {'>'}</p>

                  {project.projectFields.members.map((member) => (
                    <Link key={member?.id} href={`/about#${member?.slug}`}>
                      {member?.title}
                    </Link>
                  ))}
                </div>
              )}

              <div
                dangerouslySetInnerHTML={{ __html: project?.content || '' }}
                className='border-l border-current pl-4 text-sm text-current'
              />
            </div>

            {/* Project Model */}
            <div className='relative flex h-full min-h-[65vh] w-3/4 items-center justify-center text-center'>
              {theme == 'light' ? (
                <DarkRotate className='absolute right-0 h-24 w-24 ' />
              ) : (
                <LightRotate className='absolute right-0 h-24 w-24 ' />
              )}
              <ModelViewer
                fileUrl={
                  project?.projectFields?.projectModel?.mediaItemUrl || null
                }
              />
            </div>
          </div>

          <Link href='#gallery' className='mb-40'>
            {theme == 'light' ? (
              <DownChevDark className='right-0 h-6 w-6 ' />
            ) : (
              <DownChevLight className='right-0 h-6 w-6 ' />
            )}
          </Link>

          {/* Gallery */}
          <div id='gallery' className='w-full'>
            <h2 className='mb-4 font-normal text-current'>Gallery</h2>

            <div className='grid w-full grid-cols-6 gap-5'>
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
                        poster={item.mediaUrl || ''}
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
                  })) as { mediaUrl: string; mediaType: string }[]
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

  return {
    props: {
      projectData,
    },
  };
};
