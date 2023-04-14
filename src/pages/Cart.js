import React from 'react';
import { useSearchParams } from 'react-router-dom';

import NavBar from '../components/cart/top-navbar/NavBar';
import Payment from '../components/cart/payment/Payment';

import styled from '../styles/Cart.module.css';

const Cart = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  console.log(mode);
  return (
    <div className={styled['cart-container']}>
      <NavBar />
      {mode === 'payment' && <Payment />}
    </div>
  );
};

export default Cart;
