import React from 'react';
import { redirect } from 'react-router-dom';
import { updateEmail } from 'firebase/auth';
import { doc, collection, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

import UserContainer from '../components/profile/User-Container';
import InfoContainer from '../components/profile/Info-Container';
import DynamicPanel from '../components/profile/Dynamic-Panel';

import styled from '../styles/Profile.module.css';

const Profile = () => {
  return (
    <div className={styled['profile-container']}>
      <div className={styled['profile-size-control']}>
        <UserContainer />
        <InfoContainer />
        <DynamicPanel />
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
  console.log(user.uid);
  const userRef = collection(db, 'users');

  const searchParams = new URL(request.url).searchParams;
  const nav = searchParams.get('nav');

  const data = await request.formData();
  const phone = data.get('phone');

  // const adress = data.get('adress');
  const email = data.get('email');

  // Phone Section

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
        await setDoc(doc(userRef, userInfo.uid), {
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

  // Email Section

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
