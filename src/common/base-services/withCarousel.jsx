import React from 'react';
import Carousel from '@brainhubeu/react-carousel';

export const withCarousel = ({
  children, itemWidth, itemOffset, ...props
}) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Carousel
        itemWidth={itemWidth}
        offset={itemOffset}
        keepDirectionWhenDragging
        {...props}
      >
        {children}
      </Carousel>
    </div>
  );
};
