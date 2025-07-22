import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../contexts/TranslationContext';
import { useSearch } from '../hooks/useStories';
import LoadingSpinner from '../components/LoadingSpinner';
import Breadcrumbs, { BreadcrumbItem } from '../components/Breadcrumbs';
import StoriesList from '../components/StoriesList';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const query = searchParams.get('q') || '';
  const { stories, loading, error } = useSearch(query);

  const breadcrumbs: BreadcrumbItem[] = [
    { name: t('common.home'), path: '/' },
    { name: t('search.pageTitle'), path: '/search', isCurrent: true }
  ];

  return (
    <>
      <Helmet>
        <title>{query ? `${t('search.resultsFor')} "${query}"` : t('search.pageTitle')}</title>
        <meta name="description" content={t('search.description')} />
        <meta name="keywords" content={t('search.keywords')} />
        <meta property="og:title" content={query ? `${t('search.resultsFor')} "${query}"` : t('search.pageTitle')} />
        <meta property="og:description" content={t('search.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://bedtime-stories.com/search?q=${encodeURIComponent(query)}`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SearchResultsPage",
          "name": query ? `${t('search.resultsFor')} "${query}"` : t('search.pageTitle'),
          "description": t('search.description'),
          "url": `https://bedtime-stories.com/search?q=${encodeURIComponent(query)}`,
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": stories.length,
            "itemListElement": stories.map((story, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "CreativeWork",
                "name": story.title,
                "description": story.description,
                "url": `https://bedtime-stories.com/stories/all/${story.slug}`,
                "genre": story.tags.join(', '),
                "audience": {
                  "@type": "Audience",
                  "audienceType": `Children ${story.ageGroup} years`
                }
              }
            }))
          }
        })}
        </script>

        {/* Breadcrumbs Structured Data */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.path === '/search' ? `https://bedtime-stories.com/search?q=${encodeURIComponent(query)}` : `https://bedtime-stories.com${item.path}`
          }))
        })}
        </script>
      </Helmet>

      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <Breadcrumbs items={breadcrumbs} />
          
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex min-w-72 flex-col gap-3">
              <h1 className="text-[#101619] tracking-light text-[32px] font-bold leading-tight">
                {query ? `${t('search.resultsFor')} "${query}"` : t('search.pageTitle')}
              </h1>
              <p className="text-[#577c8e] text-sm font-normal leading-normal">
                {query ? t('search.resultsDescription') : t('search.pageDescription')}
              </p>
            </div>
          </div>

          {loading && (
            <div className="flex justify-center py-8">
              <LoadingSpinner message={t('search.searching')} size="large" />
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-64">
              <div className="text-lg text-red-600">
                {t('search.error')} {error}
              </div>
            </div>
          )}

          {!loading && !error && (
            <>
              {query && stories.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {t('search.noResults')}
                  </h2>
                  <p className="text-gray-600 text-center max-w-md">
                    {t('search.noResultsDescription')}
                  </p>
                  <Link 
                    to="/stories" 
                    className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {t('search.browseAllStories')}
                  </Link>
                </div>
              )}

              {stories.length > 0 && (
                <>
                  <div className="px-4 pb-3">
                    <p className="text-gray-600">
                      {t('search.foundResults').replace('{count}', stories.length.toString()).replace('{query}', query)}
                    </p>
                  </div>
                  
                  <StoriesList stories={stories} tagSlug="all" showAll={true} maxVisible={6} />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage; 