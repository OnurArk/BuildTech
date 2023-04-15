import React from 'react';

import Button from '../../ui/Button';

import styled from './Price.module.css';

const Price = () => {
  return (
    <div className={styled['price-container']}>
      <div className={styled.price}>
        <p>Total Price:</p>
        <p>10$</p>
      </div>

      <Button
        className={styled.btn}
        lineThicness={'3px'}
        lineLength={45}
        lineColor={'#DA4919'}
        blurColor={'#F3B575'}
        blurSize={4}
        animationSpeed={3000}
        rX={20}
        glowOffset={5}
      >
        Continue
      </Button>
    </div>
  );
};

export default Price;
