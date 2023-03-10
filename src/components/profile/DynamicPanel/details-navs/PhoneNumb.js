import React, { useContext } from 'react';
import { Form, Link, useActionData } from 'react-router-dom';

import AuthContext from '../../../../context/Auth-Context';
import Input from '../../../ui/Input';
import Button from '../../../ui/Button';

import styled from './PhoneNumb.module.css';

const PhoneNumb = ({ phoneNumber }) => {
  const actionData = useActionData();

  const authCtx = useContext(AuthContext);

  const getNewNumber = () => {
    authCtx.getPhone();
  };

  return (
    <Form
      method='post'
      onSubmit={getNewNumber}
      className={styled['phone-container']}
    >
      <Input
        name='phone'
        type='tel'
        inputGridRow={1}
        maxLength={11}
        minLenght={11}
        placeholder={
          phoneNumber ? `Current No: ${phoneNumber}` : `Example: 05001234567`
        }
        className={actionData?.errMessage ? `${styled.invalid}` : null}
      >
        New Phone Number :
      </Input>

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

export default PhoneNumb;
