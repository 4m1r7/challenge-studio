import { AnimatePresence } from 'framer-motion';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import '@/styles/globals.css';

import { ThemeProvider } from '@/ThemeContext';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ThemeProvider>
      <AnimatePresence mode='wait'>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default MyApp;
