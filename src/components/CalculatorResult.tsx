import React, { useEffect, useState } from 'react';

import CheckmarkDark from '~/svg/checkmark-dark.svg';
import CheckmarkLight from '~/svg/checkmark-light.svg';

interface CustomToggleProps {
  theme: string;
  title: string;
  result: number;
  checked?: boolean;
  setCheckState: (value: boolean) => void;
}

export default function CalculatorResult({
  theme,
  title,
  result,
  checked,
  setCheckState,
}: CustomToggleProps) {
  const [isChecked, setIsChecked] = useState(checked || false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    setCheckState(isChecked);
  }, [isChecked, setCheckState]);

  return (
    <div
      className={`flex h-fit w-full flex-col gap-1 md:h-12 md:flex-row md:gap-6 ${
        theme === 'light' ? 'text-customGray' : 'text-customDarkBlue'
      }`}
    >
      <div className='flex w-full gap-1 md:w-7/12'>
        <div
          onClick={toggleCheckbox}
          className={`flex h-10 w-12 cursor-pointer items-center justify-center md:h-full
                      ${
                        theme === 'light'
                          ? isChecked
                            ? 'bg-customGray'
                            : 'border-customGray bg-customDarkBlue border '
                          : isChecked
                          ? 'bg-customDarkBlue'
                          : 'border-customDarkBlue bg-customGray border'
                      }`}
        >
          {theme == 'light' ? (
            <CheckmarkDark className='h-[50%] w-[50%]' />
          ) : (
            <CheckmarkLight className='h-[50%] w-[50%]' />
          )}
        </div>

        <p
          className={`flex flex-grow cursor-default items-center justify-center
                      ${
                        theme === 'light'
                          ? isChecked
                            ? 'bg-customGray text-customDarkBlue'
                            : 'border-customGray bg-customDarkBlue border '
                          : isChecked
                          ? 'bg-customDarkBlue text-customGray'
                          : 'border-customDarkBlue bg-customGray border'
                      }`}
        >
          {title}
        </p>
      </div>

      <div
        className={`w-full cursor-default md:h-full md:w-5/12
                      ${isChecked ? 'h-10' : ''}`}
      >
        {isChecked && (
          <p
            className={`flex h-full items-center justify-end px-6 text-base font-light md:justify-start
                      ${
                        theme === 'light'
                          ? 'bg-customGray text-customDarkBlue'
                          : 'bg-customDarkBlue text-customGray'
                      }`}
          >
            $ {parseFloat(result.toFixed(0)).toLocaleString('en-US')}
          </p>
        )}
      </div>
    </div>
  );
}
