import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';

import CalculatorResult from '@/components/CalculatorResult';
import DropupSelect from '@/components/DropupSelect';

import { CalculatorConstantsQuery } from '@/queries/generated-queries';

import DarkClose from '~/svg/close-dark.svg';
import LightClose from '~/svg/close-light.svg';

interface ComponentProps {
  theme: string;
  pageData: CalculatorConstantsQuery;
  setIsCalculatorOpen: (status: boolean) => void;
}

export default function MobileMenu({
  theme,
  pageData,
  setIsCalculatorOpen,
}: ComponentProps) {
  const [activeType, setActiveType] = useState('residential');
  const [area, setArea] = useState(8000);
  const [inputValues, setInputValues] = useState({
    gfa: 2000,
    floors: 3,
  });
  const nonResidentialCoefficient =
    pageData.pageBy?.calculatorFields?.residentialConstants
      ?.nonResidentialCoefficient || 1;

  const [conceptEstimate, setConceptEstimate] = useState(0);
  const [schematicEstimate, setSchematicEstimate] = useState(0);
  const [detailEstimate, setDetailEstimate] = useState(0);
  const [interiorEstimate, setInteriorEstimate] = useState(0);
  const [conceptChecked, setConceptChecked] = useState(true);
  const [schematicChecked, setSchematicChecked] = useState(false);
  const [detailChecked, setDetailChecked] = useState(false);
  const [interiorChecked, setInteriorChecked] = useState(false);

  const constants = useMemo(() => {
    return {
      financialRates: {
        hourlySalary:
          pageData.pageBy?.calculatorFields?.financialRates?.hourlySalary,
        overheadCoefficient:
          pageData.pageBy?.calculatorFields?.financialRates
            ?.overheadCoefficient,
      },
      residential: {
        conceptDesign:
          pageData.pageBy?.calculatorFields?.residentialConstants
            ?.conceptDesign,
        schematicDesign:
          pageData.pageBy?.calculatorFields?.residentialConstants
            ?.schematicDesign,
        detailDesign:
          pageData.pageBy?.calculatorFields?.residentialConstants?.detailDesign,
        interiorDesign:
          pageData.pageBy?.calculatorFields?.residentialConstants
            ?.interiorDesign,
        areaCoefficient:
          1 -
          (inputValues.gfa *
            (pageData.pageBy?.calculatorFields?.residentialConstants
              ?.areaCoefficient || 0.0045)) /
            100,
      },
      nonResidential: {
        conceptDesign:
          (pageData.pageBy?.calculatorFields?.residentialConstants
            ?.conceptDesign || 1) * nonResidentialCoefficient,
        schematicDesign:
          (pageData.pageBy?.calculatorFields?.residentialConstants
            ?.schematicDesign || 1) * nonResidentialCoefficient,
        detailDesign:
          (pageData.pageBy?.calculatorFields?.residentialConstants
            ?.detailDesign || 1) * nonResidentialCoefficient,
        interiorDesign:
          (pageData.pageBy?.calculatorFields?.residentialConstants
            ?.interiorDesign || 1) * nonResidentialCoefficient,
        areaCoefficient:
          1 -
          (inputValues.gfa *
            (pageData.pageBy?.calculatorFields?.residentialConstants
              ?.areaCoefficient || 0.0045)) /
            100,
      },
      villa: {
        conceptDesign:
          pageData.pageBy?.calculatorFields?.villaConstants?.conceptDesign,
        schematicDesign:
          pageData.pageBy?.calculatorFields?.villaConstants?.schematicDesign,
        detailDesign:
          pageData.pageBy?.calculatorFields?.villaConstants?.detailDesign,
        interiorDesign:
          pageData.pageBy?.calculatorFields?.villaConstants?.interiorDesign,
        areaCoefficient:
          1 -
          (inputValues.gfa *
            (pageData.pageBy?.calculatorFields?.villaConstants
              ?.areaCoefficient || 0.023)) /
            100,
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValues]) as {
    [key: string]: {
      hourlySalary?: number;
      overheadCoefficient?: number;
      conceptDesign?: number;
      detailDesign?: number;
      interiorDesign?: number;
      schematicDesign?: number;
      areaCoefficient?: number;
    };
  };

  // Update estimates when inputValues change
  useEffect(() => {
    if (activeType == 'residential' || activeType == 'nonResidential') {
      if (inputValues.gfa < 1000) {
        setConceptEstimate(
          1000 *
            (constants[activeType].conceptDesign || 1) *
            (constants.financialRates.hourlySalary || 1) *
            (constants.financialRates.overheadCoefficient || 1) *
            (1 + inputValues.floors * 0.002) *
            (constants[activeType].areaCoefficient || 1) *
            (1 - (1000 - inputValues.gfa) / 10000)
        );
        setSchematicEstimate(
          1000 *
            (constants[activeType].schematicDesign || 1) *
            (constants.financialRates.hourlySalary || 1) *
            (constants.financialRates.overheadCoefficient || 1) *
            (1 + inputValues.floors * 0.002) *
            (constants[activeType].areaCoefficient || 1) *
            (1 - (1000 - inputValues.gfa) / 10000)
        );
        setDetailEstimate(
          1000 *
            (constants[activeType].detailDesign || 1) *
            (constants.financialRates.hourlySalary || 1) *
            (constants.financialRates.overheadCoefficient || 1) *
            (1 + inputValues.floors * 0.002) *
            (constants[activeType].areaCoefficient || 1) *
            (1 - (1000 - inputValues.gfa) / 10000)
        );
        setInteriorEstimate(
          1000 *
            (constants[activeType].interiorDesign || 1) *
            (constants.financialRates.hourlySalary || 1) *
            (constants.financialRates.overheadCoefficient || 1) *
            (1 + inputValues.floors * 0.002) *
            (constants[activeType].areaCoefficient || 1) *
            (1 - (1000 - inputValues.gfa) / 10000)
        );
      } else if (inputValues.gfa > 10000) {
        setConceptEstimate(
          inputValues.gfa *
            (constants[activeType].conceptDesign || 1) *
            (constants.financialRates.hourlySalary || 1) *
            (constants.financialRates.overheadCoefficient || 1) *
            (1 + inputValues.floors * 0.002) *
            0.55
        );
        setSchematicEstimate(
          inputValues.gfa *
            (constants[activeType].schematicDesign || 1) *
            (constants.financialRates.hourlySalary || 1) *
            (constants.financialRates.overheadCoefficient || 1) *
            (1 + inputValues.floors * 0.002) *
            0.55
        );
        setDetailEstimate(
          inputValues.gfa *
            (constants[activeType].detailDesign || 1) *
            (constants.financialRates.hourlySalary || 1) *
            (constants.financialRates.overheadCoefficient || 1) *
            (1 + inputValues.floors * 0.002) *
            0.55
        );
        setInteriorEstimate(
          inputValues.gfa *
            (constants[activeType].interiorDesign || 1) *
            (constants.financialRates.hourlySalary || 1) *
            (constants.financialRates.overheadCoefficient || 1) *
            (1 + inputValues.floors * 0.002) *
            0.55
        );
      } else {
        setConceptEstimate(
          inputValues.gfa *
            (constants[activeType].conceptDesign || 1) *
            (constants.financialRates.hourlySalary || 1) *
            (constants.financialRates.overheadCoefficient || 1) *
            (1 + inputValues.floors * 0.002) *
            (constants[activeType].areaCoefficient || 1)
        );
        setSchematicEstimate(
          inputValues.gfa *
            (constants[activeType].schematicDesign || 1) *
            (constants.financialRates.hourlySalary || 1) *
            (constants.financialRates.overheadCoefficient || 1) *
            (1 + inputValues.floors * 0.002) *
            (constants[activeType].areaCoefficient || 1)
        );
        setDetailEstimate(
          inputValues.gfa *
            (constants[activeType].detailDesign || 1) *
            (constants.financialRates.hourlySalary || 1) *
            (constants.financialRates.overheadCoefficient || 1) *
            (1 + inputValues.floors * 0.002) *
            (constants[activeType].areaCoefficient || 1)
        );
        setInteriorEstimate(
          inputValues.gfa *
            (constants[activeType].interiorDesign || 1) *
            (constants.financialRates.hourlySalary || 1) *
            (constants.financialRates.overheadCoefficient || 1) *
            (1 + inputValues.floors * 0.002) *
            (constants[activeType].areaCoefficient || 1)
        );
      }
    } else if (activeType == 'villa') {
      if (inputValues.gfa < 2000) {
        setConceptEstimate(
          inputValues.gfa *
            (constants[activeType].conceptDesign || 1) *
            (constants.financialRates.hourlySalary || 1) *
            (constants.financialRates.overheadCoefficient || 1) *
            (1 + inputValues.floors * 0.002) *
            (constants[activeType].areaCoefficient || 1)
        );
        setSchematicEstimate(
          inputValues.gfa *
            (constants[activeType].schematicDesign || 1) *
            (constants.financialRates.hourlySalary || 1) *
            (constants.financialRates.overheadCoefficient || 1) *
            (1 + inputValues.floors * 0.002) *
            (constants[activeType].areaCoefficient || 1)
        );
        setDetailEstimate(
          inputValues.gfa *
            (constants[activeType].detailDesign || 1) *
            (constants.financialRates.hourlySalary || 1) *
            (constants.financialRates.overheadCoefficient || 1) *
            (1 + inputValues.floors * 0.002) *
            (constants[activeType].areaCoefficient || 1)
        );
        setInteriorEstimate(
          inputValues.gfa *
            (constants[activeType].interiorDesign || 1) *
            (constants.financialRates.hourlySalary || 1) *
            (constants.financialRates.overheadCoefficient || 1) *
            (1 + inputValues.floors * 0.002) *
            (constants[activeType].areaCoefficient || 1)
        );
      } else {
        setConceptEstimate(
          inputValues.gfa *
            (constants[activeType].conceptDesign || 1) *
            (constants.financialRates.hourlySalary || 1) *
            (constants.financialRates.overheadCoefficient || 1) *
            (1 + inputValues.floors * 0.002) *
            0.5
        );
        setSchematicEstimate(
          inputValues.gfa *
            (constants[activeType].schematicDesign || 1) *
            (constants.financialRates.hourlySalary || 1) *
            (constants.financialRates.overheadCoefficient || 1) *
            (1 + inputValues.floors * 0.002) *
            0.5
        );
        setDetailEstimate(
          inputValues.gfa *
            (constants[activeType].detailDesign || 1) *
            (constants.financialRates.hourlySalary || 1) *
            (constants.financialRates.overheadCoefficient || 1) *
            (1 + inputValues.floors * 0.002) *
            0.5
        );
        setInteriorEstimate(
          inputValues.gfa *
            (constants[activeType].interiorDesign || 1) *
            (constants.financialRates.hourlySalary || 1) *
            (constants.financialRates.overheadCoefficient || 1) *
            (1 + inputValues.floors * 0.002) *
            0.5
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValues, activeType]);

  return (
    <motion.div
      className={`fixed right-0 top-10 z-50 flex h-[100vh] w-[100vw] -translate-y-10 flex-col items-center justify-start overflow-scroll px-16 pb-48 pt-12 md:absolute md:bottom-0
                  md:top-auto md:h-[90vh] md:w-[50vw] md:-translate-y-0 md:gap-11 md:pb-14 md:pr-24 md:pt-14
                  ${
                    theme == 'light'
                      ? 'bg-customDarkBlue text-customGray'
                      : 'bg-customGray text-customDarkBlue'
                  }`}
      key='mobile-menu'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        ease: 'easeInOut',
        duration: 0.3,
      }}
    >
      <div className='m-auto flex h-fit w-full flex-col gap-8'>
        {/* Mobile Menu Toggle */}
        {theme == 'light' ? (
          <LightClose
            className=' absolute right-12 h-7 w-7 cursor-pointer md:top-14'
            onClick={() => setIsCalculatorOpen(false)}
          />
        ) : (
          <DarkClose
            className=' absolute right-12 h-7 w-7 cursor-pointer md:top-14'
            onClick={() => setIsCalculatorOpen(false)}
          />
        )}

        {/* Inputs – first row */}
        <h3 className='text-xl font-normal'>Approximate Fee Estimation</h3>

        <div className='mt-2 flex h-fit w-full gap-6'>
          {/* Project Type */}
          <div className='w-full md:w-5/12'>
            <DropupSelect
              theme={theme}
              options={['Residential', 'Non-Residential', 'Villa']}
              values={['residential', 'nonResidential', 'villa']}
              setActiveType={setActiveType}
            />
          </div>
          <div className='hidden w-5/12 md:block' />
          <div className='hidden w-2/12 md:block' />
        </div>

        {/* Inputs – second row */}
        <div className='mt-2 flex h-fit w-full flex-col gap-10 md:flex-row md:gap-6'>
          {/* Land Area */}
          <div className='relative w-full md:w-5/12'>
            <p className='absolute -top-[1.45rem] left-[.075rem] text-xs'>
              Land Area (sqm)
            </p>
            <input
              type='text'
              placeholder={`${area || 0}`}
              onChange={(event) => setArea(parseInt(event.target.value))}
              className={`w-full border-2 ${
                theme == 'light'
                  ? 'bg-customGray text-customDarkBlue placeholder:text-customDarkBlue/50 border-customGray'
                  : 'bg-customDarkBlue text-customGray placeholder:text-customGray/50 border-customDarkBlue'
              }`}
              pattern='[0-9]*'
            />
          </div>

          {/* Gross Floor Area */}
          <div className='relative w-full md:w-5/12'>
            <p className='absolute -top-[1.45rem] left-[.075rem] text-xs'>
              Gross Floor Area (sqm)
            </p>
            <input
              type='text'
              placeholder={`${inputValues.gfa || 0}`}
              onChange={(event) =>
                setInputValues((prevInputValues) => ({
                  ...prevInputValues,
                  gfa: parseInt(event.target.value),
                }))
              }
              className={`placeholder:text- w-full border-2 ${
                theme == 'light'
                  ? 'bg-customGray text-customDarkBlue placeholder:text-customDarkBlue/50 border-customGray'
                  : 'bg-customDarkBlue text-customGray placeholder:text-customGray/50 border-customDarkBlue'
              }`}
              pattern='[0-9]*'
            />
          </div>

          {/* Floors */}
          <div className='relative w-full md:w-2/12'>
            <p className='absolute -top-[1.45rem] left-[.075rem] text-xs'>
              Floors
            </p>
            <input
              type='text'
              placeholder={`${inputValues.floors || 0}`}
              onChange={(event) =>
                setInputValues((prevInputValues) => ({
                  ...prevInputValues,
                  floors: parseInt(event.target.value),
                }))
              }
              className={`w-full border-2 ${
                theme == 'light'
                  ? 'bg-customGray text-customDarkBlue placeholder:text-customDarkBlue/50 border-customGray'
                  : 'bg-customDarkBlue text-customGray placeholder:text-customGray/50 border-customDarkBlue'
              }`}
              pattern='[0-9]*'
            />
          </div>
        </div>

        {/* Inputs – second row */}
        <div className='flex h-fit w-full flex-col gap-3'>
          <p className='left-[.075rem] text-xs'>What Do You Need?</p>
          <CalculatorResult
            theme={theme}
            title='Concept Design'
            result={conceptEstimate || 6075}
            setCheckState={setConceptChecked}
            checked
          />
          <CalculatorResult
            theme={theme}
            title='Schematic Design'
            result={schematicEstimate || 4050}
            setCheckState={setSchematicChecked}
          />
          <CalculatorResult
            theme={theme}
            title='Detail Design'
            result={detailEstimate || 8910}
            setCheckState={setDetailChecked}
          />
          <CalculatorResult
            theme={theme}
            title='Interior Design'
            result={interiorEstimate || 8910}
            setCheckState={setInteriorChecked}
          />
        </div>

        {/* Total */}
        <p
          className={`left-[.075rem] flex w-full items-center justify-center border-2 py-3 text-center text-lg
                    ${
                      theme == 'light'
                        ? 'bg-customGray text-customDarkBlue border-customGray'
                        : 'bg-customDarkBlue text-customGray border-customDarkBlue'
                    }`}
        >
          Total {'>'} $
          {parseFloat(
            (
              (conceptChecked ? conceptEstimate || 6075 : 0) +
              (interiorChecked ? interiorEstimate || 4050 : 0) +
              (schematicChecked ? schematicEstimate || 8910 : 0) +
              (detailChecked ? detailEstimate || 8910 : 0)
            ).toFixed(0)
          ).toLocaleString('en-US')}
        </p>
      </div>
    </motion.div>
  );
}
