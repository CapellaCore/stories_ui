import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { measurePerformance, measurePageLoad } from '../src/utils/performance';
import { appWithTranslation } from 'next-i18next';
import '../src/styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    measurePerformance();
    measurePageLoad();
  }, []);

  return <Component {...pageProps} />;
}

export default appWithTranslation(App);
