import React from "react";
import { Form, useNavigation } from "react-router-dom";

import Input from "../../ui/Input";
import Button from "../../ui/Button";

import styled from "./Signup.module.css";

const Signup = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submittin";

  return (
    <Form method="post" action="/authentication" className={styled.form}>
      <h1>Log In</h1>
      <p>Signup here using your email and password</p>
      <Input
        name="email"
        type="email"
        placeholder="Example: mail@mai"
        className={styled.input}
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
        <Button
          className={`${styled.btnSignup}  ${styled.btn}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "+Signup"}
        </Button>
      </div>
    </Form>
  );
};

export default Signup;
