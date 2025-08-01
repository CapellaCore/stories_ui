import React, { useState, useRef, useEffect } from 'react';
import StoryCard from './StoryCard';

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

interface StoriesListProps {
  stories: Story[];
  tagSlug?: string;
  className?: string;
  showAll?: boolean; // If true, shows all stories in a grid instead of scrollable list
  maxVisible?: number; // Maximum number of stories to show initially
}

const StoriesList: React.FC<StoriesListProps> = ({ 
  stories, 
  tagSlug = 'all', 
  className = '',
  showAll = false,
  maxVisible = 6
}) => {
  const [visibleCount, setVisibleCount] = useState(maxVisible);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      return () => scrollContainer.removeEventListener('scroll', checkScrollPosition);
    }
  }, [stories]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + maxVisible, stories.length));
  };

  const visibleStories = showAll ? stories.slice(0, visibleCount) : stories;

  if (showAll) {
    return (
      <div className={className}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 p-4">
          {visibleStories.map(story => (
            <StoryCard
              key={story.id}
              story={story}
              tagSlug={tagSlug}
            />
          ))}
        </div>
        {visibleCount < stories.length && (
          <div className="flex justify-center p-4">
            <button
              onClick={handleShowMore}
              className="w-full md:w-auto px-4 md:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm md:text-base"
            >
              Show More Stories ({stories.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Scroll indicators */}
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200"
          aria-label="Scroll left"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200"
          aria-label="Scroll right"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Scrollable container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-3 p-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {visibleStories.map(story => (
          <div key={story.id} className="flex-shrink-0 w-64">
            <StoryCard
              story={story}
              tagSlug={tagSlug}
            />
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      {stories.length > 3 && (
        <div className="flex justify-center pb-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>←</span>
            <span>Scroll to see more stories</span>
            <span>→</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoriesList; 