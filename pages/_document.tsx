import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Critical CSS to prevent FOUC */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Prevent FOUC for logo and critical elements */
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
            
            /* Hide content until styles are loaded */
            .fouc-fix {
              visibility: hidden;
            }
            
            /* Show content after styles are loaded */
            .fouc-fix.loaded {
              visibility: visible;
            }
          `
        }} />
        
        {/* FOUC Prevention Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent FOUC by showing content after styles are loaded
              document.addEventListener('DOMContentLoaded', function() {
                // Add loaded class to body after a short delay
                setTimeout(function() {
                  document.body.classList.add('loaded');
                }, 100);
              });
              
              // Fallback: show content after 1 second if DOMContentLoaded doesn't fire
              setTimeout(function() {
                document.body.classList.add('loaded');
              }, 1000);
            `
          }}
        />
        
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T6RW6GKX');`,
          }}
        />
        
        {/* Favicon and basic meta tags */}
        <link rel="icon" href="/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" />
        <link rel="apple-touch-icon" href="/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="index, follow" />
        
        {/* Resource Hints for Performance */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//cdn.tailwindcss.com" />
        <link rel="dns-prefetch" href="//supabase.co" />
        
        {/* Preload Critical Resources */}
        <link rel="preload" href="/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" as="image" type="image/svg+xml" />
        
        {/* Google Fonts - Optimized Loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700;900&family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700;900&family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap"
          media="print"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700;900&family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap"
          />
        </noscript>
        
        {/* Tailwind CSS - Optimized Loading */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const tailwindLink = document.createElement('link');
              tailwindLink.rel = 'preload';
              tailwindLink.as = 'style';
              tailwindLink.href = 'https://cdn.tailwindcss.com?plugins=forms,container-queries';
              document.head.appendChild(tailwindLink);
            `,
          }}
        />
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries" defer />
      </Head>
      <body className="fouc-fix">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T6RW6GKX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
