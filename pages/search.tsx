import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SimpleHeader from '../src/components/SimpleHeader';
import SimpleFooter from '../src/components/SimpleFooter';
import {SearchPageProps} from "../src/types/interfaces";
import {useRouter} from "next/router";
import StoryCard from "../src/components/StoryCard";
import {SSRConfig, useTranslation} from 'next-i18next';
import { GetServerSideProps } from 'next';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


const SearchPage: React.FC<SearchPageProps & SSRConfig> = ({ initialStories, query: initialQuery }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery || '');
  const [stories, setStories] = useState(initialStories);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const locale = router.locale ?? 'en';
  const { t } = useTranslation('common');


    useEffect(() => {
    const searchStories = async () => {
      if (!searchQuery.trim()) {
        // If no query, show all stories
        try {
          const { storiesApi } = await import('../src/services/supabase');
          const allStories = await storiesApi.getAllByLanguage(locale ?? 'en');
          setStories(allStories);
        } catch (error) {
          console.error('Error fetching all stories:', error);
        }
        return;
      }

      setIsSearching(true);
      try {
        const { storiesApi } = await import('../src/services/supabase');
        const searchResults = await storiesApi.search(searchQuery, locale ?? 'en');
        setStories(searchResults);
      } catch (error) {
        console.error('Error searching stories:', error);
        setStories([]);
      } finally {
        setIsSearching(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(searchStories, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, locale]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  return (
    <>
      <Head>
        <title>Search - Time to Sleep</title>
        <meta name="title" content="Search - Time to Sleep" />
        <meta name="description" content="Find the perfect bedtime story for your child on Time to Sleep. Search by title, description, or content." />
        <meta name="keywords" content="search stories, story search, children's stories, bedtime stories, time to sleep" />
        <link rel="canonical" href={`https://timetosleep.org/search${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Search - Time to Sleep" />
        <meta property="og:description" content="Find the perfect bedtime story for your child on Time to Sleep. Search by title, description, or content." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://timetosleep.org/search${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`} />
        <meta property="og:site_name" content="Time to Sleep" />
        <meta property="og:image" content="https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" />
        
        {/* Twitter Card */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Search - Time to Sleep" />
        <meta property="twitter:description" content="Find the perfect bedtime story for your child on Time to Sleep. Search by title, description, or content." />
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
          "@type": "SearchResultsPage",
          "name": "Search - Time to Sleep",
          "description": "Find the perfect bedtime story for your child on Time to Sleep. Search by title, description, or content.",
          "url": `https://timetosleep.org/search${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`,
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": stories.map((story, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Article",
                "headline": story.title,
                "url": `https://timetosleep.org/stories/${story.tags[0]?.toLowerCase() || 'stories'}/${story.slug}`,
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
              "name": t("search.pageName"),
              "item": "https://timetosleep.org/search"
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
                  <span className="text-[#101619]">{t("search.pageName")}</span>
                </nav>
              </div>

              {/* Page Title */}
              <div className="px-4 py-3">
                <h1 className="text-[#101619] text-xl md:text-2xl lg:text-[32px] font-bold leading-tight tracking-[-0.015em]">
                    {t("search.pageTitle")}
                </h1>
                <p className="text-[#577c8e] text-sm md:text-base font-normal leading-normal mt-2">
                    {t("search.pageDescription")}
                </p>
              </div>

              {/* Search Form */}
              <div className="px-4 py-6">
                <form onSubmit={handleSearch} className="max-w-2xl">
                  <div className="flex items-center bg-[#e9eff1] rounded-lg h-12 px-4 gap-3">
                    <div className="text-[#101619]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t("search.placeholder")}
                      className="flex-1 bg-transparent border-none outline-none text-[#101619] text-base placeholder-[#577c8e]"
                      autoComplete="off"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="text-[#577c8e] hover:text-[#101619] transition-colors"
                        aria-label={t("search.clear")}
                      >
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Search Results */}
              <div className="px-4">
                {searchQuery && (
                  <div className="mb-6">
                    <h2 className="text-[#101619] text-lg md:text-xl lg:text-[22px] font-bold leading-tight tracking-[-0.015em] mb-2">
                        {t("search.resultsFor")}
                    </h2>
                    <p className="text-[#577c8e] text-sm">
                        {t("search.foundResults", { count: stories.length, query: searchQuery })}

                    </p>
                  </div>
                )}

                {isSearching && (
                  <div className="text-center py-8">
                    <div className="text-[#577c8e]">{t("search.searching")}</div>
                  </div>
                )}

                {!isSearching && stories.length === 0 && searchQuery && (
                  <div className="text-center py-8">
                    <div className="text-[#577c8e] text-lg mb-4">{t("search.noResults")}</div>
                    <p className="text-[#577c8e] text-sm mb-6">
                        {t("search.noResultsDescription")}
                    </p>
                    <Link 
                      href="/stories"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {t("search.browseAllStories")}
                    </Link>
                  </div>
                )}

                {!isSearching && stories.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    {stories.map(story => (
                      <StoryCard 
                        key={story.id}
                        story={story} 
                        tagSlug={story.tags[0]?.toLowerCase() || 'stories'} 
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <SimpleFooter />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SearchPageProps & SSRConfig> = async ({ query, locale }) => {
  try {
      const q = typeof query.q === 'string' ? query.q : '';


      const { storiesApi } = await import('../src/services/supabase');

      const stories = q
          ? await storiesApi.search(q)
          : await storiesApi.getAllByLanguage(locale ?? 'en');


      return {
      props: {
        initialStories: stories,
        query: q || null,
          ...(await serverSideTranslations(locale ?? 'en', ['common'])),

      }
    };
  } catch (error) {
    console.error('Error fetching search data:', error);
    return {
      props: {
        initialStories: [],
        query: null,
          ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      }
    };
  }
};

export default SearchPage;
