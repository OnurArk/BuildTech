import React from 'react';
import { Form, useActionData, useNavigation } from 'react-router-dom';

import Input from '../../ui/Input';
import Button from '../../ui/Button';

import styled from './Signup.module.css';

const Signup = () => {
  const actionData = useActionData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submittin';

  return (
    <Form method='post' className={styled.form} noValidate>
      <div className={styled.container}>
        <h1>Sign Up</h1>
        <p>Signup here using your email and password</p>
        <Input
          name='email'
          type='email'
          placeholder='Example: mail@mail'
          className={`${styled.input} ${
            actionData?.errType.includes('email') ? `${styled.invalid}` : null
          }`}
          autoComplete='email'
        >
          New Email
        </Input>
        <Input
          name='password'
          type='password'
          placeholder='At least 6 characters'
          className={`${styled.input} ${
            actionData?.errType.includes('password')
              ? `${styled.invalid}`
              : null
          }`}
          autoComplete='new-password'
        >
          New Password
        </Input>
        <Input
          name='confirm-password'
          type='password'
          placeholder='Confirm New Password'
          className={`${styled.input} ${
            actionData?.errType.includes('password')
              ? `${styled.invalid}`
              : null
          }`}
          autoComplete='new-password'
        >
          Confirm Password
        </Input>
        <div className={styled['btn-container']}>
          <Button
            className={`${styled.btn}`}
            disabled={isSubmitting}
            lineColor='rgb(76, 234, 240)'
            blurColor='rgb(76, 234, 240)'
            blurSize={3}
            animationSpeed={3000}
          >
            {isSubmitting ? 'Submitting...' : '+Signup'}
          </Button>
        </div>
        {actionData && actionData?.errMessage && (
          <p className='err'>{actionData.errMessage}</p>
        )}
      </div>
    </Form>
  );
};

export default Signup;
