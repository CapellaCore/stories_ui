import React, { useState, useRef, useEffect } from 'react';
import PlaceholderImage from './PlaceholderImage';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  width = 1600, 
  height = 900,
  priority = false
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Preload image if priority is true
    if (priority && src) {
      const img = new Image();
      img.onload = () => {
        setImageLoaded(true);
        setImageLoading(false);
      };
      img.onerror = () => {
        setImageError(true);
        setImageLoading(false);
      };
      img.src = src;
    }
  }, [src, priority]);

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
    <div className={`optimized-image-container relative ${className}`}>
      {imageLoading && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg"
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`optimized-image w-full h-full ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 rounded-lg object-cover`}
        onLoad={() => {
          setImageLoading(false);
          setImageLoaded(true);
        }}
        onError={() => {
          setImageError(true);
          setImageLoading(false);
        }}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </div>
  );
};

export default OptimizedImage;
