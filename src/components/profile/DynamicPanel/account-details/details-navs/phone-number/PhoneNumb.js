import React from 'react';
import { Form, Link, useActionData } from 'react-router-dom';

import Input from '../../../../../ui/Input';
import Button from '../../../../../ui/Button';

import styled from './PhoneNumb.module.css';

const PhoneNumb = ({ phoneNumber }) => {
  const actionData = useActionData();

  return (
    <Form method='post' className={styled['phone-container']}>
      <Input
        name='phone'
        type='tel'
        inputGridRow={2}
        maxLength={10}
        minLenght={10}
        placeholder={
          phoneNumber ? `Current No: ${phoneNumber}` : `Example: 5001234567`
        }
        invalid={actionData?.errMessage ? true : false}
        className={styled.input}
      >
        New Phone Number :
      </Input>

      <div className={styled.buttons}>
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
