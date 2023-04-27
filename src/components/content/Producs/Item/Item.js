import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cartAction } from '../../../../store/cart-slice';
import AuthContext from '../../../../context/Auth-Context';

import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

import styled from './Item.module.css';

const Item = ({ item }) => {
  const dispatch = useDispatch();

  const authCtx = useContext(AuthContext);

  const addCartHandler = (item) => {
    dispatch(cartAction.addToCart({ ...item, id: item.id }));
  };

  return (
    <Card className={styled.card}>
      <Link to={item.id} className={styled['item-container']}>
        <div className={styled['image-container']}>
          <img className={styled.img} src={item.img} alt={item.name} />
        </div>
        <p className={styled.info}>{item.name}</p>
        <p
          className={`${styled.price}`}
        >{`${item.price.toLocaleString()} TL`}</p>
      </Link>
      {authCtx?.currentUid && (
        <div className={styled['addToCard-container']}>
          <Button className={styled.btn} onClick={() => addCartHandler(item)}>
            Add To Cart
          </Button>
        </div>
      )}
    </Card>
  );
};

export default Item;

/* Linke reletif koymak active olanu mı yoksa urldeki adresse yazanımı koymak istediğimizi belirtmemize yarar
 relative ="path | route" as a default will be route. Yani aktif parenta otomatik bağlanır.
 path ta ise aktif urledeki pathe göre bağlanır.

 Linkteki to=".." olunca bi önceki relatif olup aynı zamanda routa göre geri alır.*/
