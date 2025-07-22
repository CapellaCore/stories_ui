import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../contexts/TranslationContext';
import Breadcrumbs, { BreadcrumbItem } from '../components/Breadcrumbs';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <Helmet>
        <title>{t('about.title')}</title>
        <meta name="description" content={t('about.description')} />
        <meta name="keywords" content={t('about.keywords')} />
        <link rel="canonical" href="https://bedtime-stories.com/about" />
        
        {/* Open Graph */}
        <meta property="og:title" content={t('about.title')} />
        <meta property="og:description" content={t('about.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bedtime-stories.com/about" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t('about.title')} />
        <meta name="twitter:description" content={t('about.description')} />

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
              "item": "https://bedtime-stories.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "О нас",
              "item": "https://bedtime-stories.com/about"
            }
          ]
        })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumbs */}
            <div className="mb-6">
              <Breadcrumbs 
                items={[
                  { name: 'Główna', path: '/' },
                  { name: 'O nas', path: '/about', isCurrent: true }
                ]}
              />
            </div>
            
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                {t('about.pageTitle')}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('about.pageDescription')}
              </p>
            </div>

            {/* Mission Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {t('about.missionTitle')}
                  </h2>
                  <p className="text-lg text-gray-700 mb-6">
                    {t('about.missionDescription1')}
                  </p>
                  <p className="text-lg text-gray-700 mb-6">
                    {t('about.missionDescription2')}
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <span className="text-lg font-medium text-gray-900">{t('about.createdWithLove')}</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4">{t('about.valuesTitle')}</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center space-x-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{t('about.values.quality')}</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{t('about.values.imagination')}</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{t('about.values.accessibility')}</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{t('about.values.family')}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {t('about.storyTitle')}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {t('about.storyDescription')}
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('about.steps.idea.title')}</h3>
                  <p className="text-gray-600">
                    {t('about.steps.idea.description')}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('about.steps.development.title')}</h3>
                  <p className="text-gray-600">
                    {t('about.steps.development.description')}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">3</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('about.steps.growth.title')}</h3>
                  <p className="text-gray-600">
                    {t('about.steps.growth.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {t('about.featuresTitle')}
                </h2>
                <p className="text-lg text-gray-600">
                  {t('about.featuresDescription')}
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.features.library.title')}</h3>
                      <p className="text-gray-600">
                        {t('about.features.library.description')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.features.search.title')}</h3>
                      <p className="text-gray-600">
                        {t('about.features.search.description')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.features.illustrations.title')}</h3>
                      <p className="text-gray-600">
                        {t('about.features.illustrations.description')}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.features.safety.title')}</h3>
                      <p className="text-gray-600">
                        {t('about.features.safety.description')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.features.love.title')}</h3>
                      <p className="text-gray-600">
                        {t('about.features.love.description')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.features.speed.title')}</h3>
                      <p className="text-gray-600">
                        {t('about.features.speed.description')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {t('about.team.title')}
                </h2>
                <p className="text-lg text-gray-600">
                  {t('about.team.description')}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">А</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('about.team.members.anna.name')}</h3>
                  <p className="text-gray-600 mb-2">{t('about.team.members.anna.role')}</p>
                  <p className="text-sm text-gray-500">
                    {t('about.team.members.anna.description')}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">М</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('about.team.members.michal.name')}</h3>
                  <p className="text-gray-600 mb-2">{t('about.team.members.michal.role')}</p>
                  <p className="text-sm text-gray-500">
                    {t('about.team.members.michal.description')}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">Е</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('about.team.members.elena.name')}</h3>
                  <p className="text-gray-600 mb-2">{t('about.team.members.elena.role')}</p>
                  <p className="text-sm text-gray-500">
                    {t('about.team.members.elena.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                {t('about.cta.title')}
              </h2>
              <p className="text-xl mb-6 opacity-90">
                {t('about.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  {t('about.cta.startReading')}
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  {t('about.cta.contactUs')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage; 