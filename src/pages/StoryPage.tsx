import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStory } from '../hooks/useStories';
import { useStories } from '../hooks/useStories';
import { useTranslation } from '../contexts/TranslationContext';
import StoryImage from '../components/StoryImage';
import LoadingSpinner from '../components/LoadingSpinner';
import Breadcrumbs from '../components/Breadcrumbs';
import StoriesList from '../components/StoriesList';

const StoryPage: React.FC = () => {
  const { storySlug } = useParams<{ tagSlug: string; storySlug: string }>();
  const { story, loading, error } = useStory(storySlug || '');
  const { stories: allStories } = useStories();
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-4 md:py-5">
        <div className="w-full max-w-[960px] flex flex-col flex-1">
          <LoadingSpinner message={t('common.loading')} size="large" />
        </div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-4 md:py-5">
        <div className="w-full max-w-[960px] flex flex-col flex-1">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-red-600">
              {error || t('common.error')}
            </div>
            <Link to="/" className="mt-4 text-blue-600 hover:underline">
              {t('common.home')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Sort images by position to ensure correct order
  const sortedImages = [...story.images].sort((a, b) => a.position - b.position);

  // Function to render content with images
  const renderContentWithImages = () => {
    const paragraphs = story.content.split('\n\n');
    
    // Skip the first image since it's already shown in the hero section
    const imagesInText = sortedImages.slice(1);
    
    let currentImageIndex = 0;
    let currentPosition = 0;
    
    return paragraphs.map((paragraph, index) => {
      const paragraphLength = paragraph.length;
      currentPosition += paragraphLength + 2; // +2 for \n\n
      
      const imagesInParagraph: React.ReactNode[] = [];
      
      while (currentImageIndex < imagesInText.length && 
             imagesInText[currentImageIndex].position <= currentPosition) {
        const image = imagesInText[currentImageIndex];
        imagesInParagraph.push(
          <div key={image.id} className="my-8 text-center">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md mx-auto max-w-4xl">
              <StoryImage
                src={image.src}
                alt={image.alt}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
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
        <title>{story.title}</title>
        <meta name="description" content={story.description} />
        <meta name="keywords" content={`${story.tags.join(', ')}`} />
        <meta property="og:title" content={story.title} />
        <meta property="og:description" content={story.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://timetosleep.org/stories/all/${story.slug}`} />
        {sortedImages.length > 0 && (
          <meta property="og:image" content={sortedImages[0].src} />
        )}
        
        {/* Twitter Card */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={story.title} />
        <meta property="twitter:description" content={story.description} />
        {sortedImages.length > 0 && (
          <meta property="twitter:image" content={sortedImages[0].src} />
        )}
        
        {/* Structured Data */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": story.title,
          "description": story.description,
          "image": sortedImages.length > 0 ? sortedImages[0].src : undefined,
          "author": {
            "@type": "Organization",
            "name": t('header.brandName')
          },
          "creator": {
            "@type": "Organization",
            "name": t('header.brandName')
          },
          "publisher": {
            "@type": "Organization",
            "name": t('header.brandName'),
            "logo": {
              "@type": "ImageObject",
              "url": "https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg"
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
            "@id": `https://timetosleep.org/stories/all/${story.slug}`
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
              "name": t('common.home'),
              "item": "https://timetosleep.org"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": t('header.stories'),
              "item": "https://timetosleep.org/stories"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": t('stories.pageTitle'),
              "item": "https://timetosleep.org/stories/all"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": story.title,
              "item": `https://timetosleep.org/stories/all/${story.slug}`
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

      <div className="px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-4 md:py-5">
        <div className="w-full max-w-[960px] flex flex-col flex-1">
          {/* Breadcrumbs */}
          <div className="px-4 py-3">
            <Breadcrumbs 
              items={[
                { name: t('common.home'), path: '/' },
                { name: t('header.stories'), path: '/stories' },
                { name: t('stories.pageTitle'), path: '/stories/all' },
                { name: story.title, path: `/stories/all/${story.slug}`, isCurrent: true }
              ]}
            />
          </div>
          
          {/* Hero Image */}
          <div className="px-4 mb-4 md:mb-6">
            {sortedImages.length > 0 ? (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                <StoryImage
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
                      <span>{story.readingTime} {t('search.minutes')}</span>
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
                <div className="text-center text-white p-4">
                  <div className="text-4xl md:text-6xl mb-2 md:mb-4">📖</div>
                  <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2">{story.title}</h1>
                  <p className="text-sm md:text-lg opacity-90 mb-2 md:mb-3">{story.description}</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-4 text-xs md:text-sm opacity-90">
                    <span className="flex items-center gap-1">
                      <span>⏱️</span>
                      <span>{story.readingTime} {t('search.minutes')}</span>
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
          <div className="px-4 mb-6 md:mb-8">
            <div className="story-content-text max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-4 md:p-8">
              {renderContentWithImages()}
            </div>
          </div>
          
          <h2 className="text-[#101619] text-lg md:text-xl lg:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">{t('story.relatedStories')}</h2>
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