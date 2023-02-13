import React from "react";
import { Form, Link, useNavigation, useSearchParams } from "react-router-dom";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import styled from "./Login.module.css";

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submittin";

  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get("mode") === "signup";

  return (
    <Form method="post" action="/authentication" className={styled.form}>
      <h1>Log In</h1>
      <p>Login here using your email and password</p>
      <Input
        name="email"
        type="email"
        placeholder="Example: mail@mai"
        className={styled.input}
        autoFocus
      >
        Email:
      </Input>
      <Input
        name="password"
        type="password"
        placeholder="Must contain at least 6 characters"
        className={styled.input}
      >
        Password:
      </Input>
      <div className={styled["btn-container"]}>
        <Link
          to={`?mode=${isSignup ? "login" : "signup"}`}
          className={`${styled.btnSignup}  ${styled.btn}`}
        >
          +Signup
        </Link>
        <Button
          className={`${styled.btnLogin} ${styled.btn}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Login"}
        </Button>
      </div>
    </Form>
  );
};

export default Login;
