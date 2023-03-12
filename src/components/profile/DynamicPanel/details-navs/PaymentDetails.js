import React, { useState } from 'react';
import { Form, useActionData, Link } from 'react-router-dom';

import CreditCard from '../../../ui/CreditCard';
import Input from '../../../ui/Input';
import Button from '../../../ui/Button';

import styled from './PaymentDetails.module.css';

const PaymentDetails = () => {
  const [numericVal, setNumericVal] = useState('');
  const [expiryVal, setExpiryVal] = useState('');
  const [securityVal, setSecurityVal] = useState('');
  const [nameVal, setNameVal] = useState('');

  const actionData = useActionData();

  //Card Number Section

  const onlyNumber = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, ''); // remove all non-digit characters
    value = value.slice(0, 16); // limit to 16 characters
    setNumericVal(value);
  };

  const formatCardNumber = (cardNumber) => {
    const formattedNumber = cardNumber.replace(/(.{4})/g, '$1 ');
    return formattedNumber.trim();
  };

  // Expiration (mm/yy) section

  const formatExpiry = (expiry) => {
    let formattedExpiry = expiry.replace(/\D/g, ''); // remove all non-digit characters
    if (formattedExpiry.length > 2) {
      formattedExpiry = `${formattedExpiry.slice(0, 2)}/${formattedExpiry.slice(
        2
      )}`;
    }
    return formattedExpiry;
  };

  const handleExpiryChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, ''); // remove all non-digit characters
    value = value.slice(0, 4); // limit to 4 characters
    let month = value.slice(0, 2);
    let year = value.slice(2, 4); // get the next two characters (year)
    if (month === '00') {
      value = '0';
    } else if (month > 12) {
      value = '12'; // limit the month to 12
    } else if (month.length === 2 && year.length === 2) {
      value = `${month}/${year}`; // add the slash between month and year
    }
    value = formatExpiry(value);
    setExpiryVal(value);
  };

  // Security Code Section

  const handleSecurityCodeChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, '');
    setSecurityVal(value);
  };

  // Name Section

  const nameHandlerChange = (event) => {
    const value = event.target.value;
    const name = value.split(' ');

    const capitalizedWords = name.map(
      (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    );
    const formattedValue = capitalizedWords.join(' ');
    setNameVal(formattedValue);
  };

  return (
    <Form className={styled['patment-detail-container']}>
      <CreditCard
        numericVal={numericVal}
        expiryVal={expiryVal}
        securityVal={securityVal}
        nameVal={nameVal}
      />
      <Input
        className={styled.bigInput}
        placeholder='FIRSTNAME LASTNAME'
        maxLength={30}
        onChange={nameHandlerChange}
      >
        Name
      </Input>
      <Input
        name='card-number'
        className={styled.bigInput}
        placeholder='XXXX XXXX XXXX XXXX'
        inputMode='numeric'
        maxLength={19}
        value={formatCardNumber(numericVal || '')}
        onInput={onlyNumber}
        required
      >
        Card Number
      </Input>

      <div className={styled.inputs}>
        <Input
          name='expiration'
          className={styled.smallInput}
          type='text'
          placeholder='MM/YY'
          maxLength={5}
          value={expiryVal || ''}
          onChange={handleExpiryChange}
          required
        >
          Expiration (mm/yy)
        </Input>
        <Input
          name='security-code'
          className={styled.smallInput}
          value={securityVal || ''}
          onChange={handleSecurityCodeChange}
          maxLength={4}
        >
          Security Code
        </Input>
      </div>

      <div>
        <Link to={'?mode=account-details'}>
          <Button type='button' className={styled.btn}>
            Cancel
          </Button>
        </Link>
        <Button className={styled.btn}>Save</Button>
      </div>

      {actionData?.errMessage && (
        <p className={styled.err}>{actionData.errMessage}</p>
      )}
    </Form>
  );
};

export default PaymentDetails;
