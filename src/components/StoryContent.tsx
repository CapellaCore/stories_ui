import React from 'react';
import {StoryContentProps} from "../types/interfaces";
import OptimizedImage from "./OptimizedImage";

const StoryContent: React.FC<StoryContentProps> = ({ content, images }) => {
  const sortedImages = [...images].sort((a, b) => a.position - b.position).slice(1);

  const renderContentWithImages = () => {
    const elements: React.ReactNode[] = [];
    let currentPosition = 0;
    let imageIndex = 0;

    const paragraphs = content
      .split(/\n\s*\n/)
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const renderImage = (image: { id: string; src: string; alt: string }) => (
      <div key={`img-${image.id}`} className="my-8 text-center">
        <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden shadow-md mx-auto max-w-4xl">
          <OptimizedImage
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>
      </div>
    );

    paragraphs.forEach((paragraph, paragraphIndex) => {
      const paragraphStart = currentPosition;
      const paragraphEnd = currentPosition + paragraph.length;

      while (imageIndex < sortedImages.length && sortedImages[imageIndex].position <= paragraphStart) {
        elements.push(renderImage(sortedImages[imageIndex]));
        imageIndex++;
      }

      elements.push(
        <p key={`p-${paragraphIndex}`} className="story-paragraph">
          {paragraph}
        </p>
      );

      while (imageIndex < sortedImages.length && sortedImages[imageIndex].position <= paragraphEnd) {
        elements.push(renderImage(sortedImages[imageIndex]));
        imageIndex++;
      }

      currentPosition = paragraphEnd + 2;
    });

    while (imageIndex < sortedImages.length) {
      elements.push(renderImage(sortedImages[imageIndex]));
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
