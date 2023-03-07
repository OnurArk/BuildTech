import React from 'react';
import { Form } from 'react-router-dom';

import Input from '../../ui/Input';

import styled from './Change-User-Name.module.css';

const ChangeUserName = () => {
  return (
    <Form className={styled.form}>
      <h2 className={styled.title}>Change Your User Name</h2>
      <Input name='user-name' type='text' placeholder='At least 5 characters'>
        New User Name
      </Input>
    </Form>
  );
};

export default ChangeUserName;
