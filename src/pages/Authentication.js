import React from "react";
import { redirect, useSearchParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

import AuthImage from "../components/auth/backgroundAuth/AuthImage";
import Login from "../components/auth/login/Login";
import Signup from "../components/auth/signup/Signup";

import styled from "../styles/Authentication.module.css";

const animationTiming = { enter: 500, exit: 500 };

const Authentication = () => {
  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get("mode") === "signup";

  return (
    <AuthImage className={styled["auth-container"]}>
      <Login />
      <CSSTransition
        mountOnEnter
        unmountOnExit // domdan silmek için
        in={isSignup}
        timeout={animationTiming}
        classNames={{
          enter: "",
          enterActive: `${styled.openSignup}`,
          enterDone: "",
          exit: "",
          exitActive: `${styled.closeSignup}`,
          exitDone: "",
          appear: "",
          appearActive: "",
          appearDone: "",
        }}
      >
        <Signup />
      </CSSTransition>
    </AuthImage>
  );
};
export default Authentication;

export async function action({ request }) {
  const errors = {};
  const succeeded = true;
  const searchParams = new URL(request.url).searchParams;

  const mode = searchParams.get("mode") || "login";

  const data = await request.formData();

  const email = data.get("email");
  const password = data.get("password");
  const confirmPassword = data.get("confirm-password");

  /*Error Handling For Signup */

  if (mode === "signup") {
    if (confirmPassword && password !== confirmPassword) {
      errors.message = "Passwords did not match!";
      errors.type = "password";
    }

    if (
      typeof email !== "string" ||
      !email.includes("@") ||
      !email.includes(".com")
    ) {
      errors.message = "Email address must contain @ and .com";
      errors.type = "email";
    }

    if (typeof password !== "string" || password.length < 6) {
      errors.message = "Password must be > 6 characters";
      errors.type = "password";
    }

    if (Object.keys(errors).length) {
      return errors;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      err.message = err.message.replace("Firebase: ", "");
      err.message = err.message.replace(/ *\([^)]*\) */g, "");
      errors.message = err.message;
      return errors;
    }

    return succeeded;
  }

  return redirect("/");
}
