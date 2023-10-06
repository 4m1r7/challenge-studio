import React, { useState } from 'react';

import DarkClose from '~/svg/filter-close-dark.svg';
import LightClose from '~/svg/filter-close-light.svg';
import DarkOpen from '~/svg/filter-open-dark.svg';
import LightOpen from '~/svg/filter-open-light.svg';

interface FilterProps {
  theme: string;
  filterType: string;
  filterValues: string[];
  activeFilter: string | number | null;
  onFilterChange: (filterType: string, filterValue: string | null) => void;
}

export default function FilterComponent({
  theme,
  filterType,
  filterValues,
  activeFilter,
  onFilterChange,
}: FilterProps) {
  const [showFilterValues, setShowFilterValues] = useState(false);

  const toggleFilterValues = () => {
    setShowFilterValues(!showFilterValues);
  };

  return (
    <div
      className={`relative mb-3
                    ${
                      theme == 'light'
                        ? 'text-customDarkBlue'
                        : 'text-customGray'
                    }`}
    >
      <div className='cursor-pointer' onClick={toggleFilterValues}>
        <div className='hidden md:block'>
          {showFilterValues ? (
            theme == 'light' ? (
              <DarkOpen className='absolute -left-5 top-2 h-3 w-3' />
            ) : (
              <LightClose className='absolute -left-5 top-2 h-3 w-3' />
            )
          ) : theme == 'light' ? (
            <DarkClose className='absolute -left-5 top-2 h-3 w-3' />
          ) : (
            <LightOpen className='absolute -left-5 top-2 h-3 w-3' />
          )}
        </div>

        <p className={`${showFilterValues ? 'font-bold' : 'font-light'}`}>
          {filterType}
        </p>
      </div>

      <ul
        className={`mt-7 flex flex-col gap-4 text-xl md:mt-0 md:gap-0 md:text-xs ${
          showFilterValues ? 'mb-6 block' : 'hidden'
        }`}
      >
        <li key={`all-${filterType}s`} className='mt-2'>
          <button onClick={() => onFilterChange(filterType, null)}>All</button>
        </li>
        {filterValues
          .slice()
          .sort()
          .reverse()
          .map((filterValue) => (
            <li key={filterValue} className='mt-2 font-light md:font-normal'>
              <button
                className={
                  activeFilter === filterValue ? 'font-bold md:text-base' : ''
                }
                onClick={() => onFilterChange(filterType, filterValue)}
              >
                {filterValue}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
