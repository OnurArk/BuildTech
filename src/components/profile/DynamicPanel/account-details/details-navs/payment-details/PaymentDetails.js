import React, { useContext } from 'react';
import { Form, useActionData, Link } from 'react-router-dom';

import AuthContext from '../../../../../../context/Auth-Context';
import CardInputChange from './card-input-change/CardInputChange';
import ColorCompany from './color-company/ColorCompany';
import CreditCard from '../../../../../ui/CreditCard';
import Input from '../../../../../ui/Input';
import Button from '../../../../../ui/Button';

import styled from './PaymentDetails.module.css';

const PaymentDetails = () => {
  const actionData = useActionData();
  const propfileCtx = useContext(AuthContext);

  // When Updated Fetch the data right away

  const updatePaymentHandler = () => {
    propfileCtx.getUserData('payment');
  };

  // Styling Credit Card

  const { logo, backgound, companyFilter } = ColorCompany(propfileCtx);

  // Card inputs Handling

  const {
    onlyNumber,
    formatCardNumber,
    handleExpiryChange,
    handleSecurityCodeChange,
    nameHandlerChange,
    numericVal,
    expiryVal,
    securityVal,
    nameVal,
  } = CardInputChange(companyFilter);

  return (
    <Form
      method='post'
      onSubmit={updatePaymentHandler}
      className={styled['patment-detail-container']}
    >
      <CreditCard
        numericVal={numericVal}
        expiryVal={expiryVal}
        securityVal={securityVal}
        nameVal={nameVal}
        backgound={backgound}
        logo={logo}
      />
      <Input
        name='card-name'
        className={styled.bigInput}
        value={nameVal || ''}
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