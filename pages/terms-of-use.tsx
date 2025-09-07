import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SimpleHeader from '../src/components/SimpleHeader';
import SimpleFooter from '../src/components/SimpleFooter';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import type {GetStaticProps, GetStaticPropsContext} from "next";
import {useTranslation} from "next-i18next";

const TermsOfUsePage: React.FC = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <Head>
        <title>{t('terms.title')}</title>
        <meta name="title" content={t('terms.title')} />
        <meta name="description" content={t('terms.description')} />
        <meta name="keywords" content={t('terms.keywords')} />
        <link rel="canonical" href="https://timetosleep.org/terms-of-use" />

        {/* Open Graph */}
        <meta property="og:title" content={t('terms.title')} />
        <meta property="og:description" content={t('terms.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://timetosleep.org/terms-of-use" />
        <meta property="og:site_name" content="Time to Sleep" />
        <meta property="og:image" content="https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" />

        {/* Twitter Card */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={t('terms.title')} />
        <meta property="twitter:description" content={t('terms.description')} />
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
              "name": t('terms.pageTitle'),
              "description": t('terms.description'),
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
                  "name": t('common.home'),
                  "item": "https://timetosleep.org"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": t('common.termsOfUse'),
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
                <nav className="flex" aria-label={t('common.breadcrumbs')}>
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
                          {t('common.termsOfUse')}
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
                    {t('terms.pageTitle')}
                  </h1>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    {t('terms.description')}
                  </p>
                  <div className="mt-4 text-sm text-gray-500">
                    {t('terms.lastUpdated')}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-4">
                <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                  <div className="prose prose-lg max-w-none">
                    {/* 1. Acceptance of Terms */}
                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {t('terms.sections.acceptance.title')}
                      </h2>
                      <p className="text-gray-700 mb-4">
                        {t('terms.sections.acceptance.content')}
                      </p>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.sections.intellectual.title')}</h2>
                      <p className="text-gray-700 mb-4">
                        {t('terms.sections.intellectual.content')}
                      </p>
                      <p className="text-gray-700 mb-4">
                        <strong>Important:</strong> {t('terms.sections.intellectual.restrictions')}
                      </p>
                      <p className="text-gray-700 mb-4">
                        {t('terms.sections.intellectual.copyright')}
                      </p>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.sections.usage.title')}</h2>
                      <p className="text-gray-700 mb-4">
                        {t('terms.sections.usage.content')}
                      </p>
                      <ul className="list-disc pl-6 text-gray-700 mb-4">
                        <li>{t('terms.sections.usage.read')}</li>
                        <li>{t('terms.sections.usage.share')}</li>
                        <li>{t('terms.sections.usage.educational')}</li>
                      </ul>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.sections.prohibited.title')}</h2>
                      <p className="text-gray-700 mb-4">
                        {t('terms.sections.prohibited.content')}
                      </p>
                      <ul className="list-disc pl-6 text-gray-700 mb-4">
                        <li>{t('terms.sections.prohibited.copy')}</li>
                        <li>{t('terms.sections.prohibited.commercial')}</li>
                        <li>{t('terms.sections.prohibited.modify')}</li>
                        <li>{t('terms.sections.prohibited.copyrightNotices')}</li>
                        <li>{t('terms.sections.prohibited.scrape')}</li>
                      </ul>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {t('terms.sections.conduct.title')}
                      </h2>
                      <p className="text-gray-700 mb-4">
                        {t('terms.sections.conduct.content')}
                      </p>
                      <ul className="list-disc pl-6 text-gray-700 mb-4">
                        <li>{t('terms.sections.conduct.items.respectIp')}</li>
                        <li>{t('terms.sections.conduct.items.noHarm')}</li>
                        <li>{t('terms.sections.conduct.items.accurateInfo')}</li>
                        <li>{t('terms.sections.conduct.items.complyLaws')}</li>
                      </ul>
                    </section>


                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {t('terms.sections.disclaimer.title')}
                      </h2>
                      <p className="text-gray-700 mb-4">
                        {t('terms.sections.disclaimer.content')}
                      </p>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {t('terms.sections.liability.title')}
                      </h2>
                      <p className="text-gray-700 mb-4">
                        {t('terms.sections.liability.content')}
                      </p>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {t('terms.sections.contact.title')}
                      </h2>
                      <p className="text-gray-700 mb-4">
                        {t('terms.sections.contact.content')}
                      </p>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-gray-700 mb-2">
                          <strong>{t('terms.sections.contact.email.value')}</strong> {t('terms.sections.contact.email.example')}
                        </p>
                        <p className="text-gray-700 mb-2">
                          <strong>{t('terms.sections.contact.owner.value')}</strong> {t('terms.sections.contact.owner.example')}
                        </p>
                        <p className="text-gray-700">
                          <strong>{t('terms.sections.contact.address.value')}</strong> {t('terms.sections.contact.address.example')}
                        </p>
                      </div>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {t('terms.sections.changes.title')}
                      </h2>
                      <p className="text-gray-700 mb-4">
                        {t('terms.sections.changes.content')}
                      </p>
                    </section>

                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {t('terms.sections.law.title')}
                      </h2>
                      <p className="text-gray-700 mb-4">
                        {t('terms.sections.law.content')}
                      </p>
                    </section>

                    <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
                      <p className="text-blue-800 text-sm">
                        <strong>{t('terms.sections.note.label')}</strong> {t('terms.sections.note.content')}
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

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    }
  };
};

export default TermsOfUsePage;