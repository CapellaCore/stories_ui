import React from 'react';
import Head from 'next/head';
import SimpleHeader from '../../../src/components/SimpleHeader';
import SimpleFooter from '../../../src/components/SimpleFooter';
import StoryCard from '../../../src/components/StoryCard';
import Pagination from '../../../src/components/Pagination';
import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { seoOptimizedService } from '../../../src/services/seo-optimized';
import { PaginationService } from '../../../src/services/pagination';
import { generateStoriesIndexHreflangLinks, generateStoriesIndexCanonicalUrl } from '../../../src/utils/hreflang';
import { ISR_REVALIDATE_SECONDS, STORIES_PER_PAGE, SUPPORTED_LOCALES, localeStaticPath } from '../../../src/constants';

interface StoriesPageProps {
  stories: any[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  paginationUrls: Array<{
    page: number;
    url: string;
    isCurrent: boolean;
  }>;
  locale?: string;
}

const StoriesPage: React.FC<StoriesPageProps> = ({ 
  stories, 
  pagination, 
  paginationUrls, 
  locale 
}) => {
  const { t } = useTranslation('common');
  const currentLocale = locale || 'en';
  
  // Generate hreflang links for SEO
  const hreflangLinks = generateStoriesIndexHreflangLinks(currentLocale);
  const canonicalUrl = generateStoriesIndexCanonicalUrl(currentLocale);

  return (
    <>
      <Head>
        <title>
          {pagination.page > 1 
            ? `Stories - Page ${pagination.page} - ${t('common.siteName')}` 
            : `Stories - ${t('common.siteName')}`
          }
        </title>
        <meta 
          name="title" 
          content={
            pagination.page > 1 
              ? `Stories - Page ${pagination.page} - ${t('common.siteName')}` 
              : `Stories - ${t('common.siteName')}`
          } 
        />
        <meta 
          name="description" 
          content={
            pagination.page > 1 
              ? `Browse all story categories and find the perfect bedtime story for your child on Time to Sleep - Page ${pagination.page}.`
              : 'Browse all story categories and find the perfect bedtime story for your child on Time to Sleep.'
          } 
        />
        <meta name="keywords" content="stories, story categories, children's stories, bedtime stories, time to sleep" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Hreflang links for SEO */}
        {hreflangLinks.map(link => (
          <link key={link.hrefLang} rel="alternate" hrefLang={link.hrefLang} href={link.href} />
        ))}
        
        {/* Open Graph */}
        <meta property="og:title" content={pagination.page > 1 ? `Stories - Page ${pagination.page} - ${t('common.siteName')}` : `Stories - ${t('common.siteName')}`} />
        <meta property="og:description" content="Browse all story categories and find the perfect bedtime story for your child on Time to Sleep." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content={t('common.siteName')} />
        
        {/* Twitter Card */}
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content={pagination.page > 1 ? `Stories - Page ${pagination.page} - ${t('common.siteName')}` : `Stories - ${t('common.siteName')}`} />
        <meta property="twitter:description" content="Browse all story categories and find the perfect bedtime story for your child on Time to Sleep." />
        <meta property="twitter:site" content="@timetosleep" />
        
        {/* Additional meta tags for better SEO */}
        <meta name="author" content="Konstantin Dylko" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content={currentLocale} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": pagination.page > 1 ? `Stories - Page ${pagination.page} - Time to Sleep` : 'Stories - Time to Sleep',
          "description": "Browse all story categories and find the perfect bedtime story for your child on Time to Sleep.",
          "url": canonicalUrl,
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": pagination.total,
            "itemListElement": stories.map((story, index) => ({
              "@type": "ListItem",
              "position": (pagination.page - 1) * pagination.limit + index + 1,
              "item": {
                "@type": "Article",
                "name": story.title,
                "description": story.description,
                "url": `${canonicalUrl}/${story.tags[0]?.toLowerCase()}/${story.slug}`
              }
            }))
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": currentLocale === 'en' ? 'https://timetosleep.org' : `https://timetosleep.org/${currentLocale}`
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Stories",
                "item": canonicalUrl
              }
            ]
          }
        })}
        </script>
      </Head>

      <div className="min-h-screen flex flex-col">
        <SimpleHeader />
        <main className="flex-1">
          <div className="px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-4 md:py-5">
            <div className="w-full max-w-[960px] flex flex-col flex-1">
              {/* Page Header */}
              <div className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {t('stories.allStories')}
                </h1>
                <p className="text-gray-600">
                  {pagination.page > 1 
                    ? `${t('stories.page')} ${pagination.page} ${t('stories.of')} ${pagination.totalPages}`
                    : `${pagination.total} ${t('stories.storiesFound')}`
                  }
                </p>
              </div>

              {/* Stories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {stories.map((story) => (
                  <StoryCard
                    key={story.id}
                    story={story}
                    tagSlug={story.tags[0]?.toLowerCase() || 'stories'}
                  />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                urls={paginationUrls}
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                basePath="/stories"
                locale={currentLocale}
              />
            </div>
          </div>
        </main>
        <SimpleFooter />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: any[] = [];

  for (const language of SUPPORTED_LOCALES) {
    try {
      const result = await seoOptimizedService.getStoriesByLanguagePaginated({
        page: 1,
        limit: STORIES_PER_PAGE,
        language
      });

      const totalPages = result.pagination.totalPages;

      for (let page = 2; page <= totalPages; page++) {
        paths.push(localeStaticPath(language, { page: page.toString() }));
      }
    } catch (error) {
      console.error(`Error generating paths for language ${language}:`, error);
    }
  }

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const language = locale || 'en';
  const page = PaginationService.parsePageFromUrl(params?.page);

  try {
    const result = await seoOptimizedService.getStoriesByLanguagePaginated({
      page,
      limit: STORIES_PER_PAGE,
      language
    });

    if (page > result.pagination.totalPages || result.data.length === 0) {
      return { notFound: true };
    }

    const paginationUrls = PaginationService.generatePaginationUrls(
      '/stories',
      page,
      result.pagination.totalPages,
      language
    );

    return {
      props: {
        stories: result.data,
        pagination: result.pagination,
        paginationUrls,
        locale: language,
        ...(await serverSideTranslations(language, ['common']))
      },
      revalidate: ISR_REVALIDATE_SECONDS
    };
  } catch (error) {
    console.error('Error fetching paginated stories:', error);
    return {
      notFound: true
    };
  }
};

export default StoriesPage;
