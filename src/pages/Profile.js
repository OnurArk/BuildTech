import React, { useContext } from 'react';
import { defer, json, redirect } from 'react-router-dom';
import {
  updateEmail,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';

import {
  doc,
  getDocs,
  query,
  collection,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

import AuthContext from '../context/Auth-Context';
import UserContainer from '../components/profile/user-container/User-Container';
import InfoContainer from '../components/profile/info-container/Info-Container';
import DynamicPanel from '../components/profile/DynamicPanel/Dynamic-Panel';

import styled from '../styles/Profile.module.css';

const Profile = () => {
  const profileCtx = useContext(AuthContext);

  return (
    <div className={styled['profile-container']} style={profileCtx.background}>
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

  // const method = request.method // method that camin is caps up like "POST" not "post"

  // to send backend information
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
  const nav = searchParams.get('nav');

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

  // Update Phone Section

  if (nav === 'phone') {
    const phone = data.get('phone')?.trim();

    const phoneRef = collection(db, 'phone');

    if (phone.startsWith('0')) {
      handlerErrAndType('Please dont start with 0, example: 5XX XXX XXXX');
      return toActionData;
    }

    if (isNaN(phone)) {
      handlerErrAndType('That not a number. Please enter number!');
      return toActionData;
    }

    if (phone?.length < 10) {
      handlerErrAndType('Your phone number at least should contain 10 digits!');

      return toActionData;
    }

    if (phone && phone?.length === 10) {
      try {
        await setDoc(doc(phoneRef, userInfo.uid), {
          phone: phone,
          timestamp: serverTimestamp(),
        });
        return redirect('?mode=account-details');
      } catch (err) {
        return handleError(err);
      }
    }
  }

  // Update Adress Section

  if (nav === 'adress') {
    const line1 = data.get('line1')?.trim();
    const city = data.get('city')?.trim();
    const state = data.get('state')?.trim();
    const country = data.get('country')?.trim();

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
      const adress = `${country}/ ${
        state ? `${state}/` : ''
      } ${city}/  ${line1}`;

      try {
        await setDoc(doc(adressRef, userInfo.uid), {
          adress: adress,
        });
        return redirect('?mode=account-details');
      } catch (err) {
        return handleError(err);
      }
    }
  }

  // Update Email Section

  if (nav === 'email') {
    const email = data.get('email')?.trim();

    if (
      typeof email !== 'string' ||
      !email.includes('@') ||
      !email.includes('.com')
    ) {
      handlerErrAndType('Email address must contain @ and .com', 'email');
      return toActionData;
    }

    if (email) {
      try {
        await updateEmail(auth.currentUser, email);
        await auth.signOut();
        return redirect('/authentication');
      } catch (err) {
        return handleError(err);
      }
    }
  }

  // Update Payment Data Section

  if (nav === 'payment-details') {
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
        return redirect('?mode=account-details');
      } catch (err) {
        return handleError(err);
      }
    }
  }

  // Update User Name
  if (mode === 'change-user-name') {
    const userName = data.get('user-name');

    if (!/^[a-z ]+[0-9]{0,4}$/i.test(userName)) {
      handlerErrAndType('User Name must be contain at least three letters');
    }

    if (userName.length <= 2) {
      handlerErrAndType('User Name must be longer than 2 characters');
    }

    if (userName.length > 20) {
      handlerErrAndType('User Name must be less than 20 characters');
    }

    if (Object.keys(toActionData).length) {
      return toActionData;
    }

    if (userName) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: userName,
          photoURL: user.photoURL,
        });

        return redirect('/profile');
      } catch (err) {
        return handleError(err);
      }
    }
  }

  // Reset User Password
  if (mode === 'change-password') {
    try {
      await sendPasswordResetEmail(auth, user.email);

      return redirect('/authentication');
    } catch (err) {
      return handleError(err);
    }
  }

  // Photo Update
  const urlPhoto = data.get('url-photo');

  if (urlPhoto) {
    const photoPropRef = collection(db, 'photoProp');
    const position = data.get('position');
    const size = data.get('size');

    if (!urlPhoto.startsWith('https://')) {
      handlerErrAndType('That not a proper https format', 'url-photo');
      return toActionData;
    }

    try {
      if (urlPhoto) {
        await setDoc(doc(photoPropRef, userInfo.uid), {
          position,
          size,
        });
        await updateProfile(auth.currentUser, {
          displayName: user.displayName,
          photoURL: urlPhoto,
        });

        return redirect('/profile');
      }
      // if (localPhoto.name) {
      //   await updateProfile(auth.currentUser, {
      //     displayName: user.displayName,
      //     photoURL: filePhoto,
      //   });

      //   const photo = user.photoURL;
      //   return { photo };
      // }
    } catch (err) {
      return handleError(err);
    }
  }

  // Default
  return redirect('/profile');
}

async function getAuthInfo() {
  const userInfo = {};

  // fetch user data from Firebase
  auth.onAuthStateChanged((user) => {
    if (user) {
      userInfo.email = user?.email;
      userInfo.uid = user?.uid;
      userInfo.userName = user?.displayName;
      userInfo.userPhoto = user?.photoURL;
    } else {
      // throw new Response(JSON.stringify({ message: 'No user founded!' }), {
      //   status: 404,
      // });
      // or
      throw json({ message: 'No user founded!' }, { status: 403 });
    }
  });

  return userInfo;
}

async function getUserData(inputType) {
  const userInfo = {};

  const userRef = collection(db, inputType);
  const docRef = query(userRef, auth?.currentUser?.uid);
  const docSnap = await getDocs(docRef);

  const mappedData = docSnap.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));

  const user = mappedData.find((user) => user.id === auth?.currentUser?.uid);

  if (inputType === 'phone') {
    userInfo.phone = user?.data.phone;
    return userInfo.phone;
  }
  if (inputType === 'adress') {
    userInfo.adress = user?.data.adress;
    return userInfo.adress;
  }
  if (inputType === 'payment') {
    userInfo.payment = user?.data;
    return userInfo.payment;
  }
  if (inputType === 'photoProp') {
    userInfo.photoProp = user?.data;
    return userInfo.photoProp;
  }
}

export async function loader() {
  return defer({
    authInfo: await getAuthInfo(),
    phone: getUserData('phone'),
    adress: getUserData('adress'),
    payment: getUserData('payment'),
    photoProp: await getUserData('photoProp'),
  });
}
