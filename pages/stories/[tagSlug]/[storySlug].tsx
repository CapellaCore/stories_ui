import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import SimpleHeader from '../../../src/components/SimpleHeader';
import SimpleFooter from '../../../src/components/SimpleFooter';
import StoryContent from '../../../src/components/StoryContent';

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
        <title>{`${story.title} - Time to Sleep`}</title>
        <meta name="title" content={`${story.title} - Time to Sleep`} />
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

        {/* Custom CSS for improved typography */}
        <style>{`
          .story-content-text {
            font-family: 'Georgia', 'Times New Roman', serif;
            line-height: 1.8;
            color: #2d3748;
            font-size: 1.125rem;
          }
          
          .story-paragraph {
            margin-bottom: 1.5rem;
            text-align: justify;
            text-indent: 2rem;
            letter-spacing: 0.01em;
            word-spacing: 0.05em;
          }
          

          
          .story-content-text h2 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #2d3748;
            margin: 2rem 0 1rem 0;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 0.5rem;
          }
          
          .story-content-text h3 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #4a5568;
            margin: 1.5rem 0 0.75rem 0;
          }
          
          .story-content-text strong {
            color: #2d3748;
            font-weight: 600;
          }
          
          .story-content-text em {
            font-style: italic;
            color: #4a5568;
          }
          
          .story-content-text blockquote {
            border-left: 4px solid #4c51bf;
            padding-left: 1rem;
            margin: 1.5rem 0;
            font-style: italic;
            color: #4a5568;
            background-color: #f7fafc;
            padding: 1rem;
            border-radius: 0.375rem;
          }
          
          .story-content-text ul, .story-content-text ol {
            margin: 1rem 0;
            padding-left: 2rem;
          }
          
          .story-content-text li {
            margin-bottom: 0.5rem;
          }
          
          @media (max-width: 768px) {
            .story-content-text {
              font-size: 1rem;
              line-height: 1.7;
            }
            
            .story-paragraph {
              text-indent: 1.5rem;
              margin-bottom: 1.25rem;
            }
            

          }
        `}</style>
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
              <div className="px-4 mb-4 md:mb-6">
                {sortedImages.length > 0 ? (
                  <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={sortedImages[0].src}
                      alt={sortedImages[0].alt || story.title}
                      className="w-full h-full object-cover"
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
