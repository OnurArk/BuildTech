import React from "react";

import styled from "./Input.module.css";
const Input = (props) => {
  return (
    <div className={`${styled["input-container"]}`}>
      <label htmlFor={props.htmlFor}>{props.children}</label>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
        disabled={props.disabled}
        autoFocus={props.autoFocus}
        className={`${styled.input} ${props.className}`}
      ></input>
    </div>
  );
};

export default Input;
