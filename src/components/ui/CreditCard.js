import React from 'react';

import styled from './CreditCard.module.css';
import { BiCaretRight } from 'react-icons/bi';
const CreditCard = ({
  backgound,
  nameVal,
  securityVal,
  expiryVal,
  numericVal,
  logo,
}) => {
  const containerStyle = {
    '--backgoundCard': backgound.backgoundCard
      ? backgound.backgoundCard
      : 'rgb(189, 189, 189)',
    '--backgoundWave': backgound.backgoundWave
      ? backgound.backgoundWave
      : 'rgb(97, 97, 97)',
    '--colorText': backgound.colorText
      ? backgound.colorText
      : 'rgba(255, 255, 255, 0.726)',
  };

  return (
    <div className={styled['credit-card-container']} style={containerStyle}>
      <img
        src='https://cdn-icons-png.flaticon.com/512/6404/6404078.png'
        alt='chip'
        className={styled.chip}
      />

      <img
        src={logo}
        alt='logo'
        style={{ display: logo ? 'block' : 'none' }}
        className={styled.logo}
      />
      <div className={styled.cardNumber}>
        <p className={styled.cardText}>card number</p>
        <h1>{numericVal.replace(/(.{4})/g, '$1 ')}</h1>
      </div>
      <div className={styled.nameSection}>
        <p className={styled.cardText}>cardholder name</p>
        <h3 className={styled.name}>{nameVal}</h3>
      </div>

      <div className={styled.expiration}>
        <p className={styled.cardText}>expiration</p>
        <div className={styled.date}>
          <div>
            <p className={styled.dateText}>VALİD</p>
            <p className={styled.dateText}>THRU</p>
          </div>
          <BiCaretRight />
          <h3>{expiryVal}</h3>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
