import React from 'react';

const LoadingSpinner = ({ size = 'medium' }) => {
  const sizeStyles = {
    small: { width: '20px', height: '20px' },
    medium: { width: '40px', height: '40px' },
    large: { width: '60px', height: '60px' }
  };

  return (
    <div className="loading-spinner">
      <div 
        className="spinner" 
        style={sizeStyles[size]}
      ></div>
    </div>
  );
};

export default LoadingSpinner;