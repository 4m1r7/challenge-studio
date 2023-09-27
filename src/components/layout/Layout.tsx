import * as React from 'react';

import Footer from '@/components/layout/Footer';

import Header from './Header';

export default function Layout({
  children,
  theme,
  toggleTheme,
  noFooter,
  footerSocialsData,
}: {
  children: React.ReactNode;
  theme: string;
  toggleTheme: () => void;
  noFooter?: boolean;
  footerSocialsData:
    | {
        [key: string]: string | null;
      }
    | null
    | undefined;
}) {
  return (
    <div className=' flex min-h-screen flex-col '>
      <Header theme={theme} toggleTheme={toggleTheme} />
      {children}
      <Footer
        theme={theme}
        noFooter={noFooter}
        footerSocialsData={footerSocialsData}
      />
    </div>
  );
}
