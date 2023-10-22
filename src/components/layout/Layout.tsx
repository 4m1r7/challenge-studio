import * as React from 'react';

import Footer from '@/components/layout/Footer';

import Header from './Header';

export default function Layout({
  children,
  theme,
  toggleTheme,
  noMobileMenu,
  noFooter,
  SocialLinksData,
  setIsCalculatorOpen,
}: {
  children: React.ReactNode;
  theme: string;
  toggleTheme: () => void;
  noMobileMenu?: boolean;
  noFooter?: boolean;
  SocialLinksData: { [key: string]: string | null } | null | undefined;
  setIsCalculatorOpen?: (isOpen: boolean) => void;
}) {
  return (
    <div className=' flex min-h-screen flex-col '>
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        noMobileMenu={noMobileMenu}
        SocialLinksData={SocialLinksData}
        setIsCalculatorOpen={setIsCalculatorOpen}
      />
      {children}
      <Footer
        theme={theme}
        noFooter={noFooter}
        SocialLinksData={SocialLinksData}
      />
    </div>
  );
}
