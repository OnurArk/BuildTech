import React, { useContext } from 'react';
import { redirect } from 'react-router-dom';
import { updateEmail } from 'firebase/auth';
import { doc, collection, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

import AuthContext from '../context/Auth-Context';
import UserContainer from '../components/profile/user-container/User-Container';
import InfoContainer from '../components/profile/info-container/Info-Container';
import DynamicPanel from '../components/profile/DynamicPanel/Dynamic-Panel';

import styled from '../styles/Profile.module.css';

const Profile = () => {
  const propfileCtx = useContext(AuthContext);

  return (
    <div
      className={styled['profile-container']}
      style={propfileCtx.profileBackground}
    >
      <div className={styled['user-info-container']}>
        <UserContainer />
        <InfoContainer />
      </div>
      <DynamicPanel />
    </div>
  );
};

export default Profile;

export async function action({ request }) {
  const toActionData = {};

  const user = auth.currentUser;
  const userInfo = {};

  if (user) {
    userInfo.uid = user.uid;
    console.log(user.uid);
  } else {
    toActionData.errMessage = 'No user Founded';
  }

  //  Search Keys
  const searchParams = new URL(request.url).searchParams;
  const nav = searchParams.get('nav');

  // formating getted data
  const data = await request.formData();

  // Phone
  const phone = data.get('phone')?.trim();
  // Reset email
  const email = data.get('email')?.trim();
  // Adress
  const line1 = data.get('line1')?.trim();
  const city = data.get('city')?.trim();
  const state = data.get('state')?.trim();
  const country = data.get('country')?.trim();

  // Payment-Details
  const namePayment = data.get('card-name')?.trim();
  const cardNumber = data.get('card-number')?.trim();
  const expiration = data.get('expiration')?.trim();
  const securityCode = data.get('security-code')?.trim();

  // Update Phone Section

  if (nav === 'phone') {
    const phoneRef = collection(db, 'phone');

    if (phone?.length < 11) {
      toActionData.errMessage =
        'Your phone number at least should have 11 digits!';
    }
    if (isNaN(phone)) {
      toActionData.errMessage = 'That not a number. Please enter number!';
    }

    if (Object.keys(toActionData).length) {
      return toActionData;
    }

    if (phone && phone?.length === 11) {
      try {
        await setDoc(doc(phoneRef, userInfo.uid), {
          phone: phone,
          timestamp: serverTimestamp(),
        });
        return redirect('?mode=account-details');
      } catch (err) {
        err.message = err.message.replace('Firebase: ', '');
        err.message = err.message.replace(/ *\([^)]*\) */g, '');
        toActionData.errMessage = err.message;
        return toActionData;
      }
    }
  }

  // Update Adress Section

  if (nav === 'adress') {
    const adressRef = collection(db, 'adress');

    if (line1.length < 20) {
      toActionData.errMessage = 'Please enter at leat 20 characters';
    }

    if (!line1) {
      toActionData.errMessage = 'You should fill the Adress line';
      toActionData.errType
        ? toActionData.errType.push('line1')
        : (toActionData.errType = ['line1']);
    }

    if (!country) {
      toActionData.errMessage = 'You should enter a Country';
      toActionData.errType
        ? toActionData.errType.push('country')
        : (toActionData.errType = ['country']);
    }

    if (!city) {
      toActionData.errMessage = 'You should enter a City';
      toActionData.errType
        ? toActionData.errType.push('city')
        : (toActionData.errType = ['city']);
    }
    if (Object.keys(toActionData).length) {
      return toActionData;
    }

    if (line1 && country && city) {
      const adress = `${country}/ ${
        state ? `${state}/` : ''
      } ${city}/  ${line1}`;

      try {
        await setDoc(doc(adressRef, userInfo.uid), {
          adress: adress,
        });
        return redirect('?mode=account-details');
      } catch (err) {
        err.message = err.message.replace('Firebase: ', '');
        err.message = err.message.replace(/ *\([^)]*\) */g, '');
        toActionData.errMessage = err.message;

        return toActionData;
      }
    }
  }

  // Update Email Section

  if (nav === 'email') {
    if (
      typeof email !== 'string' ||
      !email.includes('@') ||
      !email.includes('.com')
    ) {
      toActionData.errMessage = 'Email address must contain @ and .com';
      toActionData.errType
        ? toActionData.errType.push('email')
        : (toActionData.errType = ['email']);
    }

    if (Object.keys(toActionData).length) {
      return toActionData;
    }

    if (email) {
      try {
        await updateEmail(auth.currentUser, email);
        await auth.signOut();
        return redirect('/authentication');
      } catch (err) {
        err.message = err.message.replace('Firebase: ', '');
        err.message = err.message.replace(/ *\([^)]*\) */g, '');
        toActionData.errMessage = err.message;
        return toActionData;
      }
    }
  }

  // Update Payment Data Section

  if (nav === 'payment-details') {
    const paymentRef = collection(db, 'payment');

    if (!namePayment) {
      toActionData.errMessage = 'Card name must be enter';
      toActionData.errType
        ? toActionData.errType.push('nameErr')
        : (toActionData.errType = ['nameErr']);
    }

    if (!cardNumber) {
      toActionData.errMessage = 'Card Number must be enter';
      toActionData.errType
        ? toActionData.errType.push('cardNumberErr')
        : (toActionData.errType = ['cardNumberErr']);
    }

    if (!expiration) {
      toActionData.errMessage = 'Expiration must be enter';
      toActionData.errType
        ? toActionData.errType.push('expirationErr')
        : (toActionData.errType = ['expirationErr']);
    }
    if (!securityCode) {
      toActionData.errMessage = 'Security code must be enter';
      toActionData.errType
        ? toActionData.errType.push('securityErr')
        : (toActionData.errType = ['securityErr']);
    }

    if (Object.keys(toActionData).length) {
      return toActionData;
    }

    if (namePayment && cardNumber && expiration && securityCode) {
      try {
        await setDoc(doc(paymentRef, userInfo.uid), {
          namePayment: namePayment,
          cardNumber: cardNumber,
          expiration: expiration,
          securityCode: securityCode,
        });
        return redirect('?mode=account-details');
      } catch (err) {
        err.message = err.message.replace('Firebase: ', '');
        err.message = err.message.replace(/ *\([^)]*\) */g, '');
        toActionData.errMessage = err.message;

        return toActionData;
      }
    }
  }
  return redirect('/profile');
}
