import { useState } from 'react';

import DownChevDark from '~/svg/down-chev-dark.svg';
import DownChevLight from '~/svg/down-chev-light.svg';

interface DropupSelectProps {
  theme: string;
  options: string[];
  values: string[];
  setActiveType: (type: string) => void;
}

export default function DropupSelect({
  theme,
  options,
  setActiveType,
  values,
}: DropupSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(values[0]);

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setActiveType(option);
    setIsOpen(false);
  };

  return (
    <div
      className={`relative inline-block w-full text-left
                      ${
                        theme == 'light'
                          ? 'bg-customGray text-customDarkBlue'
                          : 'bg-customDarkBlue text-customGray'
                      }`}
    >
      <p
        className={`absolute -top-[1.5rem] text-xs ${
          isOpen ? 'hidden' : 'block'
        } ${theme == 'light' ? 'text-customGray' : 'text-customDarkBlue'}`}
      >
        Type of Building
      </p>
      <ul
        className={`absolute z-20 w-full
                      ${isOpen ? 'block' : 'hidden'}
                      `}
        role='listbox'
        aria-labelledby='options-menu'
      >
        <p
          className={`absolute -top-6 left-0 text-xs ${
            theme == 'light' ? 'text-customGray' : 'text-customDarkBlue'
          }`}
        >
          Type of Building
        </p>
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => selectOption(values[index])}
            className={`relative cursor-pointer select-none p-3 text-sm
                          ${
                            theme == 'light'
                              ? 'bg-customGray text-customDarkBlue'
                              : 'bg-customDarkBlue text-customGray'
                          }`}
          >
            {option}
          </li>
        ))}
      </ul>

      <button
        onClick={() => setIsOpen(true)}
        type='button'
        className='inline-flex w-full items-center justify-between border-0 p-3 text-sm focus:outline-none'
        id='options-menu'
      >
        {theme == 'light' ? (
          <DownChevDark className='absolute right-3 h-4 w-4' />
        ) : (
          <DownChevLight className='absolute right-3 h-4 w-4' />
        )}
        {options[values.indexOf(selectedOption)]}
      </button>
    </div>
  );
}
