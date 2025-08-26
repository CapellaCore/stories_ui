import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { measurePerformance, measurePageLoad } from '../src/utils/performance';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize performance monitoring
    measurePerformance();
    measurePageLoad();
  }, []);

  return <Component {...pageProps} />;
}
