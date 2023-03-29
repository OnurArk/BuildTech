import React from 'react';
import { Link } from 'react-router-dom';

import styled from './AccountNavigation.module.css';

const AccountNavigation = ({ adress, email, payment, phoneNumber }) => {
  return (
    <div className={styled['account-navigation']}>
      <Link to='?mode=account-details&nav=phone' className={styled.infos}>
        <span className={styled.titles}>Phone Number : </span>
        {phoneNumber
          ? `${
              phoneNumber.substring(0, 4) +
              '-' +
              phoneNumber.substring(4, 7) +
              '-' +
              phoneNumber.substring(7)
            }`
          : null}
      </Link>
      <Link to='?mode=account-details&nav=adress' className={styled.infos}>
        <span className={styled.titles}>Adress : </span>
        {adress}
      </Link>
      <Link to='?mode=account-details&nav=email' className={styled.infos}>
        <span className={styled.titles}>Email : </span>
        {email}
      </Link>
      <Link
        to='?mode=account-details&nav=payment-details'
        className={styled.infos}
      >
        <span className={styled.titles}>Payment Details : </span>
        {payment?.cardNumber}
      </Link>
    </div>
  );
};
// Todo icon bul editable olduğunu gösteren
export default AccountNavigation;
