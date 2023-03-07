import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import ChangePassword from './DynamicPanel/ChangePassword';
import ChangeUserName from './DynamicPanel/Change-User-Name';
import AccountDetails from './DynamicPanel/AccountDetails';

import styled from './Dynamic-Panel.module.css';
const DynamicPanel = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  return (
    <div className={styled.DynamicPanel}>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={mode === 'change-password'}
        timeout={{ enter: 500, exit: mode ? 0 : 500 }}
        classNames={{
          enterActive: `${styled.openSignup}`,
          exitActive: `${styled.closeSignup}`,
        }}
      >
        <ChangePassword />
      </CSSTransition>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={mode === 'change-user-name'}
        timeout={{ enter: 500, exit: mode ? 0 : 500 }}
        classNames={{
          enterActive: `${styled.openSignup}`,
          exitActive: `${styled.closeSignup}`,
        }}
      >
        <ChangeUserName />
      </CSSTransition>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={mode === 'account-details'}
        timeout={{ enter: 500, exit: mode ? 0 : 500 }}
        classNames={{
          enterActive: `${styled.openSignup}`,
          exitActive: `${styled.closeSignup}`,
        }}
      >
        <AccountDetails />
      </CSSTransition>
    </div>
  );
};

export default DynamicPanel;
