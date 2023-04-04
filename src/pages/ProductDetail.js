import React, { Suspense } from 'react';

import { Await, defer, useLoaderData } from 'react-router-dom';

import ItemDetailSlide from '../components/content/Producs/producsDetails/detail-Left/ItemDetailSlide';
import FeaturesTable from '../components/content/Producs/producsDetails/detail-Left/FeaturesTable';
import InfoContainer from '../components/content/Producs/producsDetails/infoContainer/InfoContainer';
import api from '../util/api';

import styled from '../styles/ProductDetail.module.css';
import Loaders from '../components/ui/Loaders';

const ProductDetail = () => {
  // Sliderdaki item id ile adresteki item id sini karşılaştırıldığı yer
  const { item } = useLoaderData();

  return (
    <div className={styled['detail-container']}>
      <div className={styled['image-container']}>
        <Suspense fallback={<Loaders />}>
          <Await resolve={item}>
            {(item) => {
              console.log(item.features);
              return (
                <>
                  <ItemDetailSlide images={item.images || []} />
                  <FeaturesTable features={Object.entries(item.features)} />
                </>
              );
            }}
          </Await>
        </Suspense>
      </div>
      <InfoContainer className={styled['info-container']} item={item} />
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
    item: requestFetch({ adress: itemAdress }),
    crauselData: requestFetch({ adress: carouselAdress }),
  });
}
