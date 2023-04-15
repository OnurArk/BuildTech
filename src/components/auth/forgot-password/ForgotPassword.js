import React from 'react';
import { Form, useActionData, Link } from 'react-router-dom';
import Button from '../../ui/Button';

import Input from '../../ui/Input';

import styled from './ForgotPassword.module.css';

const ForgotPassword = ({ time }) => {
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
          invalid={actionData?.errType?.includes('email') ? true : false}
          className={styled.input}
          autoFocus
        >
          Email
        </Input>
        <Button>Change the Password</Button>
        {time === 0 && (
          <Link to={'?mode=login'} className={styled.link}>
            Log In
          </Link>
        )}
        {actionData && actionData.errMessage && (
          <p className={styled.err}>{actionData.errMessage}</p>
        )}
      </div>
    </Form>
  );
};

export default ForgotPassword;
