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
      className={`placeholder-image ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: randomColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        color: 'white',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '20px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}
    >
      <div>
        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🌙</div>
        <div>{alt}</div>
      </div>
    </div>
  );
};

export default PlaceholderImage; 