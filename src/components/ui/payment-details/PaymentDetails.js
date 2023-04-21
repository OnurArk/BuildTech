import React, { useContext, useState } from 'react';
import { Form, useActionData, Link } from 'react-router-dom';

import AuthContext from '../../../context/Auth-Context';
import CardInputChange from './card-input-change/CardInputChange';
import ColorCompany from './color-company/ColorCompany';
import CreditCard from '../CreditCard';
import Input from '../Input';
import Button from '../Button';

import styled from './PaymentDetails.module.css';

const PaymentDetails = ({
  toCancel,
  btnName,
  isButtonsShowed,
  paymentInfo,
}) => {
  const [isBtnAppered, setIsBtnAppered] = useState(isButtonsShowed || null);

  const shoeButtons = () => {
    setIsBtnAppered(true);
  };

  const actionData = useActionData();
  const profileCtx = useContext(AuthContext);

  // Styling Credit Card

  const { logo, background, companyFilter } = ColorCompany(profileCtx);

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
    <Form method='post' className={styled['payment-detail-container']}>
      <CreditCard
        numericVal={numericVal}
        expiryVal={expiryVal}
        securityVal={securityVal}
        nameVal={nameVal}
        background={background}
        logo={logo}
        paymentInfo={paymentInfo}
      />

      {isBtnAppered && (
        <div className={styled.bigInputs}>
          <Input
            name='card-name'
            invalid={actionData?.errType.includes('card-name') ? true : false}
            className={styled.bigInput}
            width={'100%'}
            value={nameVal || ''}
            placeholder='FIRSTNAME LASTNAME'
            maxLength={30}
            minLength={2}
            onChange={nameHandlerChange}
          >
            Name
          </Input>

          <Input
            name='card-number'
            invalid={actionData?.errType.includes('card-number') ? true : false}
            className={styled.bigInput}
            width={'100%'}
            placeholder='XXXX XXXX XXXX XXXX'
            inputMode='numeric'
            maxLength={19}
            minLength={19}
            value={formatCardNumber(numericVal || '')}
            onInput={onlyNumber}
            required
          >
            Card Number
          </Input>
        </div>
      )}

      {isBtnAppered && (
        <div className={styled.smallInputs}>
          <Input
            name='expiration'
            invalid={actionData?.errType.includes('expiration') ? true : false}
            className={styled.smallInput}
            type='text'
            placeholder='MM/YY'
            maxLength={5}
            minLength={5}
            value={expiryVal || ''}
            onChange={handleExpiryChange}
            required
          >
            Expiration (mm/yy)
          </Input>
          <Input
            name='security-code'
            invalid={
              actionData?.errType.includes('security-code') ? true : false
            }
            className={styled.smallInput}
            value={securityVal || ''}
            onChange={handleSecurityCodeChange}
            maxLength={4}
            minLength={3}
          >
            Security Code
          </Input>
        </div>
      )}

      <div className={styled.buttons}>
        <Link to={toCancel}>
          <Button type='button' className={styled.btn}>
            {btnName ? btnName : 'Cancel'}
          </Button>
        </Link>
        {!isBtnAppered && (
          <Button type={'button'} className={styled.btn} onClick={shoeButtons}>
            Edit
          </Button>
        )}
        {isBtnAppered && <Button className={styled.btn}>Save</Button>}
      </div>

      {actionData?.errMessage && (
        <p className={styled.err}>{actionData.errMessage}</p>
      )}
    </Form>
  );
};

export default PaymentDetails;
