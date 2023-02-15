import React, { forwardRef } from "react";

import styled from "./Input.module.css";
const Input = forwardRef((props, ref) => {
  return (
    <div className={`${styled["input-container"]}`}>
      <label htmlFor={props.htmlFor}>{props.children}</label>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        ref={ref}
        onBlur={props.onBlur}
        disabled={props.disabled}
        autoFocus={props.autoFocus}
        className={`${styled.input} ${props.className}`}
        autoComplete={props.autoComplete}
        value={props.value}
      ></input>
    </div>
  );
});

export default Input;
