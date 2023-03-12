import React from 'react';
import { redirect, useSearchParams } from 'react-router-dom';
import { updateEmail } from 'firebase/auth';
import { doc, collection, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

import UserContainer from '../components/profile/User-Container';
import InfoContainer from '../components/profile/Info-Container';
import DynamicPanel from '../components/profile/Dynamic-Panel';

import styled from '../styles/Profile.module.css';

const Profile = () => {
  const [searchParams] = useSearchParams();
  const isPaymentDetail = searchParams.get('nav') === 'payment-details';

  const profileSizeControlStyle = {
    '--gridTemplateRows': isPaymentDetail ? '0.5fr 1fr' : 'repeat(2, 1fr)',
  };

  return (
    <div className={styled['profile-container']}>
      <div
        className={styled['profile-size-control']}
        style={profileSizeControlStyle}
      >
        <UserContainer className={styled['user-container-grid']} />
        <InfoContainer className={styled['info-container-grid']} />
        <DynamicPanel className={styled['dynamic-container-grid']} />
      </div>
    </div>
  );
};

export default Profile;

export async function action({ request }) {
  const toActionData = {};

  const user = auth.currentUser;
  const userInfo = {};

  if (user) {
    user.providerData.forEach((profile) => {
      userInfo.uid = profile.uid;
    });
  } else {
    toActionData.errMessage = 'No user Founded';
  }

  const phoneRef = collection(db, 'phone');
  const adressRef = collection(db, 'adress');

  const searchParams = new URL(request.url).searchParams;
  const nav = searchParams.get('nav');

  const data = await request.formData();
  const phone = data.get('phone')?.trim();
  const email = data.get('email')?.trim();
  // Adress
  const line1 = data.get('line1')?.trim();
  const city = data.get('city')?.trim();
  const state = data.get('state')?.trim();
  const country = data.get('country')?.trim();

  // Update Phone Section

  if (nav === 'phone') {
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

  return redirect('/profile');
}
