import { useSearchParams } from 'react-router-dom';

import NavBar from '../components/cart/top-navbar/NavBar';
import Payment from '../components/cart/payment/Payment';
import Items from '../components/cart/items/Items';
import Price from '../components/cart/price/Price';

import styled from '../styles/Cart.module.css';

const Cart = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  console.log(mode);
  return (
    <div className={styled['cart-container']}>
      <NavBar />
      <div className={styled['content-container']}>
        {mode === 'payment' && <Payment />}
        {mode === 'items' && <Items />}
        <Price />
      </div>
    </div>
  );
};

export default Cart;
