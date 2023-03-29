import React from 'react';

import styled from './AppearanceCreditCard.module.css';

const AppearanceCreditCard = (props) => {
  const { style } = props;
  const styleCard = {
    ...style,
    '--right': props.right,
  };
  return (
    <div
      onClick={props.onClick}
      className={`${styled['credit-card-container']} ${props.className}`}
      style={styleCard}
    >
      {props.children}
    </div>
  );
};

export default AppearanceCreditCard;
