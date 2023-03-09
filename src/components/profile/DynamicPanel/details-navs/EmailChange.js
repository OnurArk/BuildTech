import React from 'react';
import { useActionData, Form, Link } from 'react-router-dom';

import Input from '../../../ui/Input';
import Button from '../../../ui/Button';

import styled from './Email.module.css';

const EmailChange = () => {
  const actionData = useActionData();

  return (
    <Form method='post' className={styled['email-container']}>
      <Input
        name='email'
        type='email'
        inputGridRow={1}
        placeholder={'Example: test@test.com'}
        className={actionData?.errMessage ? `${styled.invalid}` : null}
        autoFocus
      >
        New Email :
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
        <p className={styled.err}>{actionData?.errMessage}</p>
      )}
    </Form>
  );
};

export default EmailChange;
