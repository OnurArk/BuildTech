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
      <h1>Log In</h1>
      <p>Login here using your email and password</p>
      <Input
        name='email'
        type='email'
        placeholder='Example: mail@mai'
        className={styled.input}
        isValid='true'
        autoFocus
      >
        Email
      </Input>
      <Input
        name='password'
        type='password'
        placeholder='Must contain at least 6 characters'
        className={styled.input}
        autoComplete='true'
        isValid='true'
      >
        Password
      </Input>
      <div className={styled['btn-container']}>
        <Button
          className={`${styled.btnLogin} ${styled.btn}`}
          disabled={isSubmitting || isSignup}
        >
          {isSubmitting ? 'Submitting...' : 'Login'}
        </Button>
        <div>
          Need an account ?
          <Link
            to={`?mode=${isSignup ? 'login' : 'signup'}`}
            className={`${styled.btnSignup}  ${styled.btn}`}
          >
            +Signup
          </Link>
        </div>
        <Link
          to={`?mode=${isForgatPassword ? 'login' : 'forgot-password'}`}
          className={`${styled.btnSignup}  ${styled.btn}`}
        >
          Forgot your password ?
        </Link>
      </div>
      {actionData && actionData?.errMessage && (
        <p className='err'>{actionData.errMessage}</p>
      )}
    </Form>
  );
};

export default Login;
