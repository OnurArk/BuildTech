import React from "react";

import styled from "./Card.module.css";

const Card = (props) => {
  return (
    <div
      className={`${props.className} ${styled.card}`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default Card;
