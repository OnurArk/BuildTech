import React from 'react';

import styled from './AuthImage.module.css';

const AuthImage = (props) => {
  const imgStyle = props.isLogin ? `${styled.toLeft}` : `${styled.toRight}`;

  return <div className={`${styled.img} ${imgStyle}`}></div>;
};

export default AuthImage;
