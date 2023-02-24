import React from 'react';
import { useSearchParams } from 'react-router-dom';

import styled from './NavigateAuth.module.css';
const NavigateAuth = () => {
  const searchParams = useSearchParams();
  const isSignup = searchParams.get('mode') === 'signup';

  return (
    <div>
      {isSignup && (
        <div className={`${styled.direct}`}>
          <h1>Sign up to explore the world of high-tech</h1>
          <p>if you don't have an account yet, join us and start you journey</p>
          <button>Log In</button>
        </div>
      )}
      {!isSignup && (
        <div className={` ${styled.direct}`}>
          <h1>Sign up to explore the world of high-tech</h1>
          <p>if you don't have an account yet, join us and start you journey</p>
          <button>Sign Up</button>
        </div>
      )}
    </div>
  );
};

export default NavigateAuth;
