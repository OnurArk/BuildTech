import React, { useState, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// import { faker } from '@faker-js/faker';

import AuthContext from '../../../context/Auth-Context';
import PhoneNumb from './details-navs/PhoneNumb';
import Adress from './details-navs/Adress';
import EmailChange from './details-navs/EmailChange';

import styled from './AccountDetails.module.css';
import { CSSTransition } from 'react-transition-group';
// import { AiFillEdit } from 'react-icons/ai';

const fakeAdd =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. tae impedit qvoluptatem. Esse quo inventore vero, nemo nisi obcaecati, ab nulla excepturi expedita qui architecto magnam?';

const AccountDetails = () => {
  const authCtx = useContext(AuthContext);

  const phoneNumber = authCtx.currentPhone;
  const [adress] = useState(fakeAdd);
  console.log(phoneNumber);
  const [searchParams] = useSearchParams();
  const nav = searchParams.get('nav');

  return (
    <div className={styled['account-details']}>
      <h2 className={styled.title}>Account Details</h2>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        key={'account-informations'}
        in={!nav}
        timeout={{ enter: 500, exit: 0 }}
        classNames={{
          enterActive: `${styled.open}`,
          exitActive: `${styled.close}`,
        }}
      >
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
              : '(Optional) Add your phone number for connection'}
          </Link>

          <Link to='?mode=account-details&nav=adress' className={styled.infos}>
            <span className={styled.titles}>Adress : </span>
            {adress
              ? `${adress}`
              : 'Enter your address so that the cargo can arrive'}
          </Link>

          <Link to='?mode=account-details&nav=email' className={styled.infos}>
            <span className={styled.titles}>Email : </span>
            {authCtx.currentEmail}
          </Link>
        </div>
      </CSSTransition>

      <CSSTransition
        mountOnEnter
        unmountOnExit
        key={'phone'}
        in={nav === 'phone'}
        timeout={{ enter: 500, exit: 0 }}
        classNames={{
          enterActive: `${styled.open}`,
          exitActive: `${styled.close}`,
        }}
      >
        <PhoneNumb phoneNumber={phoneNumber} />
      </CSSTransition>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        key={'adress'}
        in={nav === 'adress'}
        timeout={{ enter: 500, exit: 0 }}
        classNames={{
          enterActive: `${styled.open}`,
          exitActive: `${styled.close}`,
        }}
      >
        <Adress />
      </CSSTransition>

      <CSSTransition
        mountOnEnter
        unmountOnExit
        key={'email'}
        in={nav === 'email'}
        timeout={{ enter: 500, exit: 0 }}
        classNames={{
          enterActive: `${styled.open}`,
          exitActive: `${styled.close}`,
        }}
      >
        <EmailChange />
      </CSSTransition>
    </div>
  );
};

export default AccountDetails;
