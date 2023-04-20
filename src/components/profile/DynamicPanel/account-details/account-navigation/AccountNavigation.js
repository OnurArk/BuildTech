import React, { Suspense } from 'react';
import { Link, Await, useLoaderData } from 'react-router-dom';

import styled from './AccountNavigation.module.css';

const AccountNavigation = () => {
  const { adress, phone, payment, authInfo } = useLoaderData();

  return (
    <div className={styled['account-navigation']}>
      <Suspense fallback={<p className='centered'>Loading...</p>}>
        <Await resolve={phone}>
          {(phone) => (
            <Link to='?mode=account-details&nav=phone' className={styled.infos}>
              <span className={styled.titles}>Phone Number : </span>
              {phone
                ? `0${
                    phone.substring(0, 3) +
                    '-' +
                    phone.substring(3, 6) +
                    '-' +
                    phone.substring(6)
                  }`
                : null}
            </Link>
          )}
        </Await>
      </Suspense>
      <Suspense fallback={<p className='centered'>Loading...</p>}>
        <Await resolve={adress}>
          {(adress) => (
            <Link
              to='?mode=account-details&nav=adress'
              className={styled.infos}
            >
              <span className={styled.titles}>Adress : </span>
              {`${adress.country}/ ${adress.state ? `${adress.state}/` : ''} ${
                adress.city
              }/  ${adress.line}`}
            </Link>
          )}
        </Await>
      </Suspense>

      <Suspense fallback={<p className='centered'>Loading...</p>}>
        <Await resolve={authInfo}>
          {(authInfo) => (
            <Link to='?mode=account-details&nav=email' className={styled.infos}>
              <span className={styled.titles}>Email : </span>
              {authInfo.email}
            </Link>
          )}
        </Await>
      </Suspense>

      <Suspense fallback={<p className='centered'>Loading...</p>}>
        <Await resolve={payment}>
          {(payment) => (
            <Link
              to='?mode=account-details&nav=payment-details'
              className={styled.infos}
            >
              <span className={styled.titles}>Payment Details : </span>
              {payment?.cardNumber}
            </Link>
          )}
        </Await>
      </Suspense>
    </div>
  );
};
// Todo icon bul editable olduğunu gösteren
export default AccountNavigation;
