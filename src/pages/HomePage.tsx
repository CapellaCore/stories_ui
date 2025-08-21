import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/TranslationContext';
import { useStories } from '../hooks/useStories';
import { useTags } from '../hooks/useTags';
import LoadingSpinner from '../components/LoadingSpinner';
import StoriesList from '../components/StoriesList';
import StoriesByTagPage from "./StoriesByTagPage";

const HomePage: React.FC = () => {
  const { language, t } = useTranslation();
  const prefix = language && language !== "en" ? `/${language}` : '';
  const { stories, loading: storiesLoading, error: storiesError } = useStories();
  const { loading: tagsLoading, error: tagsError } = useTags();

  if (storiesLoading || tagsLoading) {
    return (
      <div className="px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-4 md:py-5">
        <div className="w-full max-w-[960px] flex flex-col flex-1">
          <LoadingSpinner message={t('home.loadingStories')} size="large" />
        </div>
      </div>
    );
  }

  if (storiesError || tagsError) {
    return (
      <div className="px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-4 md:py-5">
        <div className="w-full max-w-[960px] flex flex-col flex-1">
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
        <meta property="og:image" content="https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" />

        {/* Twitter Card */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={t('home.title')} />
        <meta property="twitter:description" content={t('home.description')} />
        <meta property="twitter:image" content="https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" />

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
            "target": `https://timetosleep.org/${prefix}search?q={search_term_string}`,
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
              "name": "Main",
              "item": "https://timetosleep.org"
            }
          ]
        })}
        </script>
      </Helmet>

      <div className="px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-4 md:py-5">
        <div className="w-full max-w-[960px] flex flex-col flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex w-full md:min-w-72 flex-col gap-3">
              <p className="text-[#101619] tracking-light text-xl md:text-2xl lg:text-[32px] font-bold leading-tight">{t('home.welcomeTitle')}</p>
              <p className="text-[#577c8e] text-sm font-normal leading-normal">{t('home.welcomeDescription')}</p>
            </div>
          </div>

          <StoriesByTagPage tagSlug="animals" showAll={false} maxVisible={3} homePage={true}/>
          <StoriesByTagPage tagSlug="classic" showAll={false} maxVisible={3} homePage={true}/>
          <StoriesByTagPage tagSlug="originals" showAll={false} maxVisible={3} homePage={true}/>

          <h2 className="text-[#101619] text-lg md:text-xl lg:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            <Link to={`${prefix}/stories`} className="hover:underline">
              {t('home.allStories')}
            </Link>
          </h2>

          <StoriesList stories={stories} showAll={false} maxVisible={3}/>
        </div>
      </div>
    </>
  );
};

export default HomePage; 