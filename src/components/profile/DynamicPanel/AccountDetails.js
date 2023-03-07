import React, { useState } from 'react';

import { faker } from '@faker-js/faker';
import PhoneNumb from './details-navs/PhoneNumb';
import Adress from './details-navs/Adress';
// import Input from '../../ui/Input';
// import Button from '../../ui/Button';

import styled from './AccountDetails.module.css';
import { AiFillEdit } from 'react-icons/ai';

const fakeAdd =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. tae impedit qvoluptatem. Esse quo inventore vero, nemo nisi obcaecati, ab nulla excepturi expedita qui architecto magnam?';

const AccountDetails = () => {
  const [editableNav, setEditableNav] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('05303859865');
  const [adress, setAdress] = useState(fakeAdd);

  const email = faker.internet.email();
  console.log(editableNav);
  function handleClick(name) {
    setEditableNav(name);
  }

  return (
    <div className={styled['account-details']}>
      <h2 className={styled.title}>Account Details</h2>
      {!editableNav && (
        <div className={styled['account-informations']}>
          <p onClick={() => handleClick('phone')} className={styled.infos}>
            <span className={styled.titles}>Phone Number : </span>
            {phoneNumber
              ? `${
                  phoneNumber.substring(0, 4) +
                  '-' +
                  phoneNumber.substring(4, 7) +
                  '-' +
                  phoneNumber.substring(7)
                }`
              : '(optional) Add your phone number for connection'}
          </p>
          <p onClick={() => handleClick('adress')} className={styled.infos}>
            <span className={styled.titles}>Adress : </span>
            {adress
              ? `${adress}`
              : 'Enter your address so that the cargo can arrive'}
          </p>
          <p onClick={() => handleClick('email')} className={styled.infos}>
            <span className={styled.titles}>Email : </span>
            {email}
          </p>
        </div>
      )}

      {editableNav === 'phone' && (
        <PhoneNumb phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
      )}
      {editableNav === 'adress' && <Adress />}
    </div>
  );
};

export default AccountDetails;
