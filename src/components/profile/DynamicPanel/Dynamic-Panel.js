import { useSearchParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import ChangePassword from './change-password/ChangePassword';
import ChangeUserName from './change-user/Change-User-Name';
import AccountDetails from './account-details/AccountDetails';

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
        timeout={{
          enter: 500,
          exit: mode && mode !== 'change-password' ? 0 : 400,
        }}
        classNames={{
          enterActive: `${styled.open}`,
          exitActive: `${
            mode && mode !== 'change-password'
              ? styled.closeRightAway
              : styled.close
          }`,
        }}
      >
        <ChangePassword />
      </CSSTransition>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={mode === 'change-user-name'}
        timeout={{
          enter: 500,
          exit: mode && mode !== 'change-user-name' ? 0 : 500,
        }}
        classNames={{
          enterActive: `${styled.open}`,
          exitActive: `${
            mode && mode !== 'change-user-name'
              ? styled.closeRightAway
              : styled.close
          }`,
        }}
      >
        <ChangeUserName />
      </CSSTransition>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={mode === 'account-details'}
        timeout={{
          enter: 500,
          exit: mode && mode !== 'account-details' ? 0 : 500,
        }}
        classNames={{
          enterActive: `${styled.open}`,
          exitActive: `${
            mode && mode !== 'account-details'
              ? styled.closeRightAway
              : styled.close
          }`,
        }}
      >
        <AccountDetails />
      </CSSTransition>
    </div>
  );
};

export default DynamicPanel;
