import React from 'react';
import { Link, useLoaderData, useSearchParams } from 'react-router-dom';

import UploadPhoto from './upload-photo/UploadPhoto';

import styled from './User-Container.module.css';
import { FaEdit } from 'react-icons/fa';

const noPhoto =
  'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg';

const UserContainer = () => {
  const loaderData = useLoaderData();

  const [searchParams] = useSearchParams();
  const isEditOpen = searchParams.get('mode') === 'uploadImg';

  const photoStyle = {
    '--urlPhoto': loaderData?.userPhoto
      ? `url(${loaderData?.userPhoto})`
      : `url(${noPhoto})`,
    '--position': loaderData.photoProp?.position
      ? loaderData.photoProp.position
      : 'center',
    '--size': loaderData.photoProp?.size ? loaderData.photoProp.size : 'cover',
  };

  return (
    <div className={styled['user-container']}>
      {isEditOpen && <UploadPhoto />}
      <div className={styled['img-container']} style={photoStyle}>
        <Link to={'?mode=uploadImg'} className={styled.editPhoto}>
          <FaEdit className={styled.icon} />
        </Link>
      </div>
      <h1>{loaderData.userName ? loaderData.userName : 'User-Name'}</h1>
    </div>
  );
};

export default UserContainer;
