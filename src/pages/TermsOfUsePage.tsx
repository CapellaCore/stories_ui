import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../contexts/TranslationContext';
import Breadcrumbs from '../components/Breadcrumbs';

const TermsOfUsePage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <Helmet>
        <title>{t('terms.title')}</title>
        <meta name="description" content={t('terms.description')} />
        <meta name="keywords" content={t('terms.keywords')} />
        <link rel="canonical" href="https://timetosleep.org/terms-of-use" />
        
        {/* Open Graph */}
        <meta property="og:title" content={t('terms.title')} />
        <meta property="og:description" content={t('terms.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://timetosleep.org/terms-of-use" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t('terms.title')} />
        <meta name="twitter:description" content={t('terms.description')} />

        {/* Breadcrumbs Structured Data */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Главная",
              "item": "https://timetosleep.org"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Условия использования",
              "item": "https://timetosleep.org/terms-of-use"
            }
          ]
        })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <div className="mb-6">
              <Breadcrumbs 
                items={[
                  { name: t('common.home'), path: '/' },
                                      { name: t('terms.pageTitle'), path: '/terms-of-use', isCurrent: true }
                ]}
              />
            </div>
            
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {t('terms.pageTitle')}
              </h1>
              <p className="text-lg text-gray-600">
                {t('terms.lastUpdated')}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="prose prose-lg max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    1. {t('terms.sections.acceptance.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('terms.sections.acceptance.content')}
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    2. {t('terms.sections.service.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('terms.sections.service.content')}
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    {t('terms.sections.service.features').split(',').map((feature: string, index: number) => (
                      <li key={index}>{feature.trim()}</li>
                    ))}
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    3. {t('terms.sections.usage.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('terms.sections.usage.content')}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>{t('terms.sections.usage.allowed')}</strong>
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    {t('terms.sections.usage.allowedItems').split(',').map((item: string, index: number) => (
                      <li key={index}>{item.trim()}</li>
                    ))}
                  </ul>
                  <p className="text-gray-700 mb-4">
                    <strong>{t('terms.sections.usage.prohibited')}</strong>
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    {t('terms.sections.usage.prohibitedItems').split(',').map((item: string, index: number) => (
                      <li key={index}>{item.trim()}</li>
                    ))}
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    4. {t('terms.sections.stories.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('terms.sections.stories.content')}
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    5. {t('terms.sections.intellectual.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('terms.sections.intellectual.content')}
                  </p>
                  <p className="text-gray-700 mb-4">
                    {t('terms.sections.intellectual.copyright')}
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    6. {t('terms.sections.liability.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('terms.sections.liability.content')}
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    {t('terms.sections.liability.items').split(',').map((item: string, index: number) => (
                      <li key={index}>{item.trim()}</li>
                    ))}
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    7. {t('terms.sections.privacy.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('terms.sections.privacy.content')}
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    8. {t('terms.sections.changes.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('terms.sections.changes.content')}
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    9. {t('terms.sections.termination.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('terms.sections.termination.content')}
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    10. {t('terms.sections.law.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('terms.sections.law.content')}
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    11. {t('terms.sections.contact.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('terms.sections.contact.content')}
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      <strong>{t('terms.sections.contact.email')}</strong> legal@timetosleep.org<br />
                      <strong>{t('terms.sections.contact.address')}</strong> [Twój adres prawny]<br />
                      <strong>{t('terms.sections.contact.phone')}</strong> [Twój telefon]
                    </p>
                  </div>
                </section>

                <div className="border-t pt-8 mt-8">
                  <p className="text-sm text-gray-500">
                    {t('terms.sections.effective.content')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfUsePage; 