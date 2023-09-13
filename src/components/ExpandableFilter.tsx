import React, { useState } from 'react';

import DarkClose from '~/svg/filter-close-dark.svg';
import LightClose from '~/svg/filter-close-light.svg';
import DarkOpen from '~/svg/filter-open-dark.svg';
import LightOpen from '~/svg/filter-open-light.svg';

interface FilterProps {
  filterType: string;
  filterValues: string[];
  activeFilter: string | number | null;
  onFilterChange: (filterType: string, filterValue: string | null) => void;
  theme: string;
}

export default function FilterComponent({
  filterType,
  filterValues,
  activeFilter,
  onFilterChange,
  theme,
}: FilterProps) {
  const [showFilterValues, setShowFilterValues] = useState(false);

  const toggleFilterValues = () => {
    setShowFilterValues(!showFilterValues);
  };

  return (
    <div
      className={`text-customDarkBlue relative mb-3
                    ${
                      theme == 'light'
                        ? 'text-customDarkBlue'
                        : 'text-customGray'
                    }`}
    >
      <div className='cursor-pointer' onClick={toggleFilterValues}>
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

        <p className={`${showFilterValues ? 'font-bold' : 'font-light'}`}>
          {filterType}
        </p>
      </div>

      <ul className={`text-xs ${showFilterValues ? 'mb-6 block' : 'hidden'}`}>
        <li key={`all-${filterType}s`} className='mt-2'>
          <button onClick={() => onFilterChange(filterType, null)}>All</button>
        </li>
        {filterValues
          .slice()
          .sort()
          .reverse()
          .map((filterValue) => (
            <li key={filterValue} className='mt-2'>
              <button
                className={activeFilter === filterValue ? 'font-bold' : ''}
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
