import React from 'react';

interface PlaceholderImageProps {
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({ 
  alt, 
  className = '', 
  width = 400, 
  height = 300 
}) => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
    '#FFEAA7', '#DDA0DD', '#87CEEB', '#98FB98'
  ];
  
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  return (
    <div 
      className={`placeholder-image w-full h-full flex items-center justify-center rounded-lg text-white font-bold text-center p-4 shadow-lg ${className}`}
      style={{
        backgroundColor: randomColor,
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}
    >
      <div>
        <div className="text-4xl md:text-5xl mb-2 md:mb-3">🌙</div>
        <div className="text-sm md:text-base">{alt}</div>
      </div>
    </div>
  );
};

export default PlaceholderImage; 