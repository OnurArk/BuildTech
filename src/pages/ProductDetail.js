import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useRouteLoaderData } from 'react-router-dom';

import ItemDetailSlide from '../components/content/Producs/producsDetails/detail-Left/ItemDetailSlide';
import FeaturesTable from '../components/content/Producs/producsDetails/detail-Left/FeaturesTable';
import { fetchİtemsData } from '../store/item-action';
import InfoContainer from '../components/content/Producs/producsDetails/infoContainer/InfoContainer';

import styled from '../styles/ProductDetail.module.css';

const ProductDetail = () => {
  const dispatch = useDispatch();

  // Carouselin datası loaderdan geliyor
  const loaderData = useRouteLoaderData('carousel-load');

  // Adresse yüklenmiş prodğın item idsini almak için
  const params = useParams();
  const { itemId } = params;

  // Sliderdaki item id ile adresteki item id sini karşılaştırıldığı yer
  const items = useSelector((state) => state.detailItem.items);
  const item = items.find((item) => item.id === itemId);

  // Item deiyının dispaci burda yapılır

  useEffect(() => {
    dispatch(fetchİtemsData());
  }, [dispatch]);

  return (
    <div className={styled['detail-container']}>
      <div className={styled['image-container']}>
        <ItemDetailSlide item={item} />
        <FeaturesTable item={item} />
      </div>
      <InfoContainer
        className={styled['info-container']}
        item={item}
        loaderData={loaderData}
      />
    </div>
  );
};

export default ProductDetail;
