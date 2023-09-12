import React from 'react';

import styles from './TheCube.module.css';

interface CubeProps {
  cursorLocation: { x: number; y: number };
  theme: string;
}

const Cube = ({ cursorLocation, theme }: CubeProps) => {
  return (
    <>
      <div
        className={styles.scene}
        style={{
          transform: `rotateX(${-cursorLocation.y * 45}deg) rotateY(${
            cursorLocation.x * 45
          }deg)`,
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
