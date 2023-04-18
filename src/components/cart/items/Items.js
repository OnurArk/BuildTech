import styled from './Items.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const img1 =
  'https://cdn.vatanbilgisayar.com/Upload/PRODUCT/grundig/thumb/132302-1-4_large.jpg';

const dummyItems = [
  { img: img1, type: 'televizyon', price: 10, amount: 2, totalPrice: 2000 },
  { img: img1, type: 'televizyon', price: 15, amount: 1, totalPrice: 15000 },
];

const Items = () => {
  const items = dummyItems.map((items, indexItem) => (
    <div className={styled['item-container']} key={indexItem}>
      <div className={styled['img-container']}>
        <img className={styled.img} src={items.img} alt={items.type} />
      </div>
      <div className={styled['info-container']}>
        <h4 className={styled.tag}>Amount</h4>
        <div className={styled['amount-container']}>
          <FontAwesomeIcon className={styled.icon} icon={faMinus} />
          <p>{items.amount}</p>
          <FontAwesomeIcon className={styled.icon} icon={faPlus} />
        </div>
      </div>
      <div className={styled['info-container']}>
        <h4 className={styled.tag}>Total Price</h4>
        <p>{items.totalPrice} $</p>
      </div>

      <div className={styled['cancel-container']}>
        <FontAwesomeIcon className={styled.icon} icon={faTrashCan} />
      </div>
    </div>
  ));

  return <div className={styled['items-container']}>{items}</div>;
};

export default Items;
