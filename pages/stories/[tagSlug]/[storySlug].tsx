import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import SimpleHeader from '../../../src/components/SimpleHeader';
import SimpleFooter from '../../../src/components/SimpleFooter';

interface Story {
  id: string;
  title: string;
  description: string;
  content: string;
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

interface StoryPageProps {
  tagSlug: string;
  storySlug: string;
  story: Story | null;
  tag: Tag | null;
}

const StoryPage: React.FC<StoryPageProps> = ({ tagSlug, storySlug, story, tag }) => {
  if (!story || !tag) {
    return (
      <div className="min-h-screen flex flex-col">
        <SimpleHeader />
        <main className="flex-1">
          <div className="px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-4 md:py-5">
            <div className="w-full max-w-[960px] flex flex-col flex-1">
              <div className="text-center text-red-600 p-4">
                Story not found
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
        <title>{story.title} - Time to Sleep</title>
        <meta name="description" content={story.description} />
        <meta name="keywords" content={story.tags.join(', ')} />
        <link rel="canonical" href={`https://timetosleep.org/stories/${tagSlug}/${storySlug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={story.title} />
        <meta property="og:description" content={story.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://timetosleep.org/stories/${tagSlug}/${storySlug}`} />
        <meta property="og:site_name" content="Time to Sleep" />
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
          "@type": "CreativeWork",
          "name": story.title,
          "description": story.description,
          "author": {
            "@type": "Person",
            "name": "Konstantin Dylko"
          },
          "creator": {
            "@type": "Person",
            "name": "Konstantin Dylko"
          },
          "datePublished": story.createdAt,
          "dateModified": story.updatedAt,
          "genre": "Children's Literature",
          "audience": {
            "@type": "Audience",
            "audienceType": "Children",
            "suggestedMinAge": "3",
            "suggestedMaxAge": "8"
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://timetosleep.org/stories/${tagSlug}/${storySlug}`,
            "url": `https://timetosleep.org/stories/${tagSlug}/${storySlug}`,
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
              "item": `https://timetosleep.org/stories/${tagSlug}`
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": story.title,
              "item": `https://timetosleep.org/stories/${tagSlug}/${storySlug}`
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
                  <Link href={`/stories/${tagSlug}`} className="hover:text-[#101619] transition-colors">
                    {tag.name}
                  </Link>
                  <span>/</span>
                  <span className="text-[#101619]">{story.title}</span>
                </nav>
              </div>

              {/* Hero Section */}
              <div className="px-4 py-6">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  {/* Story Image */}
                  {sortedImages.length > 0 && (
                    <div className="relative w-full aspect-[3/2] overflow-hidden">
                      <img
                        src={sortedImages[0].src}
                        alt={sortedImages[0].alt || story.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Story Info */}
                  <div className="p-6">
                    <h1 className="text-[#101619] text-xl md:text-2xl lg:text-[32px] font-bold leading-tight tracking-[-0.015em] mb-4">
                      {story.title}
                    </h1>
                    
                    <div className="flex items-center gap-4 text-sm text-[#577c8e] mb-4">
                      <span>⏱️ {story.readingTime} min</span>
                      <span>👶 {story.ageGroup}</span>
                      {story.tags.length > 0 && (
                        <span className="text-blue-600">#{story.tags[0]}</span>
                      )}
                    </div>
                    
                    <p className="text-[#577c8e] text-sm md:text-base font-normal leading-normal mb-6">
                      {story.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Story Content */}
              <div className="px-4 pb-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div 
                    className="prose prose-lg max-w-none text-[#101619]"
                    dangerouslySetInnerHTML={{ __html: story.content }}
                  />
                </div>
              </div>

              {/* Back to Stories */}
              <div className="px-4 pb-8">
                <Link 
                  href={`/stories/${tagSlug}`}
                  className="inline-flex items-center text-[#577c8e] hover:text-[#101619] transition-colors"
                >
                  ← Back to Stories
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

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { storiesApi } = await import('../../../src/services/supabase');
    const allStories = await storiesApi.getAll();
    
    const paths = allStories.map(story => ({
      params: { 
        tagSlug: story.tags[0]?.toLowerCase() || 'stories',
        storySlug: story.slug 
      }
    }));

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

export const getStaticProps: GetStaticProps<StoryPageProps> = async ({ params }) => {
  try {
    const { tagSlug, storySlug } = params as { tagSlug: string; storySlug: string };
    
    const { storiesApi } = await import('../../../src/services/supabase');
    const { tagsApi } = await import('../../../src/services/supabase');

    // Fetch story and tag
    const story = await storiesApi.getBySlug(storySlug);
    const tag = await tagsApi.getBySlug(tagSlug);

    return {
      props: {
        tagSlug,
        storySlug,
        story,
        tag
      },
      revalidate: 60
    };
  } catch (error) {
    console.error('Error fetching story data:', error);
    return {
      props: {
        tagSlug: '',
        storySlug: '',
        story: null,
        tag: null
      },
      revalidate: 60
    };
  }
};

export default StoryPage;
