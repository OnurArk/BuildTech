import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../../ui/Card';

import styled from './Item.module.css';

const Item = ({ img, name, price, id }) => {
  // TO DO favoriye ekle kalp le

  return (
    <Card className={styled.card}>
      <Link to={id} className={styled['item-container']}>
        <div className={styled['image-container']}>
          <img className={styled.img} src={img} alt={name} />
        </div>
        <p className={styled.info}>{name}</p>
        <p className={`${styled.price}`}>{price} TL</p>
      </Link>
    </Card>
  );
};

export default Item;

/* Linke reletif koymak active olanu mı yoksa urldeki adresse yazanımı koymak istediğimizi belirtmemize yarar
 relative ="path | route" as a default will be route. Yani aktif parenta otomatik bağlanır.
 path ta ise aktif urledeki pathe göre bağlanır.

 Linkteki to=".." olunca bi önceki relatif olup aynı zamanda routa göre geri alır.*/
