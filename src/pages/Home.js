import React, { Fragment, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchİtemsData } from '../store/item-action';
import Slide from '../components/ui/Slide';
import Nav from '../components/content/main-nav/Nav';
import Products from '../components/content/Producs/Products';
import Filter from '../components/content/home-filter/Filter';
import api from '../util/api';

import styled from '../styles/Home.module.css';

const Home = () => {
  const loaderData = useLoaderData();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchİtemsData());
  }, [dispatch]);

  return (
    <Fragment>
      <Slide
        slideData={[...Object.values(loaderData)]}
        className={styled.slide}
        isArrowsActive={true}
      />
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

  return requestFetch({ adress });
}
