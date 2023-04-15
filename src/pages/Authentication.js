import { useState, useEffect } from 'react';
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

const Authentication = () => {
  const [time, setTime] = useState(window.innerWidth < 608 ? 0 : 500);

  useEffect(() => {
    const handleResize = () => {
      const newWindowWidth = window.innerWidth;
      const newTime = newWindowWidth < 608 ? 0 : 500;
      if (newTime !== time) {
        setTime(newTime);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [time]);

  const animationTiming = { enter: 500, exit: time };

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
          <Login time={time} />
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
          <Signup time={time} />
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
          <ForgotPassword time={time} />
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
    if (mode === 'signup') {
      if (!confirmPassword || !password) {
        toActionData.errMessage = 'You need to type!';
        toActionData.errType
          ? toActionData.errType.push('password')
          : (toActionData.errType = ['password']);
      }
    }

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
        return redirect('/');
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
        err.message = err.message.replace('Firebase: ', '');
        err.message = err.message.replace(/ *\([^)]*\) */g, '');
        toActionData.errMessage = err.message;
        return toActionData;
      }
    }
  }

  if (mode === 'forgot-password') {
    if (!email) {
      toActionData.errMessage = 'Please enter an email first';
      toActionData.errType
        ? toActionData.errType.push('email')
        : (toActionData.errType = ['email']);
    }

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

    try {
      await sendPasswordResetEmail(auth, email);
      return redirect('?mode=login');
    } catch (err) {
      err.message = err.message.replace('Firebase: ', '');
      err.message = err.message.replace(/ *\([^)]*\) */g, '');
      toActionData.errMessage = err.message;
      return toActionData;
    }
  }
}
