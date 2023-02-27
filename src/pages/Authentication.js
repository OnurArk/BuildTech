import React from 'react';
import { redirect, useSearchParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../firebase';

import AuthImage from '../components/auth/backgroundAuth/AuthImage';
import Login from '../components/auth/login/Login';
import Signup from '../components/auth/signup/Signup';
import ForgotPassword from '../components/auth/forgot-password/ForgotPassword';

import styled from '../styles/Authentication.module.css';

const animationTiming = { enter: 500, exit: 500 };

const Authentication = () => {
  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get('mode') === 'signup';
  const isForgatPassword = searchParams.get('mode') === 'forgot-password';

  const styleContainer =
    isSignup || isForgatPassword ? `${styled['not-login']}` : null;

  return (
    <div className={styled.authentication}>
      <AuthImage isLogin={!isSignup && !isForgatPassword} />
      <div
        className={`${styled['log_sign_reset-container']} ${styleContainer}`}
      >
        <CSSTransition
          mountOnEnter
          unmountOnExit // domdan silmek için
          in={!isSignup && !isForgatPassword}
          timeout={animationTiming}
          classNames={{
            enterActive: `${styled.openSignup}`,
            exitActive: `${styled.closeSignup}`,
          }}
        >
          <Login />
        </CSSTransition>

        <CSSTransition
          mountOnEnter
          unmountOnExit // domdan silmek için
          in={isSignup}
          timeout={animationTiming}
          classNames={{
            enterActive: `${styled.openSignup}`,
            exitActive: `${styled.closeSignup}`,
          }}
        >
          <Signup />
        </CSSTransition>

        <CSSTransition
          mountOnEnter
          unmountOnExit // domdan silmek için
          in={isForgatPassword}
          timeout={animationTiming}
          classNames={{
            enterActive: `${styled.openSignup}`,
            exitActive: `${styled.closeSignup}`,
          }}
        >
          <ForgotPassword />
        </CSSTransition>
      </div>
    </div>
  );
};
export default Authentication;

export async function action({ request }) {
  const toActionData = {};
  const searchParams = new URL(request.url).searchParams;

  const mode = searchParams.get('mode') || 'login';

  const data = await request.formData();

  const email = data.get('email');
  const password = data.get('password');
  const confirmPassword = data.get('confirm-password');

  /*Error Handling For Signup */

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

  if (mode === 'login' || mode === 'signup') {
    if (confirmPassword && password !== confirmPassword) {
      toActionData.errMessage = 'Passwords did not match!';
      toActionData.errType
        ? toActionData.errType.push('password')
        : (toActionData.errType = ['password']);
    }

    if (typeof password !== 'string' || password.length < 6) {
      toActionData.errMessage = 'Password must be > 6 characters';
      toActionData.errType
        ? toActionData.errType.push('password')
        : (toActionData.errType = ['password']);
    }

    if (Object.keys(toActionData).length) {
      return toActionData;
    }

    if (mode === 'signup') {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        toActionData.isSucceed = true;
        return toActionData;
      } catch (err) {
        err.message = err.message.replace('Firebase: ', '');
        err.message = err.message.replace(/ *\([^)]*\) */g, '');
        toActionData.errMessage = err.message;
        return toActionData;
      }
    }

    if (mode === 'login') {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        return redirect('/');
      } catch (err) {
        toActionData.errMessage = 'Check your email or password again!';
        return toActionData;
      }
    }
  }
  if (Object.keys(toActionData).length) {
    return toActionData;
  }

  if (mode === 'forgot-password') {
    try {
      await sendPasswordResetEmail(auth, email);
      return redirect('/login');
    } catch (err) {
      console.log(err);
    }
  }
}
