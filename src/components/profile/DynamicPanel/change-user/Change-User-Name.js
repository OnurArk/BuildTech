import React from 'react';
import { Form, Link, useActionData, useNavigate } from 'react-router-dom';

import AuthContext from '../../../../context/Auth-Context';
import Input from '../../../ui/Input';
import Button from '../../../ui/Button';

import styled from './Change-User-Name.module.css';
import { useContext } from 'react';

const ChangeUserName = () => {
  const actionData = useActionData();
  const profileCtx = useContext(AuthContext);

  const navigate = useNavigate();

  if (actionData?.name) {
    profileCtx.setCurrentUserName(actionData.name);
    navigate('/profile');
  }

  return (
    <Form method='post' className={styled.form}>
      <h2 className={styled.title}>Change Your User Name</h2>
      <Input
        name='user-name'
        type='text'
        placeholder='At least 5 characters'
        maxLength={20}
      >
        New User Name
      </Input>
      <div>
        <Link to={'/profile'}>
          <Button type='button' className={styled.btn}>
            Cancel
          </Button>
        </Link>
        <Button className={styled.btn}>Save</Button>
      </div>

      {actionData?.errMessage && (
        <p className={styled.err}>{actionData?.errMessage}</p>
      )}
    </Form>
  );
};

export default ChangeUserName;
