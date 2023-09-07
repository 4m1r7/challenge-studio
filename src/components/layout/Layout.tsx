import * as React from 'react';

import Header from './Header';

export default function Layout({
  children,
  theme,
  toggleTheme,
}: {
  children: React.ReactNode;
  theme: string;
  toggleTheme: () => void;
}) {
  return (
    <div className=' flex min-h-screen flex-col '>
      <Header theme={theme} toggleTheme={toggleTheme} />
      {children}
    </div>
  );
}
