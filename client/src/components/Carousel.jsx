import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import NextIcon from './NextIcon';

const CarouselComponent = () => {
  const images = ['/b1.webp', '/b2.webp'];

  return (
    <Carousel
      NextIcon={<NextIcon />}
      PrevIcon={<NextIcon reverse />}
    >
      {images.map((imageUrl, index) => (
        <Paper key={index} style={{ padding: 0, margin: 0 }}>
          <img
            src={imageUrl}
            alt=""
            style={{
              display: 'block',
              maxWidth: '100%',
              height: 'auto',
              margin: '0 auto',
              objectFit: 'cover',
            }}
          />
        </Paper>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
