import { Suspense } from 'react';
import { useLoaderData, Await, useSearchParams } from 'react-router-dom';

// import { faker } from '@faker-js/faker';

import AccountNavigation from './account-navigation/AccountNavigation';
import PhoneNumb from './details-navs/phone-number/PhoneNumb';
import Adress from './details-navs/adress/Adress';
import EmailChange from './details-navs/email-change/EmailChange';
import PaymentDetails from '../../../ui/payment-details/PaymentDetails';

import styled from './AccountDetails.module.css';
import { CSSTransition } from 'react-transition-group';

// import { AiFillEdit } from 'react-icons/ai';

const AccountDetails = () => {
  const { phone } = useLoaderData();

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
        <AccountNavigation />
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
        <Suspense fallback={<p className='centered'>Loading...</p>}>
          <Await resolve={phone}>
            {(phone) => <PhoneNumb phoneNumber={phone} />}
          </Await>
        </Suspense>
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
