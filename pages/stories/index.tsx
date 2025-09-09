import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SimpleHeader from '../../src/components/SimpleHeader';
import SimpleFooter from '../../src/components/SimpleFooter';
import LoadMoreButton from '../../src/components/LoadMoreButton';
import {StoriesPageProps} from "../../src/types/interfaces";
import StoryCard from "../../src/components/StoryCard";
import type {GetStaticProps, GetStaticPropsContext} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import { seoOptimizedService } from '../../src/services/seo-optimized';
import { generateStoriesIndexHreflangLinks, generateStoriesIndexCanonicalUrl } from '../../src/utils/hreflang';

const StoriesPage: React.FC<StoriesPageProps> = ({ categories, allStories, locale }) => {
  const [displayedStories, setDisplayedStories] = useState(12);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setDisplayedStories(prev => Math.min(prev + 12, allStories.length));
      setLoading(false);
    }, 500);
  };

  const hasMore = displayedStories < allStories.length;
  const currentStories = allStories.slice(0, displayedStories);
  const { t } = useTranslation('common');
  const currentLocale = locale || 'en';
  
  // Generate hreflang links for SEO
  const hreflangLinks = generateStoriesIndexHreflangLinks(currentLocale);
  const canonicalUrl = generateStoriesIndexCanonicalUrl(currentLocale);

  return (
    <>
      <Head>
        <title>Stories - Time to Sleep</title>
        <meta name="title" content="Stories - Time to Sleep" />
        <meta name="description" content="Browse all story categories and find the perfect bedtime story for your child on Time to Sleep." />
        <meta name="keywords" content="stories, story categories, children's stories, bedtime stories, time to sleep" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Hreflang links for SEO */}
        {hreflangLinks.map(link => (
          <link key={link.hrefLang} rel="alternate" hrefLang={link.hrefLang} href={link.href} />
        ))}
        
        {/* Open Graph */}
        <meta property="og:title" content="Stories - Time to Sleep" />
        <meta property="og:description" content="Browse all story categories and find the perfect bedtime story for your child on Time to Sleep." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Time to Sleep" />
        <meta property="og:image" content="https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" />
        
        {/* Twitter Card */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Stories - Time to Sleep" />
        <meta property="twitter:description" content="Browse all story categories and find the perfect bedtime story for your child on Time to Sleep." />
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
                  {t("home.allStories")} ({allStories.length})
              </h2>
              <div className="px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {currentStories.map(story => (
                    <StoryCard 
                      key={story.id}
                      story={story} 
                      tagSlug={story.tags[0]?.toLowerCase() || 'stories'} 
                    />
                  ))}
                </div>
                
                {/* Load More Button */}
                <LoadMoreButton
                  onLoadMore={handleLoadMore}
                  hasMore={hasMore}
                  loading={loading}
                  totalItems={allStories.length}
                  currentItems={currentStories.length}
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
    const language = locale || 'en'; // Default to English if no locale
    
    // Get optimized data for stories page
    const { stories, categories } = await seoOptimizedService.getStoriesForHomePage(language);

    return {
      props: {
        categories,
        allStories: stories, // All stories for this language
        locale: language,
        ...(await serverSideTranslations(language, ['common'])),
      },
      revalidate: 60 // Revalidate every minute for fresh content
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        categories: [],
        allStories: [],
        ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      },
      revalidate: 60
    };
  }
};

export default StoriesPage;