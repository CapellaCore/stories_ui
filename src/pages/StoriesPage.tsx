import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../contexts/TranslationContext';
import { useTags } from '../hooks/useTags';
import LoadingSpinner from '../components/LoadingSpinner';
import Breadcrumbs from '../components/Breadcrumbs';
import StoriesList from "../components/StoriesList";
import {useStories} from "../hooks/useStories";
import { Link } from 'react-router-dom';

const StoriesPage: React.FC = () => {
  const { t } = useTranslation();
  const { tags, loading, error } = useTags();
  const { stories } = useStories();

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
        <meta property="og:image" content="https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" />
        
        {/* Twitter Card */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={t('stories.title')} />
        <meta property="twitter:description" content={t('stories.description')} />
        <meta property="twitter:image" content="https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" />
        
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
                      {/* Tags Section */}
            <div className="px-4 py-6">
              <h2 className="text-[#101619] text-lg md:text-xl lg:text-[22px] font-semibold leading-tight tracking-[-0.015em] mb-4">
                {t('stories.categories')}
              </h2>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {tags.map((tagItem) => (
                  <Link
                    key={tagItem.id}
                    to={`/stories/${tagItem.slug}`}
                    className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-white text-gray-700 border border-gray-200 hover:border-purple-300 hover:shadow-md hover:shadow-purple-100 hover:text-purple-700"
                    style={{
                      backgroundColor: tagItem.color + '10',
                      borderColor: tagItem.color + '30',
                    }}
                  >
                    <span 
                      className="w-2 h-2 rounded-full mr-2 flex-shrink-0"
                      style={{ backgroundColor: tagItem.color }}
                    ></span>
                    {tagItem.name}
                  </Link>
                ))}
              </div>
            </div>

            <h2 className="text-[#101619] text-lg md:text-xl lg:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">{t('home.allStories')}</h2>
            <StoriesList stories={stories} showAll={true} maxVisible={6}/>
        </div>
      </div>
    </>
  );
};

export default StoriesPage; 