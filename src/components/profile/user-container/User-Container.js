import React, { Suspense } from 'react';
import { Link, useLoaderData, useSearchParams, Await } from 'react-router-dom';

import UploadPhoto from './upload-photo/UploadPhoto';

import styled from './User-Container.module.css';
import { FaEdit } from 'react-icons/fa';

const noPhoto =
  'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg';

const UserContainer = () => {
  const { authInfo, photoProp } = useLoaderData();

  const [searchParams] = useSearchParams();
  const isEditOpen = searchParams.get('mode') === 'uploadImg';

  const whenLoaded = (authInfo, photoProp) => {
    const photoStyle = {
      '--urlPhoto': authInfo?.userPhoto
        ? `url(${authInfo?.userPhoto})`
        : `url(${noPhoto})`,
      '--position': photoProp?.position ? photoProp.position : 'center',
      '--size': photoProp?.size ? photoProp.size : 'cover',
    };
    return photoStyle;
  };

  return (
    <div className={styled['user-container']}>
      {isEditOpen && <UploadPhoto />}
      <Suspense fallback={<p className='centered'>Loading...</p>}>
        <Await resolve={{ authInfo, photoProp }}>
          {(loadedData) => {
            const { authInfo, photoProp } = loadedData;
            const photoStyle = whenLoaded(authInfo, photoProp);
            return (
              <>
                <div className={styled['img-container']} style={photoStyle}>
                  <Link to={'?mode=uploadImg'} className={styled.editPhoto}>
                    <FaEdit className={styled.icon} />
                  </Link>
                </div>
                <h1>{authInfo.userName ? authInfo.userName : 'User-Name'}</h1>
              </>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default UserContainer;
