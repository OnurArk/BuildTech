import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import styled from './NavigateAuth.module.css';
const NavigateAuth = () => {
  const [searchParams] = useSearchParams();
  const notLogin =
    searchParams.get('mode') === 'signup' ||
    searchParams.get('mode') === 'forgot-password';

  return (
    <div>
      <CSSTransition
        unmountOnExit
        in={notLogin}
        timeout={{ enter: 1500 }}
        classNames={{
          enter: `${styled.in}`,
        }}
      >
        <div className={`${styled.direct}`}>
          <h1>Log In to explore the world of high-tech</h1>
          <p>if you already have an account , login and have fun</p>
          <Link to='?mode=login' className={`${styled.btn}`}>
            Log In
          </Link>
        </div>
      </CSSTransition>

      <CSSTransition
        unmountOnExit
        in={!notLogin}
        timeout={{ enter: 500 }}
        classNames={{
          enter: `${styled.in}`,
        }}
      >
        <div className={` ${styled.direct}`}>
          <h1>Sign up to explore the world of high-tech</h1>
          <p>if you don't have an account yet, join us and start you journey</p>
          <Link to='?mode=signup' className={`${styled.btn}`}>
            Sign Up
          </Link>
        </div>
      </CSSTransition>
    </div>
  );
};

export default NavigateAuth;
