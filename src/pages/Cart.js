import { useSearchParams, redirect } from 'react-router-dom';

import { collection, query, getDocs, setDoc, doc } from 'firebase/firestore';
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

export async function action({ request }) {
  const toActionData = {};

  const user = auth.currentUser;
  const userInfo = {};
  console.log(user);
  if (user) {
    userInfo.uid = user.uid;
  } else {
    toActionData.errMessage = 'No user Founded';
  }

  //  Search Keys
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode');

  // formating getted data
  const data = await request.formData();

  // function to optimize code

  function formatErrorMessage(err) {
    err.message = err.message.replace('Firebase: ', '');
    err.message = err.message.replace(/ *\([^)]*\) */g, '');
    return err.message;
  }

  function handleError(err) {
    toActionData.errMessage = formatErrorMessage(err);
    return toActionData;
  }

  function handlerErrAndType(message, type) {
    toActionData.errMessage = message;
    if (type) {
      toActionData.errType
        ? toActionData.errType.push(type)
        : (toActionData.errType = [type]);
    }
  }

  // Update Payment Data Section

  if (mode === 'payment') {
    const paymentData = {
      namePayment: data.get('card-name')?.trim(),
      cardNumber: data.get('card-number')?.trim(),
      expiration: data.get('expiration')?.trim(),
      securityCode: data.get('security-code')?.trim(),
    };

    const paymentRef = collection(db, 'payment');

    if (!paymentData.namePayment) {
      handlerErrAndType('Name must be enter', 'card-name');
    }

    if (!paymentData.cardNumber) {
      handlerErrAndType('Card Number must be enter', 'card-number');
    }

    if (!paymentData.expiration) {
      handlerErrAndType('Expiration must be enter', 'expiration');
    }
    if (!paymentData.securityCode) {
      handlerErrAndType('Security code must be enter', 'security-code');
    }

    if (Object.keys(toActionData).length) {
      return toActionData;
    }

    if (
      paymentData.namePayment &&
      paymentData.cardNumber &&
      paymentData.expiration &&
      paymentData.securityCode
    ) {
      try {
        await setDoc(doc(paymentRef, userInfo.uid), {
          namePayment: paymentData.namePayment,
          cardNumber: paymentData.cardNumber,
          expiration: paymentData.expiration,
          securityCode: paymentData.securityCode,
        });
        return redirect('?mode=payment');
      } catch (err) {
        return handleError(err);
      }
    }
  }

  // Update Adress Data Section

  if (mode === 'adress') {
    const line1 = data.get('line1')?.trim();
    const city = data.get('city')?.trim();
    const country = data.get('country')?.trim();
    const state = data.get('state')?.trim() || null;

    const adressRef = collection(db, 'adress');

    if (line1.length < 20) {
      handlerErrAndType(
        'Please enter at least 20 characters to Adress line',
        'line1'
      );
    }

    if (!line1) {
      handlerErrAndType('You should fill the Adress line', 'line1');
    }

    if (!country) {
      handlerErrAndType('You should enter a Country', 'country');
    }

    if (!city) {
      handlerErrAndType('You should enter a City', 'city');
    }
    if (Object.keys(toActionData).length) {
      return toActionData;
    }

    if (line1 && country && city) {
      try {
        await setDoc(doc(adressRef, userInfo.uid), {
          line: line1,
          city,
          country,
          state,
        });
        return redirect('/cart?mode=adress');
      } catch (err) {
        return handleError(err);
      }
    }
  }
}

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
