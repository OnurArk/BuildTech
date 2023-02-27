import React from 'react';
import NavigateAuth from './NavigateAuth';

import styled from './AuthImage.module.css';

const AuthImage = (props) => {
  const imgStyle = props.isLogin ? `${styled.toRight}` : `${styled.toLeft}`;

  return (
    <div className={`${styled.img} ${imgStyle}`}>
      <NavigateAuth />
    </div>
  );
};

export default AuthImage;
