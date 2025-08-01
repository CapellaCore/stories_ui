import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/TranslationContext';
import { useTags } from '../hooks/useTags';
import LoadingSpinner from '../components/LoadingSpinner';
import Breadcrumbs from '../components/Breadcrumbs';

const StoriesPage: React.FC = () => {
  const { t } = useTranslation();
  const { tags, loading, error } = useTags();

  if (loading) {
    return (
      <div className="px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-4 md:py-5">
        <div className="w-full max-w-[960px] flex flex-col flex-1">
          <LoadingSpinner message={t('stories.loadingTags')} size="large" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-4 md:py-5">
        <div className="w-full max-w-[960px] flex flex-col flex-1">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-red-600">
              {t('stories.errorLoadingTags')} {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('stories.title')}</title>
        <meta name="description" content={t('stories.description')} />
        <meta name="keywords" content={t('stories.keywords')} />
        <meta property="og:title" content={t('stories.title')} />
        <meta property="og:description" content={t('stories.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://timetosleep.org/stories" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": t('stories.title'),
          "description": t('stories.description'),
          "url": "https://timetosleep.org/stories",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": tags.map((tag, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "CreativeWork",
                "name": tag.name,
                "url": `https://timetosleep.org/stories/${tag.slug}`,
                "genre": "Children's Literature"
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
              "name": t('header.stories'),
              "item": "https://timetosleep.org/stories"
            }
          ]
        })}
        </script>
      </Helmet>

      <div className="px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-4 md:py-5">
        <div className="w-full max-w-[960px] flex flex-col flex-1">
          {/* Breadcrumbs */}
          <div className="px-4 py-3">
            <Breadcrumbs 
              items={[
                { name: t('common.home'), path: '/' },
                { name: t('header.stories'), path: '/stories', isCurrent: true }
              ]}
            />
          </div>

          {/* Page Title */}
          <div className="px-4 py-3">
            <h1 className="text-[#101619] text-xl md:text-2xl lg:text-[32px] font-bold leading-tight tracking-[-0.015em]">
              {t('stories.title')}
            </h1>
            <p className="text-[#577c8e] text-sm md:text-base font-normal leading-normal mt-2">
              {t('stories.description')}
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 p-4">
            {tags.map(tag => (
              <Link key={tag.id} to={`/stories/${tag.slug}`} className="flex flex-col gap-3 md:gap-4 rounded-lg">
                <div 
                  className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg flex flex-col items-center justify-center text-white"
                  style={{ backgroundColor: tag.color }}
                >
                  <div className="text-2xl md:text-4xl mb-1 md:mb-2">📚</div>
                  <div className="text-xs md:text-sm text-center px-1 md:px-2">{tag.name}</div>
                </div>
                <p className="text-[#101619] text-sm md:text-base font-medium leading-normal text-center">{tag.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StoriesPage; 