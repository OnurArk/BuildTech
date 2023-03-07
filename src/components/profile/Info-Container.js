import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import styled from './Info-Container.module.css';

const InfoContainer = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  return (
    <div className={styled['info-container']}>
      <div className={styled['info-inner-container']}>
        <Link
          to={mode === 'change-password' ? '' : '?mode=change-password'}
          className={
            mode === 'change-password' ? styled.active : styled.notActive
          }
        >
          <h3 className={styled.titles}>Change Password</h3>
        </Link>
        <Link
          to={mode === 'change-user-name' ? '' : '?mode=change-user-name'}
          className={
            mode === 'change-user-name' ? styled.active : styled.notActive
          }
        >
          <h3 className={styled.titles}>Change User-Name</h3>
        </Link>

        <Link
          to={mode === 'account-details' ? '' : '?mode=account-details'}
          className={`${styled['account-navigation']} ${
            mode === 'account-details' ? styled.active : styled.notActive
          }`}
        >
          <h3 className={styled.titles}>Account Details</h3>
        </Link>

        <Link
          to={mode === 'payment-details' ? '' : '?mode=payment-details'}
          className={
            mode === 'payment-details' ? styled.active : styled.notActive
          }
        >
          <h3 className={styled.titles}>Payment Details</h3>
        </Link>
      </div>
    </div>
  );
};

export default InfoContainer;
