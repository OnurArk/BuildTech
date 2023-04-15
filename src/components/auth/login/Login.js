import React from 'react';
import {
  Form,
  Link,
  useNavigation,
  useSearchParams,
  useActionData,
} from 'react-router-dom';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import styled from './Login.module.css';

const Login = ({ time }) => {
  const actionData = useActionData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submittin';

  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get('mode') === 'signup';

  return (
    <Form method='post' className={styled.form}>
      <div className={styled.container}>
        <h1>Log In</h1>
        <p>Login here using your email and password</p>
        <Input
          name='email'
          type='email'
          placeholder='Example: mail@mai'
          invalid={actionData?.errType?.includes('email') ? true : false}
          autoFocus
        >
          Email
        </Input>
        <Input
          name='password'
          type='password'
          placeholder='Must contain at least 6 characters'
          invalid={actionData?.errType?.includes('password') ? true : false}
          autoComplete='true'
        >
          Password
        </Input>
        <div className={styled['btn-container']}>
          <Button
            disabled={isSubmitting || isSignup}
            lineLength={20}
            glowOffset={20}
          >
            {isSubmitting ? 'Submitting...' : 'Login'}
          </Button>
          <Link to={'?mode=forgot-password'} className={styled.link}>
            Forgot your password ?
          </Link>
          {time === 0 && (
            <Link to={'?mode=signup'} className={styled.link}>
              +Sing Up
            </Link>
          )}
        </div>
        {actionData && actionData?.errMessage && (
          <p className={styled.err}>{actionData.errMessage}</p>
        )}
      </div>
    </Form>
  );
};

export default Login;
