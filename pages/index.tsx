import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
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

interface Tag {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

interface HomePageProps {
  featuredStories: Story[];
  categories: Tag[];
}

const HomePage: React.FC<HomePageProps> = ({ featuredStories, categories }) => {
  // Helper function to get stories by tag
  const getStoriesByTag = (tagSlug: string) => {
    return featuredStories.filter(story => 
      story.tags.some(tag => tag.toLowerCase() === tagSlug)
    );
  };

  // Get stories for each category
  const animalStories = getStoriesByTag('animals');
  const classicStories = getStoriesByTag('classic');
  const originalStories = getStoriesByTag('originals');

  return (
    <>
      <Head>
        <title>Time to Sleep - Bedtime Stories for Your Children</title>
        <meta name="description" content="Time to Sleep - Bedtime Stories for Your Children. Discover magical stories with beautiful illustrations perfect for family reading and helping children fall asleep peacefully." />
        <meta name="keywords" content="bedtime stories, children's stories, stories for children, stories with pictures, time to sleep, family reading" />
        <link rel="canonical" href="https://timetosleep.org/" />
        <meta property="og:title" content="Time to Sleep - Bedtime Stories for Your Children" />
        <meta property="og:description" content="Time to Sleep - Bedtime Stories for Your Children. Discover magical stories with beautiful illustrations perfect for family reading and helping children fall asleep peacefully." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://timetosleep.org/" />
        <meta property="og:image" content="https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" />
        
        {/* Twitter Card */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Time to Sleep - Bedtime Stories for Your Children" />
        <meta property="twitter:description" content="Time to Sleep - Bedtime Stories for Your Children. Discover magical stories with beautiful illustrations perfect for family reading and helping children fall asleep peacefully." />
        <meta property="twitter:image" content="https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Time to Sleep - Bedtime Stories for Your Children",
          "description": "Time to Sleep - Bedtime Stories for Your Children. Discover magical stories with beautiful illustrations perfect for family reading and helping children fall asleep peacefully.",
          "url": "https://timetosleep.org/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://timetosleep.org/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
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
              "name": "Main",
              "item": "https://timetosleep.org"
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
              {/* Welcome Section */}
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <div className="flex w-full md:min-w-72 flex-col gap-3">
                  <p className="text-[#101619] tracking-light text-xl md:text-2xl lg:text-[32px] font-bold leading-tight">
                    Welcome to Time to Sleep!
                  </p>
                  <p className="text-[#577c8e] text-sm font-normal leading-normal">
                    Discover magical bedtime stories with beautiful illustrations. Perfect for family reading and helping children fall asleep peacefully.
                  </p>
                </div>
              </div>

              {/* Animals Category Section */}
              {animalStories.length > 0 && (
                <section className="mb-10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4">
                    <div>
                      <h2 className="text-[#101619] text-lg md:text-xl lg:text-[22px] font-bold leading-tight">
                        <Link href="/stories/animals" className="hover:underline">
                          Animals
                        </Link>
                      </h2>
                      <p className="text-[#577c8e] text-sm md:text-base">
                        Stories about animals and their adventures
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex overflow-x-auto gap-3 p-4">
                      {animalStories.slice(0, 12).map(story => (
                        <div key={story.id} className="flex-shrink-0 w-64">
                          <StoryCard story={story} tagSlug="animals" />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Classic Category Section */}
              {classicStories.length > 0 && (
                <section className="mb-10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4">
                    <div>
                      <h2 className="text-[#101619] text-lg md:text-xl lg:text-[22px] font-bold leading-tight">
                        <Link href="/stories/classic" className="hover:underline">
                          Classic
                        </Link>
                      </h2>
                      <p className="text-[#577c8e] text-sm md:text-base">
                        Timeless stories that have been loved for generations
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex overflow-x-auto gap-3 p-4">
                      {classicStories.slice(0, 12).map(story => (
                        <div key={story.id} className="flex-shrink-0 w-64">
                          <StoryCard story={story} tagSlug="classic" />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Originals Category Section */}
              {originalStories.length > 0 && (
                <section className="mb-10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4">
                    <div>
                      <h2 className="text-[#101619] text-lg md:text-xl lg:text-[22px] font-bold leading-tight">
                        <Link href="/stories/originals" className="hover:underline">
                          Originals
                        </Link>
                      </h2>
                      <p className="text-[#577c8e] text-sm md:text-base">
                        Original stories created especially for Time to Sleep
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex overflow-x-auto gap-3 p-4">
                      {originalStories.slice(0, 12).map(story => (
                        <div key={story.id} className="flex-shrink-0 w-64">
                          <StoryCard story={story} tagSlug="originals" />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* All Stories Section */}
              <h2 className="text-[#101619] text-lg md:text-xl lg:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                <Link href="/stories" className="hover:underline">
                  All Stories
                </Link>
              </h2>
              <div className="mt-4">
                <div className="flex overflow-x-auto gap-3 p-4">
                  {featuredStories.slice(0, 25).map(story => (
                    <div key={story.id} className="flex-shrink-0 w-64">
                      <StoryCard 
                        story={story} 
                        tagSlug={story.tags[0]?.toLowerCase() || 'stories'} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        <SimpleFooter />
      </div>
    </>
  );
};

// StoryCard Component (simplified version for the homepage)
const StoryCard: React.FC<{ story: Story; tagSlug: string }> = ({ story, tagSlug }) => {
  const storyUrl = `/stories/${tagSlug}/${story.slug}`;
  const sortedImages = [...story.images].sort((a, b) => a.position - b.position);

  return (
    <Link 
      href={storyUrl} 
      className="flex h-full flex-1 flex-col gap-3 rounded-lg min-w-64 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
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
    const { storiesApi } = await import('../src/services/supabase');
    const { tagsApi } = await import('../src/services/supabase');

    // Fetch data
    const allStories = await storiesApi.getAll();
    const categories = await tagsApi.getAll();



    return {
      props: {
        featuredStories: allStories.slice(0, 25), // Latest 25 stories
        categories
      },
      revalidate: 60 // Rebuild every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        featuredStories: [],
        categories: []
      },
      revalidate: 60
    };
  }
};

export default HomePage;
