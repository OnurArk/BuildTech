import React, { useState, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';

import AppearanceCreditCard from './AppearanceCreditCard';

import styled from './CreditCard.module.css';
import { BiCaretRight } from 'react-icons/bi';
const CreditCard = ({
  background,
  nameVal,
  securityVal,
  expiryVal,
  numericVal,
  logo,
}) => {
  const [isFilipped, setIsFlipped] = useState(false);

  const flipCardHandler = () => {
    setIsFlipped((pre) => !pre);
  };

  const flipByEnterHandler = (direction) => {
    if (direction === 'backCard') {
      setIsFlipped(true);
    }
    if (direction === 'frontCard') {
      setIsFlipped(false);
    }
  };

  useEffect(() => {
    flipByEnterHandler('backCard');
  }, [securityVal]);

  useEffect(() => {
    flipByEnterHandler('frontCard');
  }, [nameVal, expiryVal, numericVal]);

  const containerStyle = {
    '--backgoundCard': background.backgoundCard
      ? background.backgoundCard
      : 'rgb(189, 189, 189)',
    '--backgoundWave': background.backgoundWave
      ? background.backgoundWave
      : 'rgb(97, 97, 97)',
    '--colorText': background.colorText
      ? background.colorText
      : 'rgba(255, 255, 255, 0.726)',
  };

  return (
    <ReactCardFlip
      isFlipped={isFilipped}
      flipDirection={'horizontal'}
      flipSpeedFrontToBack={1}
      flipSpeedBackToFront={1}
    >
      <AppearanceCreditCard
        onClick={flipCardHandler}
        style={containerStyle}
        right={'-50%'}
      >
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
        <div className={styled['cardNo-container']}>
          <p className={styled.cardText}>card number</p>
          <h1 className={styled.cardNumber}>
            {numericVal.replace(/(.{4})/g, '$1 ')}
          </h1>
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
            <h3 className={styled.expiryVal}>{expiryVal}</h3>
          </div>
        </div>
      </AppearanceCreditCard>

      <AppearanceCreditCard
        onClick={flipCardHandler}
        style={containerStyle}
        right={'-50%'}
      >
        <div
          className={styled.panel}
          style={{ '--backgoundWave': containerStyle['--backgoundWave'] }}
        />
        <div className={styled['sucurity-container']}>
          <div className={styled['signature-panel']}>{nameVal}</div>
          <div className={styled['security-code']}>{securityVal}</div>
        </div>
      </AppearanceCreditCard>
    </ReactCardFlip>
  );
};

export default CreditCard;
