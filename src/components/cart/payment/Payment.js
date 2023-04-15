import { useContext } from 'react';

import AuthContext from '../../../context/Auth-Context';

import styled from './Payment.module.css';
import PaymentDetails from '../../ui/payment-details/PaymentDetails';

const Payment = () => {
  const styleCtx = useContext(AuthContext);
  return (
    <div className={styled['payment-container']} style={styleCtx.background}>
      <PaymentDetails />
    </div>
  );
};

export default Payment;
