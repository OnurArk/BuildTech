import React from 'react';
import { Form, useActionData, Link, useNavigation } from 'react-router-dom';

import Button from '../../../ui/Button';
import styled from './ChangePassword.module.css';

const ChangePassword = () => {
  const actionData = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';
  // TO DO loading ekle
  return (
    <Form method='put' className={styled.form}>
      <h2 className={styled.title}>Change Your Password</h2>
      <h4>Are you sure to reset you password?</h4>

      <div className={styled.buttons}>
        <Link to={'/profile'}>
          <Button type='button' className={styled.btn} disabled={isSubmitting}>
            Cancel
          </Button>
        </Link>
        <Button className={styled.btn} disabled={isSubmitting}>
          {isSubmitting ? '..Sending' : 'Reset Password'}
        </Button>
      </div>

      {actionData?.errMessage && (
        <p className={styled.err}>{actionData?.errMessage}</p>
      )}
    </Form>
  );
};

export default ChangePassword;
