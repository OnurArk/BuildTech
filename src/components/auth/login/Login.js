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

const Login = () => {
  const actionData = useActionData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submittin';

  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get('mode') === 'signup';
  const isForgatPassword = searchParams.get('mode') === 'forgot-password';

  return (
    <Form method='post' action='/authentication' className={styled.form}>
      <div className={styled.container}>
        <h1>Log In</h1>
        <p>Login here using your email and password</p>
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
        <Input
          name='password'
          type='password'
          placeholder='Must contain at least 6 characters'
          className={`${styled.input} ${
            actionData?.errType?.includes('password')
              ? `${styled.invalid}`
              : null
          }`}
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
          <Link
            to={`?mode=${isForgatPassword ? 'login' : 'forgot-password'}`}
            className={`${styled.btnResetPassword}  ${styled.btn}`}
          >
            Forgot your password ?
          </Link>
        </div>
        {actionData && actionData?.errMessage && (
          <p className='err'>{actionData.errMessage}</p>
        )}
      </div>
    </Form>
  );
};

export default Login;
