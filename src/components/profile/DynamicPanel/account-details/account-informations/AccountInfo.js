import React from 'react';
import { Link } from 'react-router-dom';

import styled from './AccountInfo.module.css';

const AccountInfo = ({ adress, email, payment, phoneNumber }) => {
  return (
    <div className={styled['account-informations']}>
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

export default AccountInfo;
