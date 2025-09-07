import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { measurePerformance, measurePageLoad } from '../src/utils/performance';
import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize performance monitoring
    measurePerformance();
    measurePageLoad();
  }, []);

  return (
    <>
      {/* Critical CSS to prevent FOUC */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Prevent FOUC for logo */
          .size-8 {
            width: 2rem !important;
            height: 2rem !important;
            min-width: 2rem !important;
            min-height: 2rem !important;
          }
          
          @media (min-width: 768px) {
            .md\\:size-10 {
              width: 2.5rem !important;
              height: 2.5rem !important;
              min-width: 2.5rem !important;
              min-height: 2.5rem !important;
            }
          }
          
          /* Ensure images don't flash with wrong size */
          img {
            max-width: 100%;
            height: auto;
          }
          
          /* Prevent layout shift */
          * {
            box-sizing: border-box;
          }
        `
      }} />
            <Component {...pageProps} />
    </>
  );
}
export default appWithTranslation(App);
