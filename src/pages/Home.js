import React, { Fragment, Suspense, useEffect } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchİtemsData } from '../store/item-action';
import Slide from '../components/ui/Slide';
import Nav from '../components/content/main-nav/Nav';
import Products from '../components/content/Producs/Products';
import Filter from '../components/content/home-filter/Filter';
import api from '../util/api';

import styled from '../styles/Home.module.css';

const Home = () => {
  const { crauselData } = useLoaderData();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchİtemsData());
  }, [dispatch]);

  return (
    <Fragment>
      <Suspense fallback={<p>...LoadingSSS</p>}>
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
        <Nav />
        <div className={styled['responsive']}>
          <Filter />
          <Products />
        </div>
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
