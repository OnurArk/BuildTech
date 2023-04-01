import React from 'react';
import Slide from '../../../../ui/Slide';
import Button from '../../../../ui/Button';

import styled from './InfoContainer.module.css';

const InfoContainer = ({ item, className, loaderData }) => {
  return (
    <div className={className}>
      <h3>
        {item?.name}/{item?.type}
      </h3>
      <div className={styled.price}>
        Price: {item?.price?.toLocaleString()} TL
      </div>
      <Button className={styled.btn}>Add To Cart</Button>
      <Slide slideData={Object.values(loaderData)} className={styled.slide} />
    </div>
  );
};

export default InfoContainer;
