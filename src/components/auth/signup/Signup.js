import React from 'react';
import { Form, useActionData, useNavigation, Link } from 'react-router-dom';

import Input from '../../ui/Input';
import Button from '../../ui/Button';

import styled from './Signup.module.css';

const Signup = ({ time }) => {
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
          invalid={actionData?.errType?.includes('email') ? true : false}
          autoComplete='email'
        >
          New Email
        </Input>
        <Input
          name='password'
          type='password'
          placeholder='At least 6 characters'
          invalid={actionData?.errType?.includes('password') ? true : false}
          autoComplete='new-password'
        >
          New Password
        </Input>
        <Input
          name='confirm-password'
          type='password'
          placeholder='Confirm New Password'
          invalid={actionData?.errType?.includes('password') ? true : false}
          autoComplete='new-password'
        >
          Confirm Password
        </Input>

        <div className={styled['btn-container']}>
          <Button
            className={`${styled.btn}`}
            disabled={isSubmitting}
            dashOffset={100}
            lineColor='rgb(76, 234, 240)'
            blurColor='rgb(76, 234, 240)'
            animationSpeed={3000}
          >
            {isSubmitting ? 'Submitting...' : '+Signup'}
          </Button>
        </div>

        {time === 0 && (
          <Link to={'?mode=login'} className={styled.link}>
            Log In
          </Link>
        )}
        {actionData && actionData?.errMessage && (
          <p className={styled.err}>! {actionData.errMessage}</p>
        )}
      </div>
    </Form>
  );
};

export default Signup;
