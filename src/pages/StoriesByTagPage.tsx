import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../contexts/TranslationContext';
import { useStoriesByTag } from '../hooks/useStories';
import { useTag } from '../hooks/useTags';
import LoadingSpinner from '../components/LoadingSpinner';
import Breadcrumbs, { BreadcrumbItem } from '../components/Breadcrumbs';
import StoriesList from '../components/StoriesList';

const StoriesByTagPage: React.FC = () => {
  const { tagSlug } = useParams<{ tagSlug: string }>();
  const { t } = useTranslation();
  const { tag, loading: tagLoading, error: tagError } = useTag(tagSlug || '');
  const { stories: filteredStories, loading: storiesLoading, error: storiesError } = useStoriesByTag(tagSlug || '');

  if (tagLoading || storiesLoading) {
    return (
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <LoadingSpinner message={t('storiesByTag.loading')} size="large" />
        </div>
      </div>
    );
  }

  if (tagError || storiesError || !tag) {
    return (
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-red-600">
              {tagError || storiesError || t('storiesByTag.tagNotFound')}
            </div>
            <Link to="/stories" className="mt-4 text-blue-600 hover:underline">
              {t('storiesByTag.backToStories')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${tag.name} - ${t('storiesByTag.title')}`}</title>
        <meta name="description" content={`${t('storiesByTag.description')} ${tag.name}. ${tag.description}`} />
        <meta name="keywords" content={`${t('storiesByTag.keywords')} ${tag.name}`} />
        <meta property="og:title" content={`${tag.name} - ${t('storiesByTag.title')}`} />
        <meta property="og:description" content={`${t('storiesByTag.description')} ${tag.name}. ${tag.description}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://bedtime-stories.com/stories/${tag.slug}`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": `${tag.name} - ${t('storiesByTag.storiesTitle')}`,
          "description": tag.description,
          "url": `https://bedtime-stories.com/stories/${tag.slug}`,
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": filteredStories.map((story, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "CreativeWork",
                "name": story.title,
                "url": `https://bedtime-stories.com/stories/${tag.slug}/${story.slug}`,
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
              "name": "Główna",
              "item": "https://bedtime-stories.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Bajki",
              "item": "https://bedtime-stories.com/stories"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": tag.name,
              "item": `https://bedtime-stories.com/stories/${tag.slug}`
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
                { name: 'Główna', path: '/' },
                { name: 'Bajki', path: '/stories' },
                { name: tag.name, path: `/stories/${tag.slug}`, isCurrent: true }
              ]}
            />
          </div>
          
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex min-w-72 flex-col gap-3">
              <p className="text-[#101619] tracking-light text-[32px] font-bold leading-tight">{tag.name}</p>
              <p className="text-[#577c8e] text-sm font-normal leading-normal">{tag.description}</p>
              <p className="text-[#577c8e] text-sm font-normal leading-normal">{`${t('storiesByTag.storiesCount')}: ${filteredStories.length}`}</p>
            </div>
          </div>
          
          <h2 className="text-[#101619] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            {`${t('storiesByTag.storiesInCategory')} "${tag.name}"`}
          </h2>
          <StoriesList stories={filteredStories} tagSlug={tag.slug} showAll={true} maxVisible={6} />
        </div>
      </div>
    </>
  );
};

export default StoriesByTagPage; 