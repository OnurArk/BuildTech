import { useSearchParams } from 'react-router-dom';

import NavBar from '../components/cart/top-navbar/NavBar';
import Items from '../components/cart/items/Items';
import Adress from '../components/cart/adress/Adress';
import Payment from '../components/cart/payment/Payment';
import Price from '../components/cart/price/Price';

import styled from '../styles/Cart.module.css';

const Cart = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  return (
    <div className={styled['cart-container']}>
      <NavBar />
      <div className={styled['content-container']}>
        {mode === 'payment' && <Payment />}
        {mode === 'items' && <Items />}
        {mode === 'adress' && <Adress />}
        <Price />
      </div>
    </div>
  );
};

export default Cart;
