import React from "react";

import styled from "./AuthImage.module.css";

const AuthImage = (props) => {
  return (
    <div className={`${styled.img} ${props.className}`}>{props.children}</div>
  );
};

export default AuthImage;
