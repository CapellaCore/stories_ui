import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SimpleHeader from '../src/components/SimpleHeader';
import SimpleFooter from '../src/components/SimpleFooter';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy - Time to Sleep</title>
        <meta name="description" content="Privacy Policy for Time to Sleep. Learn how we collect, use, and protect your personal information on our bedtime stories website." />
        <meta name="keywords" content="privacy policy, data protection, GDPR, cookies, time to sleep, bedtime stories" />
        <link rel="canonical" href="https://timetosleep.org/privacy-policy" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Privacy Policy - Time to Sleep" />
        <meta property="og:description" content="Privacy Policy for Time to Sleep. Learn how we collect, use, and protect your personal information on our bedtime stories website." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://timetosleep.org/privacy-policy" />
        <meta property="og:site_name" content="Time to Sleep" />
        <meta property="og:image" content="https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" />
        
        {/* Twitter Card */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Privacy Policy - Time to Sleep" />
        <meta property="twitter:description" content="Privacy Policy for Time to Sleep. Learn how we collect, use, and protect your personal information on our bedtime stories website." />
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
              "name": "Privacy Policy - Time to Sleep",
              "description": "Privacy Policy for Time to Sleep. Learn how we collect, use, and protect your personal information on our bedtime stories website.",
              "url": "https://timetosleep.org/privacy-policy",
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
                  "name": "Privacy Policy",
                  "item": "https://timetosleep.org/privacy-policy"
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
                        <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Privacy Policy</span>
                      </div>
                    </li>
                  </ol>
                </nav>
              </div>
              
              {/* Page Header */}
              <div className="px-4 mb-8">
                <div className="text-center">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    Privacy Policy
                  </h1>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Learn how we collect, use, and protect your personal information on our bedtime stories website.
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
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                      <p className="text-gray-700 mb-4">
                        Time to Sleep ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website timetosleep.org.
                      </p>
                      <p className="text-gray-700 mb-4">
                        By using our website, you consent to the data practices described in this policy.
                      </p>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Personal Information</h3>
                      <p className="text-gray-700 mb-4">
                        We may collect personal information that you voluntarily provide to us, such as:
                      </p>
                      <ul className="list-disc pl-6 text-gray-700 mb-4">
                        <li>Name and email address (when you contact us)</li>
                        <li>Message content (when you submit feedback or questions)</li>
                        <li>IP address and browser information (automatically collected)</li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Automatically Collected Information</h3>
                      <p className="text-gray-700 mb-4">
                        When you visit our website, we automatically collect certain information, including:
                      </p>
                      <ul className="list-disc pl-6 text-gray-700 mb-4">
                        <li>IP address and location data</li>
                        <li>Browser type and version</li>
                        <li>Operating system</li>
                        <li>Pages visited and time spent on each page</li>
                        <li>Referring website</li>
                      </ul>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                      <p className="text-gray-700 mb-4">
                        We use the collected information for the following purposes:
                      </p>
                      <ul className="list-disc pl-6 text-gray-700 mb-4">
                        <li>To provide and maintain our website services</li>
                        <li>To respond to your inquiries and provide customer support</li>
                        <li>To improve our website and user experience</li>
                        <li>To analyze website usage and trends</li>
                        <li>To ensure website security and prevent fraud</li>
                      </ul>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies and Tracking Technologies</h2>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 CookieHub</h3>
                      <p className="text-gray-700 mb-4">
                        We use CookieHub (cookiehub.com) for consent banner management to comply with GDPR requirements. CookieHub helps us:
                      </p>
                      <ul className="list-disc pl-6 text-gray-700 mb-4">
                        <li>Display cookie consent banners</li>
                        <li>Manage user consent preferences</li>
                        <li>Ensure GDPR compliance</li>
                        <li>Provide transparency about data collection</li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Google Tag Manager and Analytics</h3>
                      <p className="text-gray-700 mb-4">
                        We use Google Tag Manager and Google Analytics to improve user experience and understand website usage:
                      </p>
                      <ul className="list-disc pl-6 text-gray-700 mb-4">
                        <li>Track website performance and user behavior</li>
                        <li>Analyze which stories are most popular</li>
                        <li>Improve website functionality and content</li>
                        <li>Optimize user experience</li>
                      </ul>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Sharing and Disclosure</h2>
                      <p className="text-gray-700 mb-4">
                        We do not sell, trade, or otherwise transfer your personal information to third parties, except in the following circumstances:
                      </p>
                      <ul className="list-disc pl-6 text-gray-700 mb-4">
                        <li>With your explicit consent</li>
                        <li>To comply with legal obligations</li>
                        <li>To protect our rights and safety</li>
                        <li>With trusted service providers who assist in website operations (Google Analytics, CookieHub)</li>
                      </ul>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
                      <p className="text-gray-700 mb-4">
                        We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                      </p>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
                      <p className="text-gray-700 mb-4">
                        Depending on your location, you may have the following rights regarding your personal information:
                      </p>
                      <ul className="list-disc pl-6 text-gray-700 mb-4">
                        <li>Right to access your personal data</li>
                        <li>Right to correct inaccurate data</li>
                        <li>Right to delete your personal data</li>
                        <li>Right to restrict processing</li>
                        <li>Right to data portability</li>
                        <li>Right to withdraw consent</li>
                      </ul>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
                      <p className="text-gray-700 mb-4">
                        Our website is designed for children and families. We do not knowingly collect personal information from children under 13 without parental consent. If you believe we have collected information from a child under 13, please contact us immediately.
                      </p>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Third-Party Links</h2>
                      <p className="text-gray-700 mb-4">
                        Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies.
                      </p>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
                      <p className="text-gray-700 mb-4">
                        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                      </p>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
                      <p className="text-gray-700 mb-4">
                        If you have any questions about this Privacy Policy or our data practices, please contact us:
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
                      <p className="text-gray-700 mt-4">
                        For privacy-related issues or requests regarding your personal data, please contact Konstantin Dylko directly at the email address above.
                      </p>
                    </section>

                    <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
                      <p className="text-blue-800 text-sm">
                        <strong>Note:</strong> This privacy policy is designed to be transparent about how we handle your data while ensuring compliance with GDPR and other privacy regulations. We are committed to protecting your privacy and will respond to all inquiries promptly.
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

export default PrivacyPolicyPage;
