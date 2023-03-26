import React, { useContext } from 'react';
import { redirect } from 'react-router-dom';
import { updateEmail, updateProfile } from 'firebase/auth';
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

  function formatErrorMessage(err) {
    err.message = err.message.replace('Firebase: ', '');
    err.message = err.message.replace(/ *\([^)]*\) */g, '');
    return err.message;
  }

  function handleError(err) {
    toActionData.errMessage = formatErrorMessage(err);
    return toActionData;
  }

  // Update Phone Section

  if (nav === 'phone') {
    const phone = data.get('phone')?.trim();

    const phoneRef = collection(db, 'phone');

    if (isNaN(phone)) {
      toActionData.errMessage = 'That not a number. Please enter number!';
      return toActionData;
    }

    if (phone?.length < 11) {
      toActionData.errMessage =
        'Your phone number at least should have 11 digits!';
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
      toActionData.errMessage = 'Email address must contain @ and .com';
      toActionData.errType
        ? toActionData.errType.push('email')
        : (toActionData.errType = ['email']);
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
    const namePayment = data.get('card-name')?.trim();
    const cardNumber = data.get('card-number')?.trim();
    const expiration = data.get('expiration')?.trim();
    const securityCode = data.get('security-code')?.trim();

    const paymentRef = collection(db, 'payment');

    if (!namePayment) {
      toActionData.errMessage = 'Card name must be enter';
      toActionData.errType
        ? toActionData.errType.push('card-name')
        : (toActionData.errType = ['card-name']);
    }

    if (!cardNumber) {
      toActionData.errMessage = 'Card Number must be enter';
      toActionData.errType
        ? toActionData.errType.push('card-number')
        : (toActionData.errType = ['card-number']);
    }

    if (!expiration) {
      toActionData.errMessage = 'Expiration must be enter';
      toActionData.errType
        ? toActionData.errType.push('expiration')
        : (toActionData.errType = ['expiration']);
    }
    if (!securityCode) {
      toActionData.errMessage = 'Security code must be enter';
      toActionData.errType
        ? toActionData.errType.push('security-code')
        : (toActionData.errType = ['security-code']);
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
        return handleError(err);
      }
    }
  }

  // Update User Name
  if (mode === 'change-user-name') {
    const userName = data.get('user-name');

    if (userName.length < 2) {
      toActionData.errMessage = 'User Name must be longer than 2 characters';
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

        const name = auth.currentUser.displayName;

        return { name };
      } catch (err) {
        return handleError(err);
      }
    }
  }

  // Photo Update
  const urlPhoto = data.get('url-photo');

  if (urlPhoto) {
    const photoPropRef = collection(db, 'photoProp');
    const position = data.get('position');
    const size = data.get('size');

    if (!urlPhoto.startsWith('https://')) {
      toActionData.errMessage = 'That not a proper https format';
      toActionData.errType = 'url-photo';
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
        const photo = user.photoURL;
        return { photo, position, size };
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
