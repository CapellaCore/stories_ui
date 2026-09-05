import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import SimpleHeader from '../../../src/components/SimpleHeader';
import SimpleFooter from '../../../src/components/SimpleFooter';
import StoryContent from '../../../src/components/StoryContent';
import AudioPlayer from '../../../src/components/AudioPlayer';
import OptimizedImage from '../../../src/components/OptimizedImage';
import { ISR_REVALIDATE_SECONDS, SUPPORTED_LOCALES, localeStaticPath } from '../../../src/constants';
import {StoryPageProps} from "../../../src/types/interfaces";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import { seoOptimizedService } from '../../../src/services/seo-optimized';
import { generateStoryHreflangLinks, generateStoryCanonicalUrl } from '../../../src/utils/hreflang';

const StoryPage: React.FC<StoryPageProps & { locale?: string }> = ({ tagSlug, storySlug, story, tag, locale }) => {
    const { t } = useTranslation('common');
    const currentLocale = locale || 'en';
    
    // Generate hreflang links for SEO
    const hreflangLinks = generateStoryHreflangLinks(storySlug, tagSlug, currentLocale);
    const canonicalUrl = generateStoryCanonicalUrl(storySlug, tagSlug, currentLocale);
    if (!story || !tag) {
    return (
      <div className="min-h-screen flex flex-col">
        <SimpleHeader />
        <main className="flex-1">
          <div className="px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-4 md:py-5">
            <div className="w-full max-w-[960px] flex flex-col flex-1">
              <div className="text-center text-red-600 p-4">
                  {t("stories.notFound")}
              </div>
            </div>
          </div>
        </main>
        <SimpleFooter />
      </div>
    );
  }

  const sortedImages = [...story.images].sort((a, b) => a.position - b.position);
  return (
    <>
      <Head>
        <title>{`${story.title} - ${t('common.siteName')}`}</title>
        <meta name="title" content={`${story.title} - ${t('common.siteName')}`} />
        <meta name="description" content={story.description} />
        <meta name="keywords" content={story.tags.join(', ')} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Hreflang links for SEO */}
        {hreflangLinks.map(link => (
          <link key={link.hrefLang} rel="alternate" hrefLang={link.hrefLang} href={link.href} />
        ))}
        
        {/* Open Graph */}
        <meta property="og:title" content={story.title} />
        <meta property="og:description" content={story.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content={t('common.siteName')} />
        <meta property="og:image" content={sortedImages[0]?.src || "https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg"} />
        
        {/* Twitter Card */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={story.title} />
        <meta property="twitter:description" content={story.description} />
        <meta property="twitter:site" content="@timetosleep" />
        <meta property="twitter:image" content={sortedImages[0]?.src || "https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg"} />
        
        {/* Additional meta tags for better SEO */}
        <meta name="author" content="Konstantin Dylko" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="en" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": story.title,
          "description": story.description,
          "image": sortedImages.length > 0 ? sortedImages[0].src : "https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg",
          "author": {
            "@type": "Person",
            "name": "Konstantin Dylko"
          },
          "datePublished": story.createdAt,
          "dateModified": story.updatedAt,
          "articleSection": tag.name,
          "genre": "Children's Literature",
          "audience": {
            "@type": "Audience",
            "audienceType": "Children",
            "suggestedMinAge": "3",
            "suggestedMaxAge": "8"
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl,
            "url": canonicalUrl,
            "isPartOf": {
              "@type": "WebSite",
              "name": "Time to Sleep",
              "url": "https://timetosleep.org"
            }
          },
          "publisher": {
            "@type": "Organization",
            "name": "Time to Sleep",
            "url": "https://timetosleep.org"
          },
          ...(story.audio && {
            "audio": {
              "@type": "AudioObject",
              "name": story.title,
              "description": story.description,
              "contentUrl": story.audio.audioUrl,
              "encodingFormat": story.audio.mimeType,
              "duration": story.audio.duration ? `PT${story.audio.duration}S` : undefined,
              "author": story.audio.narratorName ? {
                "@type": "Person",
                "name": story.audio.narratorName
              } : {
                "@type": "Person",
                "name": "Time to Sleep"
              }
            }
          })
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
              "item": `https://timetosleep.org/stories/${tagSlug}`
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": story.title,
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
                  <Link href={`/stories/${tagSlug}`} className="hover:text-[#101619] transition-colors">
                    {tag.name}
                  </Link>
                  <span>/</span>
                  <span className="text-[#101619]">{story.title}</span>
                </nav>
              </div>

              {/* Hero Section */}
              <div className="px-4 mb-4 md:mb-6">
                {sortedImages.length > 0 ? (
                  <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden shadow-lg">
                    <OptimizedImage
                      src={sortedImages[0].src}
                      alt={sortedImages[0].alt || story.title}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 960px) 100vw, 960px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 text-white">
                      <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2">{story.title}</h1>
                      <p className="text-sm md:text-lg opacity-90 mb-2 md:mb-3">{story.description}</p>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-4 text-xs md:text-sm opacity-90">
                        <span className="flex items-center gap-1">
                          <span>⏱️</span>
                          <span>{story.readingTime} min</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span>👶</span>
                          <span>{story.ageGroup}</span>
                        </span>
                        {story.tags.length > 0 && (
                          <span className="flex items-center gap-1">
                            <span>🏷️</span>
                            <span>#{story.tags[0]}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <div className="text-4xl md:text-6xl mb-2 md:mb-4">📖</div>
                      <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2">{story.title}</h1>
                      <p className="text-sm md:text-lg opacity-90 mb-2 md:mb-3">{story.description}</p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-4 text-xs md:text-sm opacity-90">
                        <span className="flex items-center gap-1">
                          <span>⏱️</span>
                          <span>{story.readingTime} min</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span>👶</span>
                          <span>{story.ageGroup}</span>
                        </span>
                        {story.tags.length > 0 && (
                          <span className="flex items-center gap-1">
                            <span>🏷️</span>
                            <span>#{story.tags[0]}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Audio Player */}
              {story.audio && (
                <div className="px-4 mb-6 md:mb-8">
                  <div className="max-w-4xl mx-auto">
                    <AudioPlayer 
                      audio={story.audio} 
                      storyTitle={story.title}
                      className="mb-4"
                    />
                  </div>
                </div>
              )}

              {/* Story Content */}
              <div className="px-4 mb-6 md:mb-8">
                <div className="story-content-text max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-4 md:p-8">
                  <StoryContent
                    content={story.content}
                    images={story.images}
                  />
                </div>
              </div>

              {/* Back to Stories */}
              <div className="px-4 pb-8">
                <Link 
                  href={`/stories/${tagSlug}`}
                  className="inline-flex items-center text-[#577c8e] hover:text-[#101619] transition-colors"
                >
                  ← {t("stories.backToStories")}
                </Link>
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
    const paths: any[] = [];

    for (const locale of SUPPORTED_LOCALES) {
      const stories = await seoOptimizedService.getStoriesForStaticPaths(locale);

      const localePaths = stories.map(story => {
        const tagSlug = story.tags[0]?.slug || 'stories';
        return localeStaticPath(locale, {
          tagSlug,
          storySlug: story.slug,
        });
      });
      
      paths.push(...localePaths);
    }

    console.log(`Generated ${paths.length} static paths for stories`);
    
    return {
      paths,
      fallback: 'blocking'
    };
  } catch (error) {
    console.error('Error generating story paths:', error);
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
};

/**
 * OPTIMIZED getStaticProps with proper language handling and fallbacks
 */
export const getStaticProps: GetStaticProps<StoryPageProps> = async ({ params, locale }) => {
  try {
    const { tagSlug, storySlug } = params as { tagSlug: string; storySlug: string };
    const language = locale || 'en'; // Default to English if no locale
    
    // Get story and tag data with fallback strategy
    const { story, tag } = await seoOptimizedService.getStoryForStaticProps(storySlug, language);

    if (!story || !tag) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        tagSlug,
        storySlug,
        story,
        tag,
        locale: language,
        ...(await serverSideTranslations(language, ['common']))
      },
      revalidate: ISR_REVALIDATE_SECONDS
    };
  } catch (error) {
    console.error('Error fetching story data:', error);
    return {
      notFound: true
    };
  }
};

export default StoryPage;