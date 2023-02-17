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
        placeholder="Example: mail@mai"
        className={styled.input}
        autoComplete="email"
      >
        New Email
      </Input>
      <Input
        name="password"
        type="password"
        placeholder="Must contain at least 6 characters"
        className={styled.input}
        autoComplete="new-password"
      >
        New Password
      </Input>
      <Input
        name="confirm-password"
        type="password"
        placeholder="Must contain at least 6 characters"
        className={styled.input}
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
      {actionData && actionData?.message && (
        <p className="err">{actionData.message}</p>
      )}
    </Form>
  );
};

export default Signup;
