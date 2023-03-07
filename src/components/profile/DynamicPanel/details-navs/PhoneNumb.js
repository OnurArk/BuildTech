import React, { useState } from 'react';

// import { faker } from '@faker-js/faker';
import Input from '../../../ui/Input';
import Button from '../../../ui/Button';

import styled from './PhoneNumb.module.css';

const PhoneNumb = ({ phoneNumber, setPhoneNumber }) => {
  const [err, setError] = useState();

  function handleChange(event) {
    setError();
    const inputValue = event.target.value.replace(/[^0-9]/g, '');
    setPhoneNumber(inputValue);
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (phoneNumber.length < 11 && phoneNumber.length !== 1) {
      setError('Your phone number at least should have 11 digits!');
    }
    if (phoneNumber.length === 11 || phoneNumber.length === 1) {
      if (phoneNumber.length === 1) {
      }
    }

    if (!err) {
      console.log(phoneNumber);
    }
  };

  return (
    <form onSubmit={submitHandler} className={styled['phone-container']}>
      <Input
        type='tel'
        inputGridRow={1}
        maxLength={10}
        minLenght={10}
        onChange={handleChange}
        placeholder={
          phoneNumber ? `Current No: ${phoneNumber}` : `Example: 5001234567`
        }
        className={err ? `${styled.invalid}` : null}
      >
        Phone Number :
      </Input>
      {err && <p className={styled.err}>{err}</p>}
      <Button>Save</Button>
    </form>
  );
};

export default PhoneNumb;
