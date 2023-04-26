import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../../ui/Button';

import styled from './Price.module.css';

const Price = () => {
  const [isOrdered, setIsOrdered] = useState(false);
  const [errMsg, setErrMsg] = useState();

  const totalPriceCart = useSelector((state) => state.cart.totalPrice);
  const [searchParams] = useSearchParams();

  const mode = searchParams.get('mode');

  const orderHandler = () => {
    console.log('aa');
    if (totalPriceCart <= 0) {
      setErrMsg('You Need to Add Items to Cart to Order');
    } else {
      setIsOrdered(true);
      console.log('Ordered Successfully');
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
      {isOrdered && <p className={styled.succesOrder}>Your Order Is Taken</p>}
    </div>
  );
};

export default Price;
