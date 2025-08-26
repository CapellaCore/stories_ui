import React from 'react';

interface StoryImage {
  id: string;
  src: string;
  alt: string;
  position: number;
}

interface StoryContentProps {
  content: string;
  images: StoryImage[];
}

const StoryContent: React.FC<StoryContentProps> = ({ content, images }) => {
  // Sort images by position and skip the first image (used in hero)
  const sortedImages = [...images].sort((a, b) => a.position - b.position).slice(1);
  
  // Function to render content with images inserted at character positions
  const renderContentWithImages = () => {
    const elements: React.ReactNode[] = [];
    let currentPosition = 0;
    let imageIndex = 0;
    
    // Split content into paragraphs
    const paragraphs = content
      .split(/\n\s*\n/) // Split on double line breaks
      .map(p => p.trim())
      .filter(p => p.length > 0);
    
    paragraphs.forEach((paragraph, paragraphIndex) => {
      const paragraphStart = currentPosition;
      const paragraphEnd = currentPosition + paragraph.length;
      
      // Check if there are any images that should be inserted before this paragraph
      while (imageIndex < sortedImages.length && sortedImages[imageIndex].position <= paragraphStart) {
        const image = sortedImages[imageIndex];
        elements.push(
          <div key={`img-${image.id}`} className="my-8 text-center">
            <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden shadow-md mx-auto max-w-4xl">
              <img
                src={image.src}
                alt={image.alt}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        );
        imageIndex++;
      }
      
      // Add the paragraph with proper styling
      elements.push(
        <p key={`p-${paragraphIndex}`} className="story-paragraph">
          {paragraph}
        </p>
      );
      
      // Check if there are any images that should be inserted after this paragraph
      while (imageIndex < sortedImages.length && sortedImages[imageIndex].position <= paragraphEnd) {
        const image = sortedImages[imageIndex];
        elements.push(
          <div key={`img-${image.id}`} className="my-8 text-center">
            <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden shadow-md mx-auto max-w-4xl">
              <img
                src={image.src}
                alt={image.alt}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        );
        imageIndex++;
      }
      
      currentPosition = paragraphEnd + 2; // +2 for the double line break
    });
    
    // Add any remaining images
    while (imageIndex < sortedImages.length) {
      const image = sortedImages[imageIndex];
      elements.push(
        <div key={`img-${image.id}`} className="my-8 text-center">
          <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden shadow-md mx-auto max-w-4xl">
            <img
              src={image.src}
              alt={image.alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      );
      imageIndex++;
    }
    
    return elements;
  };

  return (
    <div className="story-content-text max-w-4xl mx-auto">
      {renderContentWithImages()}
    </div>
  );
};

export default StoryContent;
