import React from 'react';
import { Form, useActionData } from 'react-router-dom';
import Button from '../../ui/Button';

import Input from '../../ui/Input';

import styled from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const actionData = useActionData();

  return (
    <Form method='post' className={styled.form}>
      <div className={styled.container}>
        <h1>Reset Password</h1>
        <p>Reset your password here using your email</p>
        <Input
          name='email'
          type='email'
          placeholder='Example: mail@mai'
          className={`${styled.input} ${
            actionData?.errType?.includes('email') ? `${styled.invalid}` : null
          }`}
          autoFocus
        >
          Email
        </Input>
        <Button>Change the Password</Button>
        {actionData && actionData.errMessage && (
          <p className='err'>{actionData.errMessage}</p>
        )}
      </div>
    </Form>
  );
};

export default ForgotPassword;
