import React from 'react';

import styled from './Button.module.css';

const Button = (props) => {
  const style = {
    '--glow-dash-offset': props.dashOffset ? `${props.dashOffset}px` : '-100px',
    '--glow-line-thicness': props.lineThicness
      ? `${props.lineThicness}`
      : '2px',
    '--glow-line-lenght': props.lineLength ? `${props.lineLength}px` : '50px',
    '--glow-line-color': props.lineColor ? `${props.lineColor}` : '#fff',
    '--glow-blur-color': props.blurColor ? `${props.blurColor}` : '#fff',
    '--glow-blur-size': props.blurSize ? `${props.blurSize}px` : '6px',
    '--animation-speed': props.animationSpeed
      ? `${props.animationSpeed}ms`
      : '1500ms',
    '--glow-offset':
      props.glowOffset && props.glowOffset <= 30
        ? `${props.glowOffset}px`
        : '0px',
  };
  return (
    <button
      className={`${styled.button} ${styled['glow-effect']} ${props.className}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      style={style}
    >
      {props.children}
      <svg className={styled['glow-container']}>
        <rect
          rx={props.rX ? props.rX : 16} // gonna be in px
          pathLength={100}
          strokeLinecap='round'
          className={styled['glow-blur']}
        ></rect>
        <rect
          rx={props.rX ? props.rX : 16}
          pathLength={100}
          strokeLinecap='round'
          className={styled['glow-line']}
        ></rect>
        Sorry, your browser does not support inline SVG.
      </svg>
    </button>
  );
};

export default Button;
