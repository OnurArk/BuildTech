import React from 'react';

import styled from './Payment.module.css';
import PaymentDetails from '../../ui/payment-details/PaymentDetails';

const Payment = () => {
  return (
    <div className={styled['payment-container']}>
      <PaymentDetails />
    </div>
  );
};

export default Payment;
