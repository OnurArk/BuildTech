import React, { Suspense } from 'react';

import { Await, defer, useLoaderData } from 'react-router-dom';

import ItemDetailSlide from '../components/content/Producs/producsDetails/detail-Left/ItemDetailSlide';
import FeaturesTable from '../components/content/Producs/producsDetails/detail-Left/FeaturesTable';
import InfoContainer from '../components/content/Producs/producsDetails/infoContainer/InfoContainer';
import api from '../util/api';

import styled from '../styles/ProductDetail.module.css';

const ProductDetail = () => {
  // Sliderdaki item id ile adresteki item id sini karşılaştırıldığı yer
  const { crauselData, item } = useLoaderData();

  return (
    <div className={styled['detail-container']}>
      <div className={styled['image-container']}>
        <Suspense fallback={<p>...Loading</p>}>
          <Await resolve={item}>
            {(item) => (
              <>
                <ItemDetailSlide images={item.images || []} />
                <FeaturesTable features={item.features} />
              </>
            )}
          </Await>
        </Suspense>
      </div>
      <Suspense fallback={<p>...Loading</p>}>
        <Await resolve={{ crauselData, item }}>
          {(loadedData) => {
            const { crauselData, item } = loadedData;

            return (
              <InfoContainer
                className={styled['info-container']}
                item={item}
                loaderData={Object.values(crauselData)}
              />
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default ProductDetail;

export async function loader({ params }) {
  const { requestFetch } = api();
  const itemId = params.itemId;

  const carouselAdress = 'carousel.json';

  const itemAdress = `items/${itemId}.json`;

  return defer({
    item: await requestFetch({ adress: itemAdress }),
    crauselData: await requestFetch({ adress: carouselAdress }),
  });
}
