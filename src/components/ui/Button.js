import React from "react";

import styled from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={`${styled.button} ${props.className}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
