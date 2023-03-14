import React from 'react';

import styled from './User-Container.module.css';

const UserContainer = () => {
  return (
    <div className={styled['user-container']}>
      <img
        src='https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'
        alt='user-name'
        className={styled.img}
      />
      <h1>user-name</h1>
    </div>
  );
};

export default UserContainer;
