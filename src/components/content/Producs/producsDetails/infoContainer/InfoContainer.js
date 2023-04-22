import React, { Suspense } from 'react';
import { Await, useLoaderData, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cartAction } from '../../../../../store/cart-slice';

import Loaders from '../../../../ui/Loaders';
import Slide from '../../../../ui/Slide';
import Button from '../../../../ui/Button';

import styled from './InfoContainer.module.css';

const InfoContainer = ({ className }) => {
  const dispatch = useDispatch();
  const { crauselData, item } = useLoaderData();

  const params = useParams();

  const addCartHandler = (item) => {
    dispatch(cartAction.addToCart({ ...item, id: params.itemId }));
  };

  return (
    <div className={className}>
      <Suspense fallback={<Loaders size={90} type={'LineWobble'} />}>
        <Await resolve={item}>
          {(item) => (
            <>
              <h3 className={styled.title}>
                {item?.name}/{item?.type}
              </h3>
              <div className={styled.price}>
                Price: {item?.price?.toLocaleString()} TL
              </div>
              <Button
                className={styled.btn}
                onClick={() => addCartHandler(item)}
              >
                Add To Cart
              </Button>
            </>
          )}
        </Await>
      </Suspense>

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
