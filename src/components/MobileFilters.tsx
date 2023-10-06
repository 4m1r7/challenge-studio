import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

import FilterComponent from '@/components/ExpandableFilter';

import DarkClose from '~/svg/close-dark.svg';
import LightClose from '~/svg/close-light.svg';
import DarkLogo from '~/svg/logo-dark.svg';
import LightLogo from '~/svg/logo-light.svg';

interface ComponentProps {
  theme: string;
  filterOrderIndex: number[];
  activeFilters: Record<string, string | number | null>;
  filterOptions: Record<string, string[]>;
  setIsFiltersOpen: (status: boolean) => void;
  handleFilterChange: (filterType: string, filterValue: string | null) => void;
  clearFilters: () => void;
}

export default function MobileFilters({
  theme,
  filterOrderIndex,
  filterOptions,
  activeFilters,
  setIsFiltersOpen,
  handleFilterChange,
  clearFilters,
}: ComponentProps) {
  return (
    <motion.div
      className={`fixed inset-0 z-50 flex flex-col items-center gap-28 overflow-scroll md:flex-row
                  ${theme == 'light' ? 'bg-customGray' : 'bg-customDarkBlue'} `}
      key='mobile-menu'
      initial={{ x: '100vw' }}
      animate={{ x: '0' }}
      exit={{ x: '100vw' }}
      transition={{
        ease: 'easeInOut',
        duration: 0.5,
      }}
    >
      {/* Menu Header */}
      <div className='flex h-20 w-full items-center justify-between gap-6 px-12 pb-3 pt-10'>
        {/* Site Logo */}
        <Link href='/'>
          {theme == 'light' ? (
            <DarkLogo className='plyarn-2 border-customDarkBlue h-9 min-w-[6.75rem] border-l md:h-8 md:min-w-[6rem] ' />
          ) : (
            <LightLogo className='plyarn-2 border-customGray h-9 min-w-[6.75rem] border-l md:h-8 md:min-w-[6rem] ' />
          )}
        </Link>

        {/* Mobile Menu Toggle */}
        {theme == 'light' ? (
          <DarkClose
            className=' h-12 w-6 cursor-pointer md:hidden'
            onClick={() => setIsFiltersOpen(false)}
          />
        ) : (
          <LightClose
            className=' h-12 w-6 cursor-pointer md:hidden'
            onClick={() => setIsFiltersOpen(false)}
          />
        )}
      </div>

      {/* Mobile Projects filters */}
      <div className='flex w-full flex-col gap-10 text-center text-4xl'>
        {/* Sorting the filter option type based on arbitrary filterOrderIndex array then rendering them */}
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
          onClick={() => {
            clearFilters();
            setIsFiltersOpen(false);
          }}
          className={`my-8 cursor-pointer text-xs duration-200
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
    </motion.div>
  );
}
