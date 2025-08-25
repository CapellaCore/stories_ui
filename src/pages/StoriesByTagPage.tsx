import React from 'react';
import { useTranslation } from '../contexts/TranslationContext';
import { useStoriesByTag } from '../hooks/useStories';
import { useTag } from '../hooks/useTags';
import LoadingSpinner from '../components/LoadingSpinner';
import StoriesList from '../components/StoriesList';
import Breadcrumbs from '../components/Breadcrumbs';
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";

interface StoriesByTagSectionProps {
  tagSlug: string;
  showAll?: boolean;
  maxVisible?: number;
  homePage?: boolean;
}

const StoriesByTagSection: React.FC<StoriesByTagSectionProps> = ({
  tagSlug,
  showAll = false,
  maxVisible = 6,
  homePage = false
}) => {
    const { t, language } = useTranslation();
    const { tag, loading: tagLoading, error: tagError } = useTag(tagSlug);
    const { stories, loading: storiesLoading, error: storiesError } = useStoriesByTag(tagSlug);
    const prefix = language && language !== "en" ? `/${language}` : "";

    if (tagLoading || storiesLoading) {
        return <LoadingSpinner message={t('storiesByTag.loading')} size="large" />;
    }

    if (tagError || storiesError || !tag) {
        return (
            <div className="text-center text-red-600 p-4">
                {tagError || storiesError || t('storiesByTag.tagNotFound')}
            </div>
        );
    }
  return homePage ? (
      <section className="mb-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4">
              <div>
                  <h2 className="text-[#101619] text-lg md:text-xl lg:text-[22px] font-bold leading-tight">
                      <Link to={`${prefix}/stories/${tag.slug}`} className="hover:underline">
                          {tag.name}
                      </Link>
                  </h2>
                  <p className="text-[#577c8e] text-sm md:text-base">{tag.description}</p>
              </div>
          </div>
          <StoriesList
              stories={stories}
              tagSlug={tag.slug}
              showAll={showAll}
              maxVisible={maxVisible}
              className="mt-4"
          />
      </section>
  ) : (
      <>
        <Helmet>
          <title>{tag.name} - {t('storiesByTag.title')}</title>
          <meta name="description" content={tag.description || `${t('storiesByTag.description')} ${tag.name}`} />
          <meta name="keywords" content={`${tag.name}, ${t('storiesByTag.keywords')}`} />
          <meta property="og:title" content={`${tag.name} - ${t('storiesByTag.title')}`} />
          <meta property="og:description" content={tag.description || `${t('storiesByTag.description')} ${tag.name}`} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://timetosleep.org/${prefix}stories/${tag.slug}`} />
          <meta property="og:image" content="https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" />
          
          {/* Twitter Card */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content={`${tag.name} - ${t('storiesByTag.title')}`} />
          <meta property="twitter:description" content={tag.description || `${t('storiesByTag.description')} ${tag.name}`} />
          <meta property="twitter:image" content="https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" />
          
          {/* Structured Data */}
          <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `${tag.name} - ${t('storiesByTag.title')}`,
            "description": tag.description || `${t('storiesByTag.description')} ${tag.name}`,
            "url": `https://timetosleep.org/${prefix}stories/${tag.slug}`,
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": stories.map((story, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "CreativeWork",
                  "name": story.title,
                  "url": `https://timetosleep.org/${prefix}stories/${tag.slug}/${story.slug}`,
                  "genre": "Children's Literature",
                  "description": story.description
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
                "item": `https://timetosleep.org/${prefix}stories`,
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": tag.name,
                "item": `https://timetosleep.org/${prefix}stories/${tag.slug}`
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
                  { name: t('header.stories'), path: `${prefix}/stories` },
                  { name: tag.name, path: `${prefix}/stories/${tag.slug}`, isCurrent: true }
                ]}
              />
            </div>

            {/* Page Title */}
            <div className="px-4 py-3">
              <h1 className="text-[#101619] text-xl md:text-2xl lg:text-[32px] font-bold leading-tight tracking-[-0.015em]">
                {tag.name}
              </h1>
              {tag.description && (
                <p className="text-[#577c8e] text-sm md:text-base font-normal leading-normal mt-2">
                  {tag.description}
                </p>
              )}
            </div>



            <h2 className="text-[#101619] text-lg md:text-xl lg:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              {t('home.allStories')}
            </h2>
            <StoriesList
                stories={stories}
                tagSlug={tag.slug}
                showAll={showAll}
                maxVisible={maxVisible}
                className="mt-4"
            />
          </div>
        </div>
      </>
  );
};

export default StoriesByTagSection;