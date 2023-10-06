import React from 'react';

import styles from './TheCube.module.css';

interface CubeProps {
  cursorLocation: { x: number; y: number };
  theme: string;
  mobileVersion?: boolean;
}

const Cube = ({ cursorLocation, theme, mobileVersion }: CubeProps) => {
  return (
    <>
      <div
        className={`${styles.scene} ${
          mobileVersion ? 'md:hidden' : 'hidden md:flex'
        } `}
        style={{
          transform: `${
            mobileVersion
              ? ''
              : `rotateX(${-cursorLocation.y * 45}deg) rotateY(${
                  cursorLocation.x * 45
                }deg)`
          }`,
          transition:
            cursorLocation.x === 0 && cursorLocation.y === 0
              ? '.5s all linear'
              : '0s all linear',
        }}
      >
        <div
          className={`${styles.cube} ${
            theme == 'light' ? 'text-customDarkBlue' : 'text-customGray'
          } `}
        >
          <div
            className={`${styles.cubeFace} ${styles.cubeFaceFront}`}
            style={{
              border: `solid 1px ${theme == 'light' ? '#004071' : '#e4e4e4'}`,
              backgroundColor: `${theme == 'light' ? '#e4e4e4' : '#004071'}`,
            }}
          />

          <div
            className={`${styles.cubeFace} ${styles.cubeFaceBack}`}
            style={{
              border: `solid 1px ${theme == 'light' ? '#004071' : '#e4e4e4'}`,
              backgroundColor: `${theme == 'light' ? '#e4e4e4' : '#004071'}`,
            }}
          />

          <div
            className={`${styles.cubeFace} ${styles.cubeFaceRight}`}
            style={{
              border: `solid 1px ${theme == 'light' ? '#004071' : '#e4e4e4'}`,
              backgroundColor: `${theme == 'light' ? '#e4e4e4' : '#004071'}`,
            }}
          />

          <div
            className={`${styles.cubeFace} ${styles.cubeFaceLeft}`}
            style={{
              border: `solid 1px ${theme == 'light' ? '#004071' : '#e4e4e4'}`,
              backgroundColor: `${theme == 'light' ? '#e4e4e4' : '#004071'}`,
            }}
          />

          <div
            className={`${styles.cubeFace} ${styles.cubeFaceTop}`}
            style={{
              border: `solid 1px ${theme == 'light' ? '#004071' : '#e4e4e4'}`,
              backgroundColor: `${theme == 'light' ? '#e4e4e4' : '#004071'}`,
            }}
          />

          <div
            className={`${styles.cubeFace} ${styles.cubeFaceBottom}`}
            style={{
              border: `solid 1px ${theme == 'light' ? '#004071' : '#e4e4e4'}`,
              backgroundColor: `${theme == 'light' ? '#e4e4e4' : '#004071'}`,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Cube;
