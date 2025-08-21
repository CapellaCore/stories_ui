import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../contexts/TranslationContext';
import { useSearch } from '../hooks/useStories';
import LoadingSpinner from '../components/LoadingSpinner';
import Breadcrumbs from '../components/Breadcrumbs';
import StoriesList from '../components/StoriesList';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { language, t } = useTranslation();
  const prefix = language && language !== "en" ? `/${language}` : "";
  const query = searchParams.get('q') || '';
  const { stories, loading, error } = useSearch(query);

  const breadcrumbs = React.useMemo(() => [
    { name: t('common.home'), path: `/` },
    { name: t('search.pageTitle'), path: `${prefix}/search`, isCurrent: true }
  ], [t, prefix]);

  const baseUrl = 'https://timetosleep.org';
  const searchUrl = React.useMemo(() => {
    return `${baseUrl}${prefix}/search?q=${encodeURIComponent(query)}`;
  }, [baseUrl, prefix, query]);


  return (
    <>
      <Helmet>
        <title>{query ? `${t('search.resultsFor')} "${query}"` : t('search.pageTitle')}</title>
        <meta name="description" content={t('search.description')} />
        <meta name="keywords" content={t('search.keywords')} />
        <meta property="og:title" content={query ? `${t('search.resultsFor')} "${query}"` : t('search.pageTitle')} />
        <meta property="og:description" content={t('search.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={searchUrl} />
        <meta property="og:image" content="https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" />
        
        {/* Twitter Card */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={query ? `${t('search.resultsFor')} "${query}"` : t('search.pageTitle')} />
        <meta property="twitter:description" content={t('search.description')} />
        <meta property="twitter:image" content="https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SearchResultsPage",
          "name": query ? `${t('search.resultsFor')} "${query}"` : t('search.pageTitle'),
          "description": t('search.description'),
          "url": searchUrl,
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
                "url": `${baseUrl}${prefix}/stories/${story.slug}`,
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
            "item": `${baseUrl}${item.path}`
          }))
        })}
        </script>
      </Helmet>

      <div className="px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-4 md:py-5">
        <div className="w-full max-w-[960px] flex flex-col flex-1">
          <div className="px-4 py-3">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex w-full md:min-w-72 flex-col gap-3">
              <h1 className="text-[#101619] tracking-light text-xl md:text-2xl lg:text-[32px] font-bold leading-tight">
                {query ? `${t('search.resultsFor')} "${query}"` : t('search.pageTitle')}
              </h1>
              <p className="text-[#577c8e] text-sm md:text-base font-normal leading-normal">
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
              {stories.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <div className="text-6xl mb-4">🔍</div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                    {t('search.noResults')}
                  </h2>
                  <p className="text-gray-600 text-center mb-6 max-w-md">
                    {t('search.noResultsDescription')}
                  </p>
                  <Link 
                    to={`${prefix}/stories`}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    {t('search.browseAllStories')}
                  </Link>
                </div>
              ) : (
                <div className="px-4">
                  <div className="mb-4 text-sm text-gray-600">
                    {t('search.foundResults').replace('{count}', stories.length.toString()).replace('{query}', query)}
                  </div>
                  <StoriesList 
                    stories={stories} 
                    tagSlug="search" 
                    showAll={true}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage; 