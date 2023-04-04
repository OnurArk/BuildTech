import React, { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';

import Loaders from '../../../../ui/Loaders';
import Slide from '../../../../ui/Slide';
import Button from '../../../../ui/Button';

import styled from './InfoContainer.module.css';

const InfoContainer = ({ className }) => {
  const { crauselData, item } = useLoaderData();
  return (
    <div className={className}>
      <Suspense fallback={<Loaders size={90} type={'LineWobble'} />}>
        <Await resolve={item}>
          {(item) => (
            <>
              <h3>
                {item?.name}/{item?.type}
              </h3>
              <div className={styled.price}>
                Price: {item?.price?.toLocaleString()} TL
              </div>
            </>
          )}
        </Await>
      </Suspense>

      <Button className={styled.btn}>Add To Cart</Button>
      <Suspense
        fallback={<Loaders className={styled.slide} type={'Ring'} size={80} />}
      >
        <Await resolve={crauselData}>
          {(crauselData) => (
            <Slide
              slideData={Object.values(crauselData)}
              className={styled.slide}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default InfoContainer;
