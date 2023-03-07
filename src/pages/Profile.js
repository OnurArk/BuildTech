import React from 'react';

import UserContainer from '../components/profile/User-Container';
import InfoContainer from '../components/profile/Info-Container';
import DynamicPanel from '../components/profile/Dynamic-Panel';

import styled from '../styles/Profile.module.css';

const Profile = () => {
  return (
    <div className={styled['profile-container']}>
      <div className={styled['profile-size-control']}>
        <UserContainer />
        <InfoContainer />
        <DynamicPanel />
      </div>
    </div>
  );
};

export default Profile;
