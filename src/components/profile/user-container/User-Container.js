import React, { useContext } from 'react';
import { Link, useActionData, useSearchParams } from 'react-router-dom';

import AuthContext from '../../../context/Auth-Context';
import UploadPhoto from './upload-photo/UploadPhoto';

import styled from './User-Container.module.css';
import { FaEdit } from 'react-icons/fa';

const UserContainer = () => {
  const [searchParams] = useSearchParams();
  const isEditOpen = searchParams.get('mode') === 'uploadImg';

  const actionData = useActionData();
  const profileCtx = useContext(AuthContext);

  return (
    <div className={styled['user-container']}>
      {isEditOpen && <UploadPhoto />}
      <div className={styled['img-container']}>
        <img
          src='https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'
          alt='user-name'
          className={styled.img}
        />
        <Link to={'?mode=uploadImg'} className={styled.editPhoto}>
          <FaEdit className={styled.icon} />
        </Link>
      </div>
      <h1>
        {profileCtx.currentUserName ? profileCtx.currentUserName : 'User-Name'}
      </h1>
    </div>
  );
};

export default UserContainer;
