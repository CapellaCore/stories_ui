import React, { useState, useEffect, useRef } from 'react';
import { StoryContentProps } from '../types/interfaces';
import StoryContent from './StoryContent';

interface LazyStoryContentProps extends StoryContentProps {
  threshold?: number; // Intersection observer threshold
  rootMargin?: string; // Intersection observer root margin
}

const LazyStoryContent: React.FC<LazyStoryContentProps> = ({ 
  content, 
  images, 
  threshold = 0.1,
  rootMargin = '50px'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          setIsVisible(true);
          setIsLoaded(true);
          // Disconnect observer after first load
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, isLoaded]);

  return (
    <div ref={contentRef} className="lazy-content-container">
      {isVisible ? (
        <div className="story-content-text max-w-4xl mx-auto">
          <StoryContent content={content} images={images} />
        </div>
      ) : (
        <div className="story-content-skeleton max-w-4xl mx-auto">
          {/* Skeleton loader */}
          <div className="animate-pulse">
            <div className="space-y-4">
              {/* Paragraph skeletons */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              ))}
              
              {/* Image skeleton */}
              <div className="my-8">
                <div className="w-full aspect-[3/2] bg-gray-200 rounded-lg"></div>
              </div>
              
              {/* More paragraph skeletons */}
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`p2-${i}`} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyStoryContent;
