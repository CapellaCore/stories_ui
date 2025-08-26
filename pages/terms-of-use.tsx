import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SimpleHeader from '../src/components/SimpleHeader';
import SimpleFooter from '../src/components/SimpleFooter';

const TermsOfUsePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Terms of Use - Time to Sleep</title>
        <meta name="description" content="Terms of Use for Time to Sleep. Read our terms and conditions for using our bedtime stories website." />
        <meta name="keywords" content="terms of use, terms and conditions, legal, time to sleep, bedtime stories" />
        <link rel="canonical" href="https://timetosleep.org/terms-of-use" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Terms of Use - Time to Sleep" />
        <meta property="og:description" content="Terms of Use for Time to Sleep. Read our terms and conditions for using our bedtime stories website." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://timetosleep.org/terms-of-use" />
        <meta property="og:site_name" content="Time to Sleep" />
        <meta property="og:image" content="https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" />
        
        {/* Twitter Card */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Terms of Use - Time to Sleep" />
        <meta property="twitter:description" content="Terms of Use for Time to Sleep. Read our terms and conditions for using our bedtime stories website." />
        <meta property="twitter:site" content="@timetosleep" />
        <meta property="twitter:image" content="https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" />
        
        {/* Additional meta tags for better SEO */}
        <meta name="author" content="Konstantin Dylko" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="en" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Terms of Use - Time to Sleep",
              "description": "Terms of Use for Time to Sleep. Read our terms and conditions for using our bedtime stories website.",
              "url": "https://timetosleep.org/terms-of-use",
              "mainEntity": {
                "@type": "Organization",
                "name": "Time to Sleep",
                "legalName": "Time to Sleep",
                "founder": {
                  "@type": "Person",
                  "name": "Konstantin Dylko"
                }
              }
            })
          }}
        />

        {/* Breadcrumbs Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://timetosleep.org"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Terms of Use",
                  "item": "https://timetosleep.org/terms-of-use"
                }
              ]
            })
          }}
        />
      </Head>

      <div className="relative flex size-full min-h-screen flex-col bg-gray-50 group/design-root overflow-x-hidden" style={{fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif'}}>
        <div className="layout-container flex h-full grow flex-col">
          <SimpleHeader />
          
          <div className="px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-4 md:py-5">
            <div className="w-full max-w-[960px] flex flex-col flex-1">
              {/* Breadcrumbs */}
              <div className="px-4 py-3">
                <nav className="flex" aria-label="Breadcrumb">
                  <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                      <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                        Home
                      </Link>
                    </li>
                    <li aria-current="page">
                      <div className="flex items-center">
                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                        </svg>
                        <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Terms of Use</span>
                      </div>
                    </li>
                  </ol>
                </nav>
              </div>
              
              {/* Page Header */}
              <div className="px-4 mb-8">
                <div className="text-center">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    Terms of Use
                  </h1>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Please read these terms and conditions carefully before using our website.
                  </p>
                  <div className="mt-4 text-sm text-gray-500">
                    Last updated: January 2024
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="px-4">
                <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                  <div className="prose prose-lg max-w-none">
                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                      <p className="text-gray-700 mb-4">
                        By accessing and using Time to Sleep (timetosleep.org), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                      </p>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Intellectual Property Rights</h2>
                      <p className="text-gray-700 mb-4">
                        All content on this website, including but not limited to stories, text, graphics, images, and software, is the exclusive property of <strong>Konstantin Dylko</strong> and is protected by copyright laws.
                      </p>
                      <p className="text-gray-700 mb-4">
                        <strong>Important:</strong> The content on this website was created by Konstantin Dylko and is his property. It is not allowed to copy and commercially use this content without explicit consent from Konstantin Dylko.
                      </p>
                      <p className="text-gray-700 mb-4">
                        Users of the website can freely use the website to read the content for free, but they are not permitted to copy and spread the content without authorization.
                      </p>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Permitted Use</h2>
                      <p className="text-gray-700 mb-4">
                        You may use this website for personal, non-commercial purposes only. You may:
                      </p>
                      <ul className="list-disc pl-6 text-gray-700 mb-4">
                        <li>Read stories for personal enjoyment</li>
                        <li>Share links to our stories on social media</li>
                        <li>Use the website for educational purposes (with proper attribution)</li>
                      </ul>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Prohibited Use</h2>
                      <p className="text-gray-700 mb-4">
                        You may not:
                      </p>
                      <ul className="list-disc pl-6 text-gray-700 mb-4">
                        <li>Copy, reproduce, or distribute any content without permission</li>
                        <li>Use content for commercial purposes without written consent</li>
                        <li>Modify, adapt, or create derivative works</li>
                        <li>Remove or alter any copyright notices</li>
                        <li>Use automated tools to scrape or collect content</li>
                      </ul>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">5. User Conduct</h2>
                      <p className="text-gray-700 mb-4">
                        When using our website, you agree to:
                      </p>
                      <ul className="list-disc pl-6 text-gray-700 mb-4">
                        <li>Respect the intellectual property rights of others</li>
                        <li>Not engage in any activity that could harm the website or other users</li>
                        <li>Provide accurate information when contacting us</li>
                        <li>Use the website in compliance with applicable laws</li>
                      </ul>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Disclaimer</h2>
                      <p className="text-gray-700 mb-4">
                        The content on this website is provided "as is" without any warranties. We do not guarantee that the content will be error-free or uninterrupted.
                      </p>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
                      <p className="text-gray-700 mb-4">
                        Time to Sleep and Konstantin Dylko shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the website.
                      </p>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Information</h2>
                      <p className="text-gray-700 mb-4">
                        For questions about these Terms of Use, please contact us:
                      </p>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-gray-700 mb-2">
                          <strong>Email:</strong> timetosleep.org@gmail.com
                        </p>
                        <p className="text-gray-700 mb-2">
                          <strong>Owner:</strong> Konstantin Dylko
                        </p>
                        <p className="text-gray-700">
                          <strong>Address:</strong> Available upon request
                        </p>
                      </div>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
                      <p className="text-gray-700 mb-4">
                        We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the website. Your continued use of the website constitutes acceptance of the modified terms.
                      </p>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
                      <p className="text-gray-700 mb-4">
                        These terms shall be governed by and construed in accordance with the laws of the jurisdiction where Konstantin Dylko resides, without regard to its conflict of law provisions.
                      </p>
                    </section>

                    <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
                      <p className="text-blue-800 text-sm">
                        <strong>Note:</strong> These terms are designed to protect the intellectual property of Konstantin Dylko while allowing users to enjoy the content for free. If you have any questions about usage rights, please contact us directly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <SimpleFooter />
        </div>
      </div>
    </>
  );
};

export default TermsOfUsePage;
