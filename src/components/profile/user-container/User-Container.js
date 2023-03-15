import React, { useContext, useState } from 'react';
import { useActionData } from 'react-router-dom';

import AuthContext from '../../../context/Auth-Context';
import UploadPhoto from './upload-photo/UploadPhoto';

import styled from './User-Container.module.css';
import { FaEdit } from 'react-icons/fa';

const UserContainer = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const actionData = useActionData();
  const profileCtx = useContext(AuthContext);
  console.log(actionData);

  const toggleEditSec = () => {
    setIsEditOpen((pre) => !pre);
  };

  return (
    <div className={styled['user-container']}>
      {isEditOpen && <UploadPhoto toggleEditSec={toggleEditSec} />}
      <div className={styled['img-container']}>
        <img
          src='https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'
          alt='user-name'
          className={styled.img}
        />
        <div className={styled.editPhoto} onClick={toggleEditSec}>
          <FaEdit className={styled.icon} />
        </div>
      </div>
      <h1>
        {profileCtx.currentUserName ? profileCtx.currentUserName : 'User-Name'}
      </h1>
    </div>
  );
};

export default UserContainer;
