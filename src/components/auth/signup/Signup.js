import React from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";

import Input from "../../ui/Input";
import Button from "../../ui/Button";

import styled from "./Signup.module.css";

const Signup = () => {
  const actionData = useActionData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submittin";

  return (
    <Form method="post" className={styled.form} noValidate>
      <h1>Sign Up</h1>
      <p>Signup here using your email and password</p>
      <Input
        name="email"
        type="email"
        placeholder="Example: mail@mail"
        className={`${styled.input} ${
          actionData?.errType === "email" ? `${styled.invalid}` : null
        }`}
        autoComplete="email"
      >
        New Email
      </Input>
      <Input
        name="password"
        type="password"
        placeholder="At least 6 characters"
        className={`${styled.input} ${
          actionData?.errType === "password" ? `${styled.invalid}` : null
        }`}
        autoComplete="new-password"
      >
        New Password
      </Input>
      <Input
        name="confirm-password"
        type="password"
        placeholder="Confirm New Password"
        className={`${styled.input} ${
          actionData?.errType === "password" ? `${styled.invalid}` : null
        }`}
        autoComplete="new-password"
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
      {actionData && actionData?.errMessage && (
        <p className="err">{actionData.errMessage}</p>
      )}
    </Form>
  );
};

export default Signup;
