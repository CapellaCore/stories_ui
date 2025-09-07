import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SimpleHeader from '../src/components/SimpleHeader';
import SimpleFooter from '../src/components/SimpleFooter';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import type {GetStaticProps, GetStaticPropsContext} from "next";
import {useTranslation} from "next-i18next";

const PrivacyPolicyPage: React.FC = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <Head>
        <title>{t('privacy.title')}</title>
        <meta name="title" content={t('privacy.title')} />
        <meta name="description" content={t('privacy.description')} />
        <meta name="keywords" content={t('privacy.keywords')} />
        <link rel="canonical" href="https://timetosleep.org/privacy-policy" />

        {/* Open Graph */}
        <meta property="og:title" content={t('privacy.title')} />
        <meta property="og:description" content={t('privacy.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://timetosleep.org/privacy-policy" />
        <meta property="og:site_name" content="Time to Sleep" />
        <meta property="og:image" content="https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" />

        {/* Twitter Card */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={t('privacy.title')} />
        <meta property="twitter:description" content={t('privacy.description')} />
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
              "name": t('privacy.pageTitle'),
              "description": t('privacy.description'),
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
                  "name": t('common.home'),
                  "item": "https://timetosleep.org"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": t('common.privacyPolicy'),
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
                        {t('common.home')}
                      </Link>
                    </li>
                    <li aria-current="page">
                      <div className="flex items-center">
                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                        </svg>
                        <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                          {t('common.privacyPolicy')}
                        </span>
                      </div>
                    </li>
                  </ol>
                </nav>
              </div>

              {/* Page Header */}
              <div className="px-4 mb-8">
                <div className="text-center">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    {t('privacy.pageTitle')}
                  </h1>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    {t('privacy.description')}
                  </p>
                  <div className="mt-4 text-sm text-gray-500">
                    {t('privacy.lastUpdated')}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-4">
                <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                  <div className="prose prose-lg max-w-none">
                    {/* 1. Introduction */}
                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {t('privacy.sections.introduction.title')}
                      </h2>
                      <p className="text-gray-700 mb-4">
                        {t('privacy.sections.introduction.content')}
                      </p>
                      <p className="text-gray-700 mb-4">
                        {t('privacy.sections.introduction.agreement')}
                      </p>
                    </section>

                    {/* 2. Information We Collect */}
                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {t('privacy.sections.collection.title')}
                      </h2>

                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {t('privacy.sections.collection.provided.title')}
                      </h3>
                      <p className="text-gray-700 mb-4">
                        {t('privacy.sections.collection.provided.content')}
                      </p>
                      <p className="text-gray-700 mb-4">
                        {t('privacy.sections.collection.provided.items')}
                      </p>

                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {t('privacy.sections.collection.automatic.title')}
                      </h3>
                      <p className="text-gray-700 mb-4">
                        {t('privacy.sections.collection.automatic.content')}
                      </p>
                      <p className="text-gray-700 mb-4">
                        {t('privacy.sections.collection.automatic.items')}
                      </p>
                    </section>

                    {/* 3. How We Use Your Information */}
                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {t('privacy.sections.usage.title')}
                      </h2>
                      <p className="text-gray-700 mb-4">
                        {t('privacy.sections.usage.content')}
                      </p>
                      <p className="text-gray-700 mb-4">
                        {t('privacy.sections.usage.items')}
                      </p>
                    </section>

                    {/* 4. Cookies and Tracking */}
                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {t('privacy.sections.cookies.title')}
                      </h2>
                      <p className="text-gray-700 mb-4">
                        {t('privacy.sections.cookies.content')}
                      </p>
                      <p className="text-gray-700 mb-4">
                        {t('privacy.sections.cookies.items')}
                      </p>
                      <p className="text-gray-700 mb-4">
                        {t('privacy.sections.cookies.management')}
                      </p>
                    </section>

                    {/* 6. Data Security */}
                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {t('privacy.sections.security.title')}
                      </h2>
                      <p className="text-gray-700 mb-4">
                        {t('privacy.sections.security.content')}
                      </p>
                      <p className="text-gray-700 mb-4">
                        {t('privacy.sections.security.items')}
                      </p>
                      <p className="text-gray-700 mb-4">
                        {t('privacy.sections.security.note')}
                      </p>
                    </section>

                    {/* Other sections can remain or be progressively migrated to t(...) as needed */}
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

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    }
  };
};

export default PrivacyPolicyPage;