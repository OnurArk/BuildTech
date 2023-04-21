import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

import AuthContext from '../../../context/Auth-Context';

import styled from './Payment.module.css';
import PaymentDetails from '../../ui/payment-details/PaymentDetails';

const Payment = () => {
  const styleCtx = useContext(AuthContext);
  const { payment } = useLoaderData();

  return (
    <div className={styled['payment-container']} style={styleCtx.background}>
      <PaymentDetails
        toCancel={'?mode=adress'}
        btnName={'Back'}
        isButtonsShowed={false}
        paymentInfo={payment}
      />
    </div>
  );
};

export default Payment;
