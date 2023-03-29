import { Suspense } from 'react';
import { useLoaderData, Await, useSearchParams } from 'react-router-dom';

// import { faker } from '@faker-js/faker';

import AccountNavigation from './account-navigation/AccountNavigation';
import PhoneNumb from './details-navs/phone-number/PhoneNumb';
import Adress from './details-navs/adress/Adress';
import EmailChange from './details-navs/email-change/EmailChange';
import PaymentDetails from './details-navs/payment-details/PaymentDetails';

import ErrorPage from '../../../../pages/ErrorPage';
import styled from './AccountDetails.module.css';
import { CSSTransition } from 'react-transition-group';

// import { AiFillEdit } from 'react-icons/ai';

const AccountDetails = () => {
  const loaderData = useLoaderData();

  const [searchParams] = useSearchParams();
  const nav = searchParams.get('nav');

  return (
    <div className={styled['account-details']}>
      <h2 className={styled.title}>Account Details</h2>
      <Suspense fallback='Loading...'>
        <Await resolve={loaderData} errorElement={ErrorPage}>
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
            <AccountNavigation
              adress={loaderData?.adress}
              email={loaderData?.email}
              payment={loaderData?.payment}
              phoneNumber={loaderData?.phone}
            />
          </CSSTransition>
        </Await>
      </Suspense>
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
        <PhoneNumb phoneNumber={loaderData?.currentPhone} />
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

      <CSSTransition
        mountOnEnter
        unmountOnExit
        key={'payment-details'}
        in={nav === 'payment-details'}
        timeout={{ enter: 500, exit: 0 }}
        classNames={{
          enterActive: `${styled.open}`,
          exitActive: `${styled.close}`,
        }}
      >
        <PaymentDetails />
      </CSSTransition>
    </div>
  );
};

export default AccountDetails;
