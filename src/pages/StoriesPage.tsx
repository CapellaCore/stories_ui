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
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <LoadingSpinner message={t('stories.loadingTags')} size="large" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
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

      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          {/* Breadcrumbs */}
          <div className="px-4 py-3">
            <Breadcrumbs 
              items={[
                { name: t('common.home'), path: '/' },
                { name: t('header.stories'), path: '/stories', isCurrent: true }
              ]}
            />
          </div>
          
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex min-w-72 flex-col gap-3">
              <p className="text-[#101619] tracking-light text-[32px] font-bold leading-tight">{t('stories.pageTitle')}</p>
              <p className="text-[#577c8e] text-sm font-normal leading-normal">{t('stories.pageDescription')}</p>
            </div>
          </div>
          
          <h2 className="text-[#101619] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">{t('stories.categories')}</h2>
          <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-stretch p-4 gap-3">
              {/* All stories category */}
              <Link to="/stories/all" className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
                <div 
                  className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg flex flex-col items-center justify-center text-white"
                  style={{ backgroundColor: '#6366f1' }}
                >
                  <div className="text-4xl mb-2">📚</div>
                  <div className="text-sm text-center px-2">{t('stories.pageTitle')}</div>
                </div>
                <p className="text-[#101619] text-base font-medium leading-normal">{t('stories.pageTitle')}</p>
              </Link>
              
              {/* Other categories */}
              {tags.map(tag => (
                <Link key={tag.id} to={`/stories/${tag.slug}`} className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
                  <div 
                    className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg flex flex-col items-center justify-center text-white"
                    style={{ backgroundColor: tag.color }}
                  >
                    <div className="text-4xl mb-2">📚</div>
                    <div className="text-sm text-center px-2">{tag.name}</div>
                  </div>
                  <p className="text-[#101619] text-base font-medium leading-normal">{tag.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoriesPage; 