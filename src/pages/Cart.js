import { useSearchParams } from 'react-router-dom';
import { collection, query, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';

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
        {mode === 'items' && <Items />}

        {mode === 'adress' && <Adress />}

        {mode === 'payment' && <Payment />}

        <Price />
      </div>
    </div>
  );
};

export default Cart;

async function getUserData(inputType) {
  const userRef = collection(db, inputType);
  const docRef = query(userRef, auth?.currentUser?.uid);
  const docSnap = await getDocs(docRef);

  const mappedData = docSnap.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));

  const user = mappedData.find((user) => user.id === auth?.currentUser?.uid);

  if (inputType === 'adress') {
    return {
      line: user?.data.line,
      country: user?.data.country,
      city: user?.data.city,
      state: user?.data.state,
    };
  }
  if (inputType === 'payment') {
    return user?.data;
  }
}

export async function loader() {
  return {
    adress: await getUserData('adress'),
    payment: await getUserData('payment'),
  };
}
