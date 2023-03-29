import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLoaderData, json } from 'react-router-dom';

import ItemDetailSlide from './detail-Left/ItemDetailSlide';
import FeaturesTable from './detail-Left/FeaturesTable';
import { fetchİtemsData } from '../../../../store/item-action';
import InfoContainer from './infoContainer/InfoContainer';
import api from '../../../../util/api';

import styled from './ProductDetail.module.css';

const ProductDetail = () => {
  const dispatch = useDispatch();

  // Carouselin datası loaderdan geliyor
  const loaderData = useLoaderData();

  // Adresse yüklenmiş prodğın item idsini almak için
  const params = useParams();
  const { itemId } = params;

  // Sliderdaki item id ile adresteki item id sini karşılaştırıldığı yer
  const items = useSelector((state) => state.detailItem.items);
  const item = items.find((item) => item.id === itemId);
  if (!item) {
    throw json({}, { status: 404, statusText: 'Can not find this item!' });
  }
  // TO DO Eğer item yoksa hata mesajı gönder

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

export function loader() {
  const { requestFetch } = api();
  const adress = 'carousel.json';
  return requestFetch({ adress });
}
