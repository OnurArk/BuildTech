import { useState } from 'react';
import { Form, useActionData, Link } from 'react-router-dom';

import Input from '../Input';
import Button from '../Button';

import styled from './AdressUi.module.css';

let Tag = Input;

const AdressUi = ({ inCart, toCancel, btnName, isButtonsShowed, adress }) => {
  const [isBtnAppered, setIsBtnAppered] = useState(isButtonsShowed || null);
  console.log(adress);

  const actionData = useActionData();

  const shoeButtons = () => {
    setIsBtnAppered(true);
  };

  if (!isBtnAppered && adress && adress.length) {
    Tag = 'p';
  }

  return (
    <Form
      method='post'
      className={`${styled['adress-container']} ${
        inCart ? styled['cart-adress-container'] : null
      }`}
    >
      <Tag
        type='text'
        name='line1'
        placeholder='Address Line'
        invalid={actionData?.errType?.includes('line1') ? true : undefined}
        className={`${styled.longAdress} ${
          inCart ? styled.cartLongAdress : null
        }`}
      >
        {!isBtnAppered && adress && adress.length ? adress.line : ''}
      </Tag>
      <div className={styled['short-adress-container']}>
        <Tag
          type='text'
          name='country'
          placeholder='Country'
          invalid={actionData?.errType?.includes('country') ? true : undefined}
          className={`${styled.shortAdresses} ${
            inCart ? styled.cartShortAdresses : null
          }`}
        >
          {!isBtnAppered && adress && adress.length ? adress.country : ''}
        </Tag>

        <span className={styled.colon}>:</span>
        <Tag
          type='text'
          name='state'
          placeholder='(optional) State'
          className={`${styled.middleAdresses} ${
            inCart ? styled.cartMiddleAdresses : null
          }`}
        >
          {!isBtnAppered && adress && adress.length ? adress.state : ''}
        </Tag>
        <span className={styled.colon}>:</span>
        <Tag
          type='text'
          name='city'
          placeholder='City'
          invalid={actionData?.errType?.includes('city') ? true : undefined}
          className={`${styled.shortAdresses} ${
            inCart ? styled.cartShortAdresses : null
          }`}
        >
          {!isBtnAppered && adress && adress.length ? adress.city : ''}
        </Tag>
      </div>
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
        <p className={styled.err}>{actionData?.errMessage}</p>
      )}
    </Form>
  );
};

export default AdressUi;
