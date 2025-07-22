import React, { useState } from 'react';
import PlaceholderImage from './PlaceholderImage';

interface StoryImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const StoryImage: React.FC<StoryImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  width = 1600, 
  height = 900 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // If image failed to load, show placeholder
  if (imageError) {
    return (
      <PlaceholderImage
        alt={alt}
        className={className}
        width={width}
        height={height}
      />
    );
  }

  return (
    <div className={`story-image-container ${className}`} style={{ width: `${width}px`, height: `${height}px` }}>
      {imageLoading && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`story-image ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 rounded-lg`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          objectFit: 'cover'
        }}
        onLoad={() => setImageLoading(false)}
        onError={() => {
          setImageError(true);
          setImageLoading(false);
        }}
      />
    </div>
  );
};

export default StoryImage; 