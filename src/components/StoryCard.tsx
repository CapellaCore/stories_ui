import React from 'react';
import { Link } from 'react-router-dom';
import StoryImage from './StoryImage';
import {useTranslation} from "../contexts/TranslationContext";

interface StoryCardProps {
  story: {
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
  };
  tagSlug?: string; // Optional tag slug for proper routing
  className?: string;
}

const StoryCard: React.FC<StoryCardProps> = ({ story,  className = '' }) => {
  const { language, t } = useTranslation();
  const prefix = language && language !== "en" ? `/${language}` : '';
  const storyUrl = `${prefix}/stories/${story.tags[0].toLowerCase()}/${story.slug}`;
  // Sort images by position to ensure correct order
  const sortedImages = [...story.images].sort((a, b) => a.position - b.position);
  return (
    <Link 
      to={storyUrl} 
      className={`flex h-full flex-1 flex-col gap-3 rounded-lg min-w-64 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      <div className="relative w-full aspect-[3/2] rounded-t-lg overflow-hidden">
        {sortedImages.length > 0 ? (
          <StoryImage
            src={sortedImages[0].src}
            alt={sortedImages[0].alt || story.title}
            className="w-full h-full"
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

export default StoryCard; 