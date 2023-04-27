import { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cartAction } from '../../../store/cart-slice';

import Button from '../../ui/Button';

import styled from './Price.module.css';

const Price = () => {
  const [isOrdered, setIsOrdered] = useState(false);
  const [errMsg, setErrMsg] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalPriceCart = useSelector((state) => state.cart.totalPrice);
  const orderedItems = useSelector((state) => state.cart.orderedItems);
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  const orderHandler = () => {
    if (totalPriceCart <= 0) {
      setErrMsg('You Need to Add Items to Cart to Order');
    } else {
      setIsOrdered(true);
      console.log('Ordered Successfully');
      orderedItems.map((item) => console.log(item));
      dispatch(cartAction.resetToCart());
      setTimeout(() => {
        navigate('/home');
      }, 1200);
    }
  };

  return (
    <div className={styled['price-container']}>
      <div className={styled.price}>
        <p>Total Price:</p>
        <p>{`${totalPriceCart} TL`}</p>
      </div>

      {mode !== 'payment' && (
        <Link
          to={`?mode=${mode === 'items' ? 'adress' : 'payment'}`}
          className={styled.link}
        >
          <Button
            className={styled.btn}
            lineThicness={'3px'}
            lineLength={45}
            lineColor={'#DA4919'}
            blurColor={'#F3B575'}
            blurSize={4}
            animationSpeed={3000}
            rX={20}
            glowOffset={5}
          >
            Continue
          </Button>
        </Link>
      )}

      {mode === 'payment' && (
        <Button
          className={styled.btn}
          lineThicness={'3px'}
          lineLength={45}
          lineColor={'#DA4919'}
          blurColor={'#F3B575'}
          blurSize={4}
          animationSpeed={3000}
          rX={20}
          glowOffset={5}
          onClick={orderHandler}
        >
          Order
        </Button>
      )}

      {errMsg && <p className={styled.errMsg}>{errMsg}</p>}
      {!errMsg && isOrdered && (
        <>
          <p className={styled.succesOrder}>Your Order Is Taken</p>
          <svg
            className={styled.checkmark}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 52 52'
          >
            <circle
              className={styled['checkmark__circle']}
              cx='26'
              cy='26'
              r='25'
              fill='none'
            />
            <path
              className={styled['checkmark__check']}
              fill='none'
              d='M14.1 27.2l7.1 7.2 16.7-16.8'
            />
          </svg>
        </>
      )}
    </div>
  );
};

export default Price;
