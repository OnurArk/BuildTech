import React, { forwardRef } from 'react';

import styled from './Input.module.css';
const Input = forwardRef((props, ref) => {
  const style = {
    '--grid-row': props.inputGridRow ? `${props.inputGridRow}` : '2',
  };

  return (
    <div className={`${styled['input-container']}`} style={style}>
      <label htmlFor={props.name} className={styled.label}>
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
        maxLength={props.maxLength}
        minLength={props.minLength}
        pattern={props.pattern}
        inputMode={props.inputMode}
        onInput={props.onInput}
      />
    </div>
  );
});

export default Input;
