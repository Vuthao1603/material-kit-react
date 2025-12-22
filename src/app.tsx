import 'src/global.css';

import { useEffect } from 'react';

import { ThemeProvider } from 'src/theme/theme-provider';


// ----------------------------------------------------------------------

type AppProps = {
  children: React.ReactNode;
};

export default function App({ children }: AppProps) {
  useScrollToTop();

  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}

// ----------------------------------------------------------------------

function useScrollToTop() {


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}
