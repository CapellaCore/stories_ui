import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../contexts/TranslationContext';
import Breadcrumbs from '../components/Breadcrumbs';

const PrivacyPolicyPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <Helmet>
        <title>{t('privacy.title')}</title>
        <meta name="description" content={t('privacy.description')} />
        <meta name="keywords" content={t('privacy.keywords')} />
        <link rel="canonical" href="https://timetosleep.org/privacy-policy" />
        
        {/* Open Graph */}
        <meta property="og:title" content={t('privacy.title')} />
        <meta property="og:description" content={t('privacy.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://timetosleep.org/privacy-policy" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t('privacy.title')} />
        <meta name="twitter:description" content={t('privacy.description')} />

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
              "name": "Политика конфиденциальности",
              "item": "https://timetosleep.org/privacy-policy"
            }
          ]
        })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-6 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <div className="mb-4 md:mb-6">
              <Breadcrumbs 
                items={[
                  { name: t('common.home'), path: '/' },
                  { name: t('privacy.pageTitle'), path: '/privacy-policy', isCurrent: true }
                ]}
              />
            </div>
            
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                {t('privacy.pageTitle')}
              </h1>
              <p className="text-base md:text-lg text-gray-600">
                {t('privacy.lastUpdated')}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 md:p-8">
              <div className="prose prose-sm md:prose-lg max-w-none">
                <section className="mb-6 md:mb-8">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">
                    1. {t('privacy.sections.introduction.title')}
                  </h2>
                  <p className="text-gray-700 mb-3 md:mb-4">
                    {t('privacy.sections.introduction.content')}
                  </p>
                  <p className="text-gray-700 mb-3 md:mb-4">
                    {t('privacy.sections.introduction.agreement')}
                  </p>
                </section>

                <section className="mb-6 md:mb-8">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">
                    2. {t('privacy.sections.collection.title')}
                  </h2>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                    2.1 {t('privacy.sections.collection.provided.title')}
                  </h3>
                  <p className="text-gray-700 mb-3 md:mb-4">
                    {t('privacy.sections.collection.provided.content')}
                  </p>
                  <ul className="list-disc pl-4 md:pl-6 text-gray-700 space-y-1 md:space-y-2 mb-4 md:mb-6">
                    {t('privacy.sections.collection.provided.items').split(',').map((item: string, index: number) => (
                      <li key={index}>{item.trim()}</li>
                    ))}
                  </ul>

                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                    2.2 {t('privacy.sections.collection.automatic.title')}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {t('privacy.sections.collection.automatic.content')}
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    {t('privacy.sections.collection.automatic.items').split(',').map((item: string, index: number) => (
                      <li key={index}>{item.trim()}</li>
                    ))}
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    3. {t('privacy.sections.usage.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('privacy.sections.usage.content')}
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    {t('privacy.sections.usage.items').split(',').map((item: string, index: number) => (
                      <li key={index}>{item.trim()}</li>
                    ))}
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    4. {t('privacy.sections.sharing.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('privacy.sections.sharing.content')}
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    {t('privacy.sections.sharing.items').split(',').map((item: string, index: number) => (
                      <li key={index}>{item.trim()}</li>
                    ))}
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    5. {t('privacy.sections.cookies.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('privacy.sections.cookies.content')}
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    {t('privacy.sections.cookies.items').split(',').map((item: string, index: number) => (
                      <li key={index}>{item.trim()}</li>
                    ))}
                  </ul>
                  <p className="text-gray-700 mb-4">
                    {t('privacy.sections.cookies.management')}
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    6. {t('privacy.sections.security.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('privacy.sections.security.content')}
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    {t('privacy.sections.security.items').split(',').map((item: string, index: number) => (
                      <li key={index}>{item.trim()}</li>
                    ))}
                  </ul>
                  <p className="text-gray-700 mb-4">
                    {t('privacy.sections.security.note')}
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    7. {t('privacy.sections.storage.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('privacy.sections.storage.content')}
                  </p>
                  <p className="text-gray-700 mb-4">
                    {t('privacy.sections.storage.deletion')}
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    8. {t('privacy.sections.rights.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('privacy.sections.rights.content')}
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    {t('privacy.sections.rights.items').split(',').map((item: string, index: number) => (
                      <li key={index}>{item.trim()}</li>
                    ))}
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    9. {t('privacy.sections.children.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('privacy.sections.children.content')}
                  </p>
                  <p className="text-gray-700 mb-4">
                    {t('privacy.sections.children.removal')}
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    10. {t('privacy.sections.international.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('privacy.sections.international.content')}
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    11. {t('privacy.sections.changes.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('privacy.sections.changes.content')}
                  </p>
                  <p className="text-gray-700 mb-4">
                    {t('privacy.sections.changes.recommendation')}
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    12. {t('privacy.sections.contact.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('privacy.sections.contact.content')}
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      <strong>{t('privacy.sections.contact.email')}</strong> privacy@timetosleep.org<br />
                      <strong>{t('privacy.sections.contact.address')}</strong> [Twój adres korespondencyjny]<br />
                      <strong>{t('privacy.sections.contact.phone')}</strong> [Twój telefon]
                    </p>
                  </div>
                </section>

                <div className="border-t pt-8 mt-8">
                  <p className="text-sm text-gray-500">
                    {t('privacy.sections.effective.content')}
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

export default PrivacyPolicyPage; 