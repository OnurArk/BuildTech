import React from 'react';
import { Form } from 'react-router-dom';

import Input from '../../ui/Input';
import styled from './ChangePassword.module.css';

const ChangePassword = () => {
  return (
    <Form className={styled.form}>
      <h2 className={styled.title}>Change Your Password</h2>
      <Input
        name='password'
        type='password'
        placeholder='Enter current password'
      >
        Current Password
      </Input>
      <Input
        name='password'
        type='password'
        placeholder='At least 6 characters'
      >
        New Password
      </Input>
      <Input name='password' type='password' placeholder='Confirm new password'>
        Confirm New Password
      </Input>
    </Form>
  );
};

export default ChangePassword;
