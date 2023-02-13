import React from "react";
import { redirect, useSearchParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

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
        unmountOnExit
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
  console.log(request);
  const searchParams = new URL(request.url).searchParams;
  console.log(searchParams);
  const mode = searchParams.get("mode") || "login";

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const url = mode
    ? null
    : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]";

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authData),
  });

  if (!response.ok) {
    console.log("error");
  }

  localStorage.setItem("isLogin", true);

  return redirect("/");
}
