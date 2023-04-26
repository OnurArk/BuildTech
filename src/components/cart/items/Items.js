import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cartAction } from '../../../store/cart-slice';

import styled from './Items.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const Items = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const addItemHandler = (item) => {
    dispatch(cartAction.addToCart(item));
  };

  const removeItemHandler = (id) => {
    dispatch(cartAction.removeFromCart(id));
  };

  const deleteItemHandler = (id) => {
    dispatch(cartAction.deleteItemFromCart(id));
  };

  const items = cartItems.map((item) => (
    <div className={styled['item-container']} key={item.id}>
      <div className={styled['img-container']}>
        <img className={styled.img} src={item.img} alt={item.type} />
      </div>
      <div className={`${styled['unit-price']} ${styled['info-container']}`}>
        <h4 className={styled.tag}>Unit Price</h4>
        <p>{item.price} TL</p>
      </div>
      <div className={styled['info-container']}>
        <h4 className={styled.tag}>Amount</h4>
        <div className={styled['amount-container']}>
          <FontAwesomeIcon
            className={styled.icon}
            icon={faMinus}
            onClick={() => removeItemHandler(item.id)}
          />
          <p>{item.quantity}</p>
          <FontAwesomeIcon
            className={styled.icon}
            icon={faPlus}
            onClick={() => addItemHandler(item)}
          />
        </div>
      </div>
      <div className={styled['info-container']}>
        <h4 className={styled.tag}>Total Price</h4>
        <p>{item.totalPrice} TL</p>
      </div>

      <div
        className={styled['cancel-container']}
        onClick={() => deleteItemHandler(item.id)}
      >
        <FontAwesomeIcon className={styled.icon} icon={faTrashCan} />
      </div>
    </div>
  ));

  return (
    <div className={styled['items-container']}>
      {cartItems.length > 0 ? (
        items
      ) : (
        <Link to={'/home'} className={styled.link}>
          <h3 className={styled.emtyCart}>No Items in Cart</h3>
        </Link>
      )}
    </div>
  );
};

export default Items;
