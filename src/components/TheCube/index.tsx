import React from 'react';

import styles from './TheCube.module.css';

interface CubeProps {
  cursorLocation: { x: number; y: number };
}

const Cube = ({ cursorLocation }: CubeProps) => {
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
        <div className={styles.cube}>
          <div className={`${styles.cubeFace} ${styles.cubeFaceFront}`}></div>
          <div className={`${styles.cubeFace} ${styles.cubeFaceBack}`}></div>
          <div className={`${styles.cubeFace} ${styles.cubeFaceRight}`}></div>
          <div className={`${styles.cubeFace} ${styles.cubeFaceLeft}`}></div>
          <div className={`${styles.cubeFace} ${styles.cubeFaceTop}`}></div>
          <div className={`${styles.cubeFace} ${styles.cubeFaceBottom}`}></div>
        </div>
      </div>
    </>
  );
};

export default Cube;
