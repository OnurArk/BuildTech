import React, { useRef, useState } from "react";
import { Form, useNavigation } from "react-router-dom";

import useValidation from "../../../hooks/use-validation";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

import styled from "./Signup.module.css";

const Signup = () => {
  const [error, setError] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const { signupRequest, isTouched } = useValidation(setError, {
    email: emailRef,
    password: passwordRef,
    confirmPassword: confirmPasswordRef,
  });

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submittin";
  // TO DO make this logic in action and use useActionData for error feedback

  return (
    <Form method="post" className={styled.form}>
      <h1>Sign Up</h1>
      <p>Signup here using your email and password</p>
      <Input
        name="email"
        type="email"
        placeholder="Example: mail@mai"
        className={styled.input}
        autoComplete="email"
        ref={emailRef}
      >
        New Email
      </Input>
      <Input
        name="password"
        type="password"
        placeholder="Must contain at least 6 characters"
        className={styled.input}
        autoComplete="new-password"
        ref={passwordRef}
      >
        New Password
      </Input>
      <Input
        name="confirm-password"
        type="password"
        placeholder="Must contain at least 6 characters"
        className={styled.input}
        autoComplete="new-password"
        ref={confirmPasswordRef}
      >
        Confirm Password
      </Input>
      <div className={styled["btn-container"]}>
        <Button
          className={`${styled.btnSignup}  ${styled.btn}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "+Signup"}
        </Button>
      </div>
      {isTouched && error && <p className="err">{error}</p>}
    </Form>
  );
};

export default Signup;
