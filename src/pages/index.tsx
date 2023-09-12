import { motion } from 'framer-motion';
import * as React from 'react';
import { useState } from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import TheCube from '@/components/TheCube';

import { useTheme } from '@/ThemeContext';

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

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  const [cursorLocation, setCursorLocation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorLocation({
      x: (e.clientX * 2) / window.innerWidth - 1,
      y: (e.clientY * 2) / window.innerHeight - 1,
    });
  };

  return (
    <Layout theme={theme} toggleTheme={toggleTheme} noFooter>
      <Seo templateTitle='Home' />

      <main
        className={`flex flex-grow flex-col items-center justify-center px-12
                        ${
                          theme == 'light'
                            ? 'bg-customGray'
                            : 'bg-customDarkBlue'
                        } `}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setCursorLocation({ x: 0, y: 0 })}
      >
        <motion.div
          className=''
          style={{}}
          key='home'
          variants={mainComponent}
          initial='hidden'
          animate='enter'
          exit='exit'
        >
          <TheCube cursorLocation={cursorLocation} theme={theme} />
        </motion.div>
      </main>
    </Layout>
  );
}
