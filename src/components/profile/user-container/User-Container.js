import React, { useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import AuthContext from '../../../context/Auth-Context';
import UploadPhoto from './upload-photo/UploadPhoto';

import styled from './User-Container.module.css';
import { FaEdit } from 'react-icons/fa';

const noPhoto =
  'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg';

const UserContainer = () => {
  const [searchParams] = useSearchParams();
  const isEditOpen = searchParams.get('mode') === 'uploadImg';

  const profileCtx = useContext(AuthContext);

  const photoStyle = {
    '--urlPhoto': profileCtx?.currentUserPhoto
      ? `url(${profileCtx?.currentUserPhoto})`
      : `url(${noPhoto})`,
    '--position': profileCtx.currentPhotoProp?.position
      ? profileCtx.currentPhotoProp.position
      : 'center',
    '--size': profileCtx.currentPhotoProp?.size
      ? profileCtx.currentPhotoProp.size
      : 'cover',
  };

  return (
    <div className={styled['user-container']}>
      {isEditOpen && <UploadPhoto />}
      {!profileCtx.isLoading && (
        <div className={styled['img-container']} style={photoStyle}>
          <Link to={'?mode=uploadImg'} className={styled.editPhoto}>
            <FaEdit className={styled.icon} />
          </Link>
        </div>
      )}
      {!profileCtx.isLoading && (
        <h1>
          {profileCtx.currentUserName
            ? profileCtx.currentUserName
            : 'User-Name'}
        </h1>
      )}
    </div>
  );
};

export default UserContainer;
