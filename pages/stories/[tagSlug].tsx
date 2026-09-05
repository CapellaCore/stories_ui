import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import SimpleHeader from '../../src/components/SimpleHeader';
import SimpleFooter from '../../src/components/SimpleFooter';
import Pagination from '../../src/components/Pagination';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import StoryCard from "../../src/components/StoryCard";
import {StoriesByTagPageProps} from "../../src/types/interfaces";
import { seoOptimizedService } from '../../src/services/seo-optimized';
import { PaginationService } from '../../src/services/pagination';
import { generateTagHreflangLinks, generateTagCanonicalUrl } from '../../src/utils/hreflang';
import { ISR_REVALIDATE_SECONDS, STORIES_PER_PAGE, SUPPORTED_LOCALES, localeStaticPath } from '../../src/constants';

const StoriesByTagPage: React.FC<StoriesByTagPageProps> = ({ tag, stories, pagination, paginationUrls, locale }) => {
  const { t } = useTranslation('common');
  const currentLocale = locale || 'en';
  
  // Generate hreflang links for SEO
  const hreflangLinks = generateTagHreflangLinks(tag?.slug || '', currentLocale);
  const canonicalUrl = generateTagCanonicalUrl(tag?.slug || '', currentLocale);

  if (!tag) {
    return (
      <div className="min-h-screen flex flex-col">
        <SimpleHeader />
        <main className="flex-1">
          <div className="px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-4 md:py-5">
            <div className="w-full max-w-[960px] flex flex-col flex-1">
              <div className="text-center text-red-600 p-4">
                Category not found
              </div>
            </div>
          </div>
        </main>
        <SimpleFooter />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`${tag.name} - Stories`}</title>
        <meta name="title" content={`${tag.name} - Stories`} />
        <meta name="description" content={tag.description || `Stories in category ${tag.name}`} />
        <meta name="keywords" content={`${tag.name}, stories, category, time to sleep`} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Hreflang links for SEO */}
        {hreflangLinks.map(link => (
          <link key={link.hrefLang} rel="alternate" hrefLang={link.hrefLang} href={link.href} />
        ))}
        
        {/* Open Graph */}
        <meta property="og:title" content={`${tag.name} - Stories`} />
        <meta property="og:description" content={tag.description || `Stories in category ${tag.name}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content={t('common.siteName')} />
        <meta property="og:image" content="https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" />
        
        {/* Twitter Card */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={`${tag.name} - Stories`} />
        <meta property="twitter:description" content={tag.description || `Stories in category ${tag.name}`} />
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
          "name": `${tag.name} - Stories`,
          "description": tag.description || `Stories in category ${tag.name}`,
          "url": canonicalUrl,
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": stories.map((story, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Article",
                "headline": story.title,
                "url": `https://timetosleep.org/stories/${tag.slug}/${story.slug}`,
                "genre": "Children's Literature",
                "description": story.description,
                "image": story.images.length > 0 ? story.images[0].src : "https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg"
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
              "item": "https://timetosleep.org/stories"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": tag.name,
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
                  <Link href="/stories" className="hover:text-[#101619] transition-colors">
                      {t("header.stories")}
                  </Link>
                  <span>/</span>
                  <span className="text-[#101619]">{tag.name}</span>
                </nav>
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

              {/* Stories Section */}
              <h2 className="text-[#101619] text-lg md:text-xl lg:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                  {t("storiesByTag.description")} ({pagination.total})
              </h2>
              <div className="px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {stories.map(story => (
                    <StoryCard 
                      key={story.id}
                      story={story} 
                      tagSlug={tag.slug} 
                    />
                  ))}
                </div>
                
                <Pagination
                  urls={paginationUrls}
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  basePath={`/stories/${tag.slug}`}
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
 * OPTIMIZED getStaticPaths for multi-language SEO
 * Generates paths for both English (no locale) and Polish (with locale)
 */
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const paths = [];

    for (const locale of SUPPORTED_LOCALES) {
      const tags = await seoOptimizedService.getTagsForStaticPaths(locale);
      const localePaths = tags.map(tag => localeStaticPath(locale, { tagSlug: tag.slug }));
      
      paths.push(...localePaths);
    }

    console.log(`Generated ${paths.length} static paths for tag pages`);
    
    return {
      paths,
      fallback: 'blocking'
    };
  } catch (error) {
    console.error('Error generating tag paths:', error);
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
};

/**
 * OPTIMIZED getStaticProps with proper language handling and fallbacks
 */
export const getStaticProps: GetStaticProps<StoriesByTagPageProps> = async ({ params, locale }) => {
  try {
    const { tagSlug } = params as { tagSlug: string };
    const language = locale || 'en'; // Default to English if no locale
    
    // Get tag and stories data with fallback strategy
    const tag = await seoOptimizedService.getTagForStaticProps(tagSlug, language);

    if (!tag) {
      return {
        notFound: true
      };
    }

    const result = await seoOptimizedService.getStoriesByTagPaginated(tagSlug, {
      page: 1,
      limit: STORIES_PER_PAGE,
      language,
    });

    const paginationUrls = PaginationService.generatePaginationUrls(
      `/stories/${tagSlug}`,
      1,
      result.pagination.totalPages,
      language
    );

    return {
      props: {
        tagSlug,
        tag,
        stories: result.data,
        pagination: result.pagination,
        paginationUrls,
        locale: language,
        ...(await serverSideTranslations(language, ['common']))
      },
      revalidate: ISR_REVALIDATE_SECONDS
    };
  } catch (error) {
    console.error('Error fetching tag data:', error);
    return {
      notFound: true
    };
  }
};

export default StoriesByTagPage;