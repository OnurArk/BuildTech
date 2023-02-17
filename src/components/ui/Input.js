import React, { forwardRef } from "react";

import styled from "./Input.module.css";
const Input = forwardRef((props, ref) => {
  return (
    <div className={`${styled["input-container"]}`}>
      <label htmlFor={props.htmlFor} className={styled.label}>
        {props.children}
      </label>
      <input
        className={`${styled.input} ${props.className}`}
        ref={ref}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
        disabled={props.disabled}
        autoFocus={props.autoFocus}
        autoComplete={props.autoComplete}
        value={props.value}
        required={props.required}
      />
    </div>
  );
});

export default Input;
