import * as React from 'react';

import Footer from '@/components/layout/Footer';

import Header from './Header';

export default function Layout({
  children,
  theme,
  toggleTheme,
  noThemeChanger,
  noFooter,
}: {
  children: React.ReactNode;
  theme: string;
  toggleTheme: () => void;
  noThemeChanger?: boolean;
  noFooter?: boolean;
}) {
  return (
    <div className=' flex min-h-screen flex-col '>
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        noThemeChanger={noThemeChanger}
      />
      {children}
      <Footer theme={theme} noFooter={noFooter} />
    </div>
  );
}
