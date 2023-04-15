import { useSearchParams } from 'react-router-dom';

import NavBar from '../components/cart/top-navbar/NavBar';
import Payment from '../components/cart/payment/Payment';
import Price from '../components/cart/price/Price';

import styled from '../styles/Cart.module.css';

const Cart = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  console.log(mode);
  return (
    <div className={styled['cart-container']}>
      <NavBar />
      <div className={styled.panels}>{mode === 'payment' && <Payment />}</div>

      <div className={styled.price}>
        <Price />
      </div>
    </div>
  );
};

export default Cart;
