import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import SimpleHeader from '../src/components/SimpleHeader';
import SimpleFooter from '../src/components/SimpleFooter';

interface Story {
  id: string;
  title: string;
  description: string;
  slug: string;
  readingTime: number;
  ageGroup: string;
  tags: string[];
  images: Array<{
    id: string;
    src: string;
    alt: string;
    position: number;
  }>;
}

interface SearchPageProps {
  initialStories: Story[];
  query?: string;
}

const SearchPage: React.FC<SearchPageProps> = ({ initialStories, query: initialQuery }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery || '');
  const [stories, setStories] = useState(initialStories);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const searchStories = async () => {
      if (!searchQuery.trim()) {
        // If no query, show all stories
        try {
          const { storiesApi } = await import('../src/services/supabase');
          const allStories = await storiesApi.getAll();
          setStories(allStories);
        } catch (error) {
          console.error('Error fetching all stories:', error);
        }
        return;
      }

      setIsSearching(true);
      try {
        const { storiesApi } = await import('../src/services/supabase');
        const searchResults = await storiesApi.search(searchQuery);
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
  }, [searchQuery]);

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
                "@type": "CreativeWork",
                "name": story.title,
                "url": `https://timetosleep.org/stories/${story.tags[0]?.toLowerCase() || 'stories'}/${story.slug}`,
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
              "name": "Home",
              "item": "https://timetosleep.org"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Search",
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
                    Home
                  </Link>
                  <span>/</span>
                  <span className="text-[#101619]">Search</span>
                </nav>
              </div>

              {/* Page Title */}
              <div className="px-4 py-3">
                <h1 className="text-[#101619] text-xl md:text-2xl lg:text-[32px] font-bold leading-tight tracking-[-0.015em]">
                  Search Stories
                </h1>
                <p className="text-[#577c8e] text-sm md:text-base font-normal leading-normal mt-2">
                  Enter keywords to find stories that interest you on Time to Sleep.
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
                      placeholder="Search stories..."
                      className="flex-1 bg-transparent border-none outline-none text-[#101619] text-base placeholder-[#577c8e]"
                      autoComplete="off"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="text-[#577c8e] hover:text-[#101619] transition-colors"
                        aria-label="Clear search"
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
                      Search results for "{searchQuery}"
                    </h2>
                    <p className="text-[#577c8e] text-sm">
                      Found {stories.length} results
                    </p>
                  </div>
                )}

                {isSearching && (
                  <div className="text-center py-8">
                    <div className="text-[#577c8e]">Searching...</div>
                  </div>
                )}

                {!isSearching && stories.length === 0 && searchQuery && (
                  <div className="text-center py-8">
                    <div className="text-[#577c8e] text-lg mb-4">No results found</div>
                    <p className="text-[#577c8e] text-sm mb-6">
                      Try using different keywords or browse all available stories.
                    </p>
                    <Link 
                      href="/stories"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Browse all stories
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

// StoryCard Component (same as other pages)
const StoryCard: React.FC<{ story: Story; tagSlug: string }> = ({ story, tagSlug }) => {
  const storyUrl = `/stories/${tagSlug}/${story.slug}`;
  const sortedImages = [...story.images].sort((a, b) => a.position - b.position);

  return (
    <Link 
      href={storyUrl} 
      className="flex h-full flex-1 flex-col gap-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="relative w-full aspect-[3/2] rounded-t-lg overflow-hidden">
        {sortedImages.length > 0 ? (
          <img
            src={sortedImages[0].src}
            alt={sortedImages[0].alt || story.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white">
            <div className="text-4xl mb-2">🌙</div>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
          ⏱️ {story.readingTime} min
        </div>
      </div>
      <div className="p-3 flex flex-col gap-2">
        <h3 className="text-[#101619] text-base font-semibold leading-tight line-clamp-2">
          {story.title}
        </h3>
        <p className="text-[#577c8e] text-sm leading-normal line-clamp-2">
          {story.description}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>👶 {story.ageGroup}</span>
          {story.tags.length > 0 && (
            <span className="text-blue-600">#{story.tags[0]}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async ({ query }) => {
  try {
    const searchQuery = query.q as string;
    
    const { storiesApi } = await import('../src/services/supabase');
    
    let stories: Story[];
    if (searchQuery) {
      stories = await storiesApi.search(searchQuery);
    } else {
      stories = await storiesApi.getAll();
    }

    return {
      props: {
        initialStories: stories,
        query: searchQuery || undefined
      }
    };
  } catch (error) {
    console.error('Error fetching search data:', error);
    return {
      props: {
        initialStories: [],
        query: undefined
      }
    };
  }
};

export default SearchPage;
