import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { useState } from 'react';

import client from '@/lib/apolloClient';

import FilterComponent from '@/components/ExpandableFilter';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import {
  AllProjectsDocument,
  AllProjectsQuery,
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

// Setting the order based on index positions
const filterOrderIndex = [3, 4, 1, 2];

export default function Projects(data: { data: AllProjectsQuery }) {
  // clean up the project array before use
  const projects = data?.data?.projects?.edges;

  // light/dark themeheme context
  const { theme, toggleTheme } = useTheme();

  // create filter options object and populate it
  const filterOptions: Record<string, string[]> = {};
  projects?.forEach((item) => {
    const { projectFields } = item.node;

    if (projectFields) {
      // Iterate through the keys in projectFields
      Object.keys(projectFields).forEach((filterType) => {
        // Exclude keys that start with '__'
        if (!filterType.startsWith('__')) {
          // add filter type
          if (!filterOptions[filterType]) {
            filterOptions[filterType] = [];
          }
          // add corresponding filter type values
          const filterValue =
            projectFields[filterType as keyof typeof projectFields];
          if (
            filterValue &&
            !filterOptions[filterType].includes(filterValue as string)
          ) {
            filterOptions[filterType].push(filterValue as string);
          }
        }
      });
    }
  });

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
    <Layout theme={theme} toggleTheme={toggleTheme}>
      <Seo templateTitle='Projects' />

      <main
        className={`flex flex-grow flex-col items-center justify-start px-12
                        ${
                          theme == 'light'
                            ? 'bg-customGray'
                            : 'bg-customDarkBlue'
                        } `}
      >
        <motion.div
          className='flex h-full w-full pt-10'
          style={{}}
          key='projects'
          variants={mainComponent}
          initial='hidden'
          animate='enter'
          exit='exit'
        >
          {/* Projects filters */}
          <div className='w-[12%] pl-4'>
            {/* Sorting the filter option type based on arbitrary filterOrderIndex array the rendering them */}
            {filterOrderIndex
              .map((index) => Object.entries(filterOptions)[index - 1])
              .map(([filterType, filterValues]) => (
                <FilterComponent
                  key={filterType}
                  filterType={filterType}
                  filterValues={filterValues}
                  activeFilter={activeFilters[filterType]}
                  onFilterChange={handleFilterChange}
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

          {/* Projects grid */}
          <div className='grid h-fit w-[88%] grid-cols-5 gap-4'>
            <AnimatePresence mode='wait'>
              {projects &&
                projects
                  .filter((item) => {
                    // Check if the project matches the selected filters
                    const { projectFields } = item.node;

                    // Build an array of filter conditions
                    const filterConditions = Object.keys(activeFilters).map(
                      (filterType) => {
                        const filterValue = activeFilters[filterType];

                        // Only include the condition if the filter value is not null
                        if (filterValue !== null) {
                          return (
                            projectFields?.[
                              filterType as keyof typeof projectFields
                            ] === filterValue
                          );
                        }
                        return true; // Include the project if the filter value is null
                      }
                    );

                    // Check if all filter conditions are true (logical AND)
                    return filterConditions.every((condition) => condition);
                  })
                  .map((item) => {
                    return (
                      <motion.div
                        key={item.node.id}
                        className='relative aspect-square'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          ease: 'easeOut',
                          duration: 0.5,
                        }}
                      >
                        <Link href={item.node.uri || ''}>
                          <Image
                            src={item.node.featuredImage?.node.sourceUrl || ''}
                            alt={item.node.title || 'project-image'}
                            className='object-cover'
                            fill
                            quality={100}
                          />
                          <div
                            className={`absolute inset-0 p-4 text-left  opacity-0 transition duration-200 hover:opacity-100
                                          ${
                                            theme == 'light'
                                              ? 'text-customGray bg-customDarkBlue/75'
                                              : 'text-customDarkBlue bg-customGray/60'
                                          }`}
                          >
                            <p className=' text-lg font-bold '>
                              {item.node.title}
                            </p>
                            <p className=' text-xl'>
                              –<br />
                              {item.node.projectFields?.year}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: AllProjectsDocument,
  });

  return {
    props: {
      data,
    },
  };
}
