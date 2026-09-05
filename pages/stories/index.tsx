import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SimpleHeader from '../../src/components/SimpleHeader';
import SimpleFooter from '../../src/components/SimpleFooter';
import Pagination from '../../src/components/Pagination';
import {StoriesPageProps} from "../../src/types/interfaces";
import StoryCard from "../../src/components/StoryCard";
import type {GetStaticProps, GetStaticPropsContext} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import { seoOptimizedService } from '../../src/services/seo-optimized';
import { PaginationService } from '../../src/services/pagination';
import { generateStoriesIndexHreflangLinks, generateStoriesIndexCanonicalUrl } from '../../src/utils/hreflang';
import { ISR_REVALIDATE_SECONDS, STORIES_PER_PAGE } from '../../src/constants';

const StoriesPage: React.FC<StoriesPageProps> = ({ categories, stories, pagination, paginationUrls, locale }) => {
  const { t } = useTranslation('common');
  const currentLocale = locale || 'en';
  
  // Generate hreflang links for SEO
  const hreflangLinks = generateStoriesIndexHreflangLinks(currentLocale);
  const canonicalUrl = generateStoriesIndexCanonicalUrl(currentLocale);

  return (
    <>
      <Head>
        <title>{t('stories.title')}</title>
        <meta name="title" content={t('stories.title')} />
        <meta name="description" content={t('stories.description')} />
        <meta name="keywords" content={t('stories.keywords')} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Hreflang links for SEO */}
        {hreflangLinks.map(link => (
          <link key={link.hrefLang} rel="alternate" hrefLang={link.hrefLang} href={link.href} />
        ))}
        
        {/* Open Graph */}
        <meta property="og:title" content={t('stories.title')} />
        <meta property="og:description" content={t('stories.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Time to Sleep" />
        <meta property="og:image" content="https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" />
        
        {/* Twitter Card */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={t('stories.title')} />
        <meta property="twitter:description" content={t('stories.description')} />
        <meta property="twitter:site" content="@timetosleep" />
        <meta property="twitter:image" content="https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" />
        
        {/* Additional meta tags for better SEO */}
        <meta name="author" content="Konstantin Dylko" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="en" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Stories - Time to Sleep",
          "description": "Browse all story categories and find the perfect bedtime story for your child on Time to Sleep.",
          "url": canonicalUrl,
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": categories.map((tag, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Article",
                "headline": tag.name,
                "url": `https://timetosleep.org/stories/${tag.slug}`,
                "genre": "Children's Literature",
                "image": "https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg"
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
              "name": t("common.home"),
              "item": "https://timetosleep.org"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": t("header.stories"),
              "item": canonicalUrl
            }
          ]
        })}
        </script>
      </Head>

      <div className="min-h-screen flex flex-col">
        <SimpleHeader />
        
        <main className="flex-1">
          <div className="px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-4 md:py-5">
            <div className="w-full max-w-[960px] flex flex-col flex-1">
              {/* Breadcrumbs */}
              <div className="px-4 py-3">
                <nav className="flex items-center space-x-2 text-sm text-[#577c8e]">
                  <Link href="/" className="hover:text-[#101619] transition-colors">
                      {t("common.home")}
                  </Link>
                  <span>/</span>
                  <span className="text-[#101619]">{t("header.stories")}</span>
                </nav>
              </div>

              {/* Page Title */}
              <div className="px-4 py-3">
                <h1 className="text-[#101619] text-xl md:text-2xl lg:text-[32px] font-bold leading-tight tracking-[-0.015em]">
                    {t("stories.pageTitle")}
                </h1>
                <p className="text-[#577c8e] text-sm md:text-base font-normal leading-normal mt-2">
                    {t("stories.pageDescription")}
                </p>
              </div>

              {/* Categories Section */}
              <div className="px-4 py-6">
                <h2 className="text-[#101619] text-lg md:text-xl lg:text-[22px] font-semibold leading-tight tracking-[-0.015em] mb-4">
                    {t("stories.categories")}
                </h2>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {categories.map((tagItem) => (
                    <Link
                      key={tagItem.id}
                      href={`/stories/${tagItem.slug}`}
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

              {/* All Stories Section */}
              <h2 className="text-[#101619] text-lg md:text-xl lg:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                  {t("home.allStories")} ({pagination.total})
              </h2>
              <div className="px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {stories.map(story => (
                    <StoryCard 
                      key={story.id}
                      story={story} 
                      tagSlug={story.tags[0]?.toLowerCase() || 'stories'} 
                    />
                  ))}
                </div>
                
                <Pagination
                  urls={paginationUrls}
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  basePath="/stories"
                  locale={currentLocale}
                />
              </div>
            </div>
          </div>
        </main>

        <SimpleFooter />
      </div>
    </>
  );
};

/**
 * OPTIMIZED getStaticProps with proper language handling and fallbacks
 * This will be called for both English (no locale) and Polish (with locale)
 */
export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
  try {
    const language = locale || 'en';
    const [{ categories }, result] = await Promise.all([
      seoOptimizedService.getStoriesForHomePage(language, 1),
      seoOptimizedService.getStoriesByLanguagePaginated({
        page: 1,
        limit: STORIES_PER_PAGE,
        language,
      }),
    ]);

    const paginationUrls = PaginationService.generatePaginationUrls(
      '/stories',
      1,
      result.pagination.totalPages,
      language
    );

    return {
      props: {
        categories,
        stories: result.data,
        pagination: result.pagination,
        paginationUrls,
        locale: language,
        ...(await serverSideTranslations(language, ['common'])),
      },
      revalidate: ISR_REVALIDATE_SECONDS
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        categories: [],
        stories: [],
        pagination: { page: 1, limit: STORIES_PER_PAGE, total: 0, totalPages: 0, hasNext: false, hasPrev: false },
        paginationUrls: [],
        ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      },
      revalidate: ISR_REVALIDATE_SECONDS
    };
  }
};

export default StoriesPage;