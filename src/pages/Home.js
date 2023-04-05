import React, { Fragment, Suspense, useEffect } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loaders from '../components/ui/Loaders';
import { fetchItemsData } from '../store/item-action';
import { itemActions } from '../store/item-slice';
import Slide from '../components/ui/Slide';
import Nav from '../components/content/main-nav/Nav';
import Products from '../components/content/Producs/Products';
import api from '../util/api';

import styled from '../styles/Home.module.css';

const Home = () => {
  const { crauselData } = useLoaderData();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.items.isLoading);

  useEffect(() => {
    dispatch(itemActions.loading());
    dispatch(fetchItemsData());
  }, [dispatch]);

  return (
    <Fragment>
      <Suspense
        fallback={<Loaders className={styled.slide} type={'Ring'} size={80} />}
      >
        <Await resolve={crauselData}>
          {(crauselData) => (
            <Slide
              slideData={[...Object.values(crauselData)]}
              className={styled.slide}
              isArrowsActive={true}
            />
          )}
        </Await>
      </Suspense>

      <div className={styled.home}>
        {isLoading ? (
          <Loaders
            className={styled.products}
            type={'DotSpinner'}
            color={'#5661f8'}
          />
        ) : (
          <>
            <Nav />
            <div className={styled['responsive']}>
              <Products />
            </div>
          </>
        )}
      </div>
    </Fragment>
  );
};

export default Home;

export function loader() {
  const { requestFetch } = api();
  const adress = 'carousel.json';

  return defer({ crauselData: requestFetch({ adress }) });
}
