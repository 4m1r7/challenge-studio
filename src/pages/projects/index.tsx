import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { useMemo, useState } from 'react';

import client from '@/lib/apolloClient';

import FilterComponent from '@/components/ExpandableFilter';
import Layout from '@/components/layout/Layout';
import MobileFilters from '@/components/MobileFilters';
import Seo from '@/components/Seo';

import {
  AllProjectsDocument,
  AllProjectsQuery,
  FooterSocialsDocument,
  FooterSocialsQuery,
  ProjectsPageDocument,
  ProjectsPageQuery,
} from '@/queries/generated-queries';
import { useTheme } from '@/ThemeContext';

import DarkOpenFilters from '~/svg/down-chev-dark.svg';
import LightOpenFilters from '~/svg/down-chev-light.svg';

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

// Setting the order based on index positions
const filterOrderIndex = [3, 4, 1, 2];

interface ProjectsProps {
  pageData: ProjectsPageQuery;
  data: AllProjectsQuery;
  socials: FooterSocialsQuery;
}

export default function Projects({ pageData, data, socials }: ProjectsProps) {
  // clean up the projects array & footer socials before use
  const projects = useMemo(() => data?.projects?.edges, [data]);
  const SocialLinksData = socials.pageBy?.contactPageFields?.socialMedia;

  // light/dark themeheme context
  const { theme, toggleTheme } = useTheme();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // create filter options object and populate it
  const filterOptions: Record<string, string[]> = {};
  projects?.forEach((item) => {
    const { projectFields } = item.node;

    if (projectFields) {
      Object.keys(projectFields).forEach((filterType) => {
        if (!filterType.startsWith('__')) {
          if (!filterOptions[filterType]) {
            filterOptions[filterType] = [];
          }

          const filterValue =
            projectFields[filterType as keyof typeof projectFields];

          if (Array.isArray(filterValue)) {
            // If it's an array, iterate through its values
            filterValue.forEach((value) => {
              if (!filterOptions[filterType].includes(value as string)) {
                filterOptions[filterType].push(value as string);
              }
            });
          } else {
            // If it's a single value, add it as before
            if (!filterOptions[filterType].includes(filterValue as string)) {
              filterOptions[filterType].push(filterValue as string);
            }
          }
        }
      });
    }
  });
  // Change the year filter options to sort based on year
  filterOptions['year'] = ['newest', 'oldest'];

  const [sortBy, setSortBy] = useState<string | null>(null);
  // Create active filters state and set the initial state with all filter types set to null
  const [activeFilters, setActiveFilters] = useState<
    Record<string, string | number | null>
  >(() => {
    const initiAlactiveFilters: Record<string, string | number | null> = {};

    for (const filterType in filterOptions) {
      initiAlactiveFilters[filterType] = null;
    }

    return initiAlactiveFilters;
  });

  // Handle filter click
  const handleFilterChange = (
    filterType: string,
    filterValue: string | null
  ) => {
    const updatedFilters = { ...activeFilters };

    updatedFilters[filterType] = filterValue;

    setActiveFilters(updatedFilters);
  };

  // Handle newest/oldest year sort change
  const handleSortChange = (filterValue: string | null) => {
    if (filterValue) {
      setSortBy(filterValue);
    } else {
      setSortBy(null);
    }
  };

  // Clear filters
  const clearFilters = () => {
    setActiveFilters((prevFilters) => {
      // Create a copy of the previous filters with all values set to null
      const inactiveFilters = { ...prevFilters };
      for (const filterType in inactiveFilters) {
        inactiveFilters[filterType] = null;
      }
      return inactiveFilters;
    });
  };

  return (
    <Layout
      theme={theme}
      toggleTheme={toggleTheme}
      SocialLinksData={SocialLinksData}
    >
      <Seo templateTitle='Projects' />

      <main
        className={`flex flex-grow flex-col items-center justify-start px-12
                    ${
                      theme == 'light' ? 'bg-customGray' : 'bg-customDarkBlue'
                    } `}
      >
        <motion.div
          className='flex h-full w-full flex-col items-end pt-3 md:flex-row md:items-stretch md:pt-10'
          style={{}}
          key='projects'
          variants={mainComponent}
          initial='hidden'
          animate='enter'
          exit='exit'
        >
          {/* Mobile Filters Toggle */}
          <div
            className='mb-10 flex cursor-pointer items-center gap-3 md:hidden'
            onClick={() => setIsFiltersOpen(true)}
          >
            {theme == 'light' ? (
              <DarkOpenFilters className='h-5 w-5 rotate-90' />
            ) : (
              <LightOpenFilters className='h-5 w-5 rotate-90' />
            )}
            <p
              className={`text-lg ${
                theme == 'light' ? 'text-customDarkBlue' : 'text-customGray'
              } `}
            >
              Filters
            </p>
          </div>

          {/* Projects filters */}
          <div className='relative hidden min-h-[65vh] w-[12%] flex-col justify-between pl-4 md:flex'>
            <div className='flex flex-col'>
              {/* Sorting the filter option type based on arbitrary filterOrderIndex array then rendering them */}
              {filterOrderIndex
                .map((index) => Object.entries(filterOptions)[index - 1])
                .map(([filterType, filterValues]) => (
                  <FilterComponent
                    key={filterType}
                    filterType={filterType}
                    filterValues={filterValues}
                    activeFilter={activeFilters[filterType]}
                    sortBy={sortBy}
                    onFilterChange={handleFilterChange}
                    onYearSort={handleSortChange}
                    theme={theme}
                  />
                ))}

              <span
                onClick={clearFilters}
                className={`mt-8 cursor-pointer text-xs duration-200
                          ${
                            theme == 'light'
                              ? 'text-red-900/75  hover:text-red-900'
                              : 'text-red-400/75  hover:text-red-400'
                          }
                          ${
                            Object.values(activeFilters).every(
                              (value) => value === null
                            )
                              ? 'pointer-events-none opacity-0'
                              : 'opacity-1'
                          }`}
              >
                clear filters
              </span>
            </div>

            {/* Portfolio download link */}
            {pageData.pageBy?.projectsPageFields?.portfolioFile
              ?.mediaItemUrl && (
              <a
                download
                target='_blank'
                href={
                  pageData.pageBy?.projectsPageFields?.portfolioFile
                    ?.mediaItemUrl
                }
                className={` sticky bottom-10 left-0 hidden -translate-x-5 text-base md:block
                          ${
                            theme == 'light'
                              ? 'text-customDarkBlue'
                              : 'text-customGray'
                          }`}
              >
                Download Our <p className='text-lg font-bold'>Portfolio</p>
              </a>
            )}
          </div>

          {/* Projects grid */}
          <div className='grid h-fit w-full grid-cols-1 gap-8 md:w-[88%] md:grid-cols-5 md:gap-4'>
            <AnimatePresence mode='wait'>
              {projects &&
                projects
                  // Filter projects based on chosen filters
                  .filter((item) => {
                    const { projectFields } = item.node;

                    // Check if projectFields is not null or undefined
                    if (projectFields) {
                      const filterConditions = Object.keys(activeFilters).map(
                        (filterType) => {
                          const filterValue = activeFilters[filterType];

                          if (filterValue !== null) {
                            // Check if filterValue is in the projectFields.type array
                            if (
                              filterType === 'type' &&
                              Array.isArray(projectFields.type)
                            ) {
                              return projectFields.type.includes(
                                filterValue as string
                              );
                            }
                            return (
                              projectFields?.[
                                filterType as keyof typeof projectFields
                              ] === filterValue
                            );
                          }

                          return true;
                        }
                      );
                      // Check if all filter conditions are true (logical AND)
                      return filterConditions.every((condition) => condition);
                    }

                    return false; // Exclude projects with null or undefined projectFields
                  })
                  .sort(
                    sortBy === null
                      ? () => 0
                      : (a, b) => {
                          const yearA = a.node.projectFields?.year || 0;
                          const yearB = b.node.projectFields?.year || 0;
                          return sortBy == 'oldest'
                            ? yearA - yearB
                            : yearB - yearA;
                        }
                  )
                  .map((item) => {
                    return (
                      <motion.div
                        key={item.node.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          ease: 'easeOut',
                          duration: 0.25,
                        }}
                      >
                        <Link href={item.node.uri || ''} className='group'>
                          <div className='relative aspect-square'>
                            <Image
                              src={
                                item.node.featuredImage?.node.sourceUrl || ''
                              }
                              alt={item.node.title || 'project-image'}
                              className='object-cover'
                              fill
                              quality={100}
                            />

                            {/* Desktop Overlay */}
                            <div className='bg-customDarkBlue/50 absolute inset-0 hidden p-4 text-left opacity-0 mix-blend-multiply transition duration-300 group-hover:opacity-100 md:flex' />

                            {/* Desktop Title & year */}
                            <div className='text-customGray absolute inset-0 hidden flex-col p-4 text-left opacity-0 transition duration-300 group-hover:opacity-100 md:flex'>
                              <p className='text-lg font-bold text-current'>
                                {item.node.title}
                              </p>
                              <p className=' text-xl text-current'>
                                –<br />
                                {item.node.projectFields?.year}
                              </p>
                            </div>
                          </div>

                          {/* Mobile Title & year */}
                          <p
                            className={` py-1 text-left text-lg font-light md:hidden
                                  ${
                                    theme == 'light'
                                      ? 'text-customDarkBlue'
                                      : 'text-customGray'
                                  } `}
                          >
                            {item.node.title}
                          </p>
                        </Link>
                      </motion.div>
                    );
                  })}
            </AnimatePresence>
          </div>
        </motion.div>

        <AnimatePresence>
          {isFiltersOpen && (
            <MobileFilters
              theme={theme}
              setIsFiltersOpen={setIsFiltersOpen}
              filterOrderIndex={filterOrderIndex}
              filterOptions={filterOptions}
              activeFilters={activeFilters}
              sortBy={sortBy}
              handleFilterChange={handleFilterChange}
              onYearSort={handleSortChange}
              clearFilters={clearFilters}
            />
          )}
        </AnimatePresence>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data: pageData } = await client.query({
    query: ProjectsPageDocument,
  });

  const { data } = await client.query({
    query: AllProjectsDocument,
  });

  const { data: socials } = await client.query({
    query: FooterSocialsDocument,
  });

  return {
    props: {
      pageData,
      data,
      socials,
    },
  };
}
