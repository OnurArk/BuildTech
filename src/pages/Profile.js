import React from 'react';

import styled from '../styles/Profile.module.css';

const Profile = () => {
  return (
    <div className={styled['profile-container']}>
      <div className={styled['user-container']}>
        <img
          src='https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'
          alt='user-name'
          className={styled.img}
        />
        <h1>user-name</h1>
      </div>
      <div className={styled['info-container']}>
        <h3 className={styled.titles}>Change Password</h3>
        <h3 className={styled.titles}>Change User-Name</h3>
        <h3 className={styled.titles}>Account Details</h3>
        <h3 className={styled.titles}>Payment Details</h3>
      </div>
      <div className={styled.div3}></div>
    </div>
  );
};

export default Profile;
