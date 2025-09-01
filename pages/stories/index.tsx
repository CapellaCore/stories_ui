import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SimpleHeader from '../../src/components/SimpleHeader';
import SimpleFooter from '../../src/components/SimpleFooter';
import LoadMoreButton from '../../src/components/LoadMoreButton';

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

interface Tag {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

interface StoriesPageProps {
  categories: Tag[];
  allStories: Story[];
}

const StoriesPage: React.FC<StoriesPageProps> = ({ categories, allStories }) => {
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

  return (
    <>
      <Head>
        <title>Stories - Time to Sleep</title>
        <meta name="title" content="Stories - Time to Sleep" />
        <meta name="description" content="Browse all story categories and find the perfect bedtime story for your child on Time to Sleep." />
        <meta name="keywords" content="stories, story categories, children's stories, bedtime stories, time to sleep" />
        <link rel="canonical" href="https://timetosleep.org/stories" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Stories - Time to Sleep" />
        <meta property="og:description" content="Browse all story categories and find the perfect bedtime story for your child on Time to Sleep." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://timetosleep.org/stories" />
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
          "url": "https://timetosleep.org/stories",
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
              "name": "Home",
              "item": "https://timetosleep.org"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Stories",
              "item": "https://timetosleep.org/stories"
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
                  <span className="text-[#101619]">Stories</span>
                </nav>
              </div>

              {/* Page Title */}
              <div className="px-4 py-3">
                <h1 className="text-[#101619] text-xl md:text-2xl lg:text-[32px] font-bold leading-tight tracking-[-0.015em]">
                  All Story Categories
                </h1>
                <p className="text-[#577c8e] text-sm md:text-base font-normal leading-normal mt-2">
                  Choose a category that interests you and discover magical stories for children on Time to Sleep.
                </p>
              </div>

              {/* Categories Section */}
              <div className="px-4 py-6">
                <h2 className="text-[#101619] text-lg md:text-xl lg:text-[22px] font-semibold leading-tight tracking-[-0.015em] mb-4">
                  Categories
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
                All Stories ({allStories.length})
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

// StoryCard Component (same as homepage)
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

export const getStaticProps = async () => {
  try {
    // Import the API functions
    const { storiesApi } = await import('../../src/services/supabase');
    const { tagsApi } = await import('../../src/services/supabase');

    // Fetch data
    const allStories = await storiesApi.getAll();
    const categories = await tagsApi.getAll();

    return {
      props: {
        categories,
        allStories // Pass all stories instead of just 6
      },
      revalidate: 60 // Rebuild every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        categories: [],
        allStories: []
      },
      revalidate: 60
    };
  }
};

export default StoriesPage;
