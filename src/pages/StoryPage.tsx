import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStory } from '../hooks/useStories';
import { useStories } from '../hooks/useStories';
import StoryImage from '../components/StoryImage';
import LoadingSpinner from '../components/LoadingSpinner';
import Breadcrumbs, { BreadcrumbItem } from '../components/Breadcrumbs';
import StoriesList from '../components/StoriesList';

const StoryPage: React.FC = () => {
  const { tagSlug, storySlug } = useParams<{ tagSlug: string; storySlug: string }>();
  const { story, loading, error } = useStory(storySlug || '');
  const { stories: allStories } = useStories();

  if (loading) {
    return (
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <LoadingSpinner message="Ładowanie bajki..." size="large" />
        </div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-red-600">
              {error || 'Bajka nie została znaleziona'}
            </div>
            <Link to="/" className="mt-4 text-blue-600 hover:underline">
              Wróć do strony głównej
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Function to render content with images
  const renderContentWithImages = () => {
    const paragraphs = story.content.split('\n\n');
    const images = [...story.images].sort((a, b) => a.position - b.position);
    
    let currentImageIndex = 0;
    let currentPosition = 0;
    
    return paragraphs.map((paragraph, index) => {
      const paragraphLength = paragraph.length;
      currentPosition += paragraphLength + 2; // +2 for \n\n
      
      const imagesInParagraph: React.ReactNode[] = [];
      
      while (currentImageIndex < images.length && 
             images[currentImageIndex].position <= currentPosition) {
        const image = images[currentImageIndex];
        imagesInParagraph.push(
          <div key={image.id} className="my-8 text-center">
            <StoryImage
              src={image.src}
              alt={image.alt}
              className="rounded-lg shadow-md mx-auto max-w-full h-auto"
              width={800}
              height={600}
            />
          </div>
        );
        currentImageIndex++;
      }
      
      return (
        <React.Fragment key={index}>
          <p className="story-paragraph">{paragraph}</p>
          {imagesInParagraph}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <Helmet>
        <title>{story.title} - Сказки на ночь</title>
        <meta name="description" content={story.description} />
        <meta name="keywords" content={`сказки на ночь, ${story.tags.join(', ')}, детские сказки`} />
        <meta property="og:title" content={`${story.title} - Сказки на ночь`} />
        <meta property="og:description" content={story.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://bedtime-stories.com/stories/all/${story.slug}`} />
        {story.images.length > 0 && (
          <meta property="og:image" content={story.images[0].src} />
        )}
        
        {/* Structured Data */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": story.title,
          "description": story.description,
          "image": story.images.length > 0 ? story.images[0].src : undefined,
          "author": {
            "@type": "Organization",
            "name": "Сказки на ночь"
          },
          "creator": {
            "@type": "Organization",
            "name": "Сказки на ночь"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Сказки на ночь",
            "logo": {
              "@type": "ImageObject",
              "url": "https://bedtime-stories.com/logo.png"
            }
          },
          "dateCreated": story.createdAt,
          "dateModified": story.updatedAt,
          "genre": "Children's Literature",
          "audience": {
            "@type": "Audience",
            "audienceType": "Children"
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://bedtime-stories.com/stories/all/${story.slug}`
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
              "name": "Główna",
              "item": "https://bedtime-stories.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Bajki",
              "item": "https://bedtime-stories.com/stories"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Wszystkie",
              "item": "https://bedtime-stories.com/stories/all"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": story.title,
              "item": `https://bedtime-stories.com/stories/all/${story.slug}`
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
          
          .story-paragraph:first-of-type {
            font-size: 1.25rem;
            font-weight: 500;
            color: #1a202c;
            text-indent: 0;
            margin-bottom: 2rem;
          }
          
          .story-paragraph:first-of-type::first-letter {
            font-size: 3.5rem;
            font-weight: bold;
            float: left;
            line-height: 1;
            margin: 0.1em 0.1em 0 0;
            color: #4c51bf;
            font-family: 'Georgia', serif;
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
            
            .story-paragraph:first-of-type {
              font-size: 1.125rem;
            }
            
            .story-paragraph:first-of-type::first-letter {
              font-size: 2.5rem;
            }
          }
        `}</style>
      </Helmet>

      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          {/* Breadcrumbs */}
          <div className="px-4 py-3">
            <Breadcrumbs 
              items={[
                { name: 'Główna', path: '/' },
                { name: 'Bajki', path: '/stories' },
                { name: 'Wszystkie', path: '/stories/all' },
                { name: story.title, path: `/stories/all/${story.slug}`, isCurrent: true }
              ]}
            />
          </div>
          
          {/* Hero Image */}
          <div className="px-4 mb-6">
            {story.images.length > 0 ? (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                <StoryImage
                  src={story.images[0].src}
                  alt={story.images[0].alt || story.title}
                  className="w-full h-full object-cover"
                  width={960}
                  height={540}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{story.title}</h1>
                  <p className="text-lg opacity-90 mb-3">{story.description}</p>
                  <div className="flex items-center gap-4 text-sm opacity-90">
                    <span className="flex items-center gap-1">
                      <span>⏱️</span>
                      <span>{story.readingTime} min</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span>👶</span>
                      <span>{story.ageGroup}</span>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                              <div className="text-center text-white">
                <div className="text-6xl mb-4">📖</div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{story.title}</h1>
                <p className="text-lg opacity-90 mb-3">{story.description}</p>
                <div className="flex items-center justify-center gap-4 text-sm opacity-90">
                  <span className="flex items-center gap-1">
                    <span>⏱️</span>
                    <span>{story.readingTime} min</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span>👶</span>
                    <span>{story.ageGroup}</span>
                  </span>
                </div>
              </div>
              </div>
            )}
          </div>
          
          {/* Story Content */}
          <div className="px-4 mb-8">
            <div className="story-content-text max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
              {renderContentWithImages()}
            </div>
          </div>
          
          <h2 className="text-[#101619] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Więcej bajek</h2>
          <StoriesList 
            stories={allStories.filter(s => s.slug !== story.slug).slice(0, 3)} 
            tagSlug="all" 
          />
        </div>
      </div>
    </>
  );
};

export default StoryPage; 