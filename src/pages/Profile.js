import React from 'react';
import { redirect } from 'react-router-dom';
import { updateEmail } from 'firebase/auth';
import { auth } from '../firebase';

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
  const searchParams = new URL(request.url).searchParams;

  const nav = searchParams.get('nav');

  console.log(nav);

  const data = await request.formData();
  const phone = data.get('phone');
  const adress = data.get('adress');
  const email = data.get('email');

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

  if (nav === 'email' && email) {
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

  return redirect('/profile');
}
