import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
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

interface StoriesByTagPageProps {
  tagSlug: string;
  tag: Tag | null;
  allStories: Story[];
}

const StoriesByTagPage: React.FC<StoriesByTagPageProps> = ({ tagSlug, tag, allStories }) => {
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
        <link rel="canonical" href={`https://timetosleep.org/stories/${tag.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${tag.name} - Stories`} />
        <meta property="og:description" content={tag.description || `Stories in category ${tag.name}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://timetosleep.org/stories/${tag.slug}`} />
        <meta property="og:site_name" content="Time to Sleep" />
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
          "url": `https://timetosleep.org/stories/${tag.slug}`,
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": allStories.map((story, index) => ({
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
              "name": "Home",
              "item": "https://timetosleep.org"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Stories",
              "item": "https://timetosleep.org/stories"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": tag.name,
              "item": `https://timetosleep.org/stories/${tag.slug}`
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
                  <Link href="/stories" className="hover:text-[#101619] transition-colors">
                    Stories
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
                Stories in category ({allStories.length})
              </h2>
              <div className="px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {currentStories.map(story => (
                    <StoryCard 
                      key={story.id}
                      story={story} 
                      tagSlug={tag.slug} 
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

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { tagsApi } = await import('../../src/services/supabase');
    const tags = await tagsApi.getAll();
    
    const paths = tags.map(tag => ({
      params: { tagSlug: tag.slug }
    }));

    return {
      paths,
      fallback: 'blocking'
    };
  } catch (error) {
    console.error('Error generating paths:', error);
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
};

export const getStaticProps: GetStaticProps<StoriesByTagPageProps> = async ({ params }) => {
  try {
    const { tagSlug } = params as { tagSlug: string };
    
    const { storiesApi } = await import('../../src/services/supabase');
    const { tagsApi } = await import('../../src/services/supabase');

    // Fetch tag and stories
    const tag = await tagsApi.getBySlug(tagSlug);
    const allStories = await storiesApi.getByTagSlug(tagSlug);

    return {
      props: {
        tagSlug,
        tag,
        allStories // Pass all stories instead of just the ones that fit in initial view
      },
      revalidate: 60
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        tagSlug: '',
        tag: null,
        allStories: []
      },
      revalidate: 60
    };
  }
};

export default StoriesByTagPage;
