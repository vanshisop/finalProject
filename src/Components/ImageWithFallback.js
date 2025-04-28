import React, { useState } from 'react';

const ImageWithFallback = ({ src, alt, fallbackSrc, ...props }) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    if (!error) {
      setError(true);
    }
  };

  return (
    <img
      src={error ? fallbackSrc : src}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
};

export default ImageWithFallback;
