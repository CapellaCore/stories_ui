import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/TranslationContext';
import { useStories } from '../hooks/useStories';
import { useTags } from '../hooks/useTags';
import LoadingSpinner from '../components/LoadingSpinner';
import StoriesList from '../components/StoriesList';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { stories, loading: storiesLoading, error: storiesError } = useStories();
  const { tags, loading: tagsLoading, error: tagsError } = useTags();

  if (storiesLoading || tagsLoading) {
    return (
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <LoadingSpinner message={t('home.loadingStories')} size="large" />
        </div>
      </div>
    );
  }

  if (storiesError || tagsError) {
    return (
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-red-600">
              {t('home.errorLoadingData')} {storiesError || tagsError}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('home.title')}</title>
        <meta name="description" content={t('home.description')} />
        <meta name="keywords" content={t('home.keywords')} />
        <meta property="og:title" content={t('home.title')} />
        <meta property="og:description" content={t('home.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://timetosleep.org/" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": t('home.title'),
          "description": t('home.description'),
          "url": "https://timetosleep.org/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://timetosleep.org/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
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
              "name": "Главная",
              "item": "https://timetosleep.org"
            }
          ]
        })}
        </script>
      </Helmet>

      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex min-w-72 flex-col gap-3">
              <p className="text-[#101619] tracking-light text-[32px] font-bold leading-tight">{t('home.welcomeTitle')}</p>
              <p className="text-[#577c8e] text-sm font-normal leading-normal">{t('home.welcomeDescription')}</p>
            </div>
          </div>
          
          <h2 className="text-[#101619] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">{t('home.allStories')}</h2>
          <StoriesList stories={stories} tagSlug="all" showAll={true} maxVisible={6} />
          
          <h2 className="text-[#101619] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">{t('home.categories')}</h2>
          <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-stretch p-4 gap-3">
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

export default HomePage; 