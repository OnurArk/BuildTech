import React, { useState } from 'react';
import { Form, Link, useActionData } from 'react-router-dom';

import Input from '../../../ui/Input';
import Button from '../../../ui/Button';

import styled from './UploadPhoto.module.css';
import { HiSelector } from 'react-icons/hi';

const noPhoto =
  'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg';

const dummyPositions = ['center', 'top', 'bottom'];
const dummySize = ['cover', 'contain'];

function UploadPhoto() {
  const [preViewPhoto, setPreViewPhoto] = useState();
  const [position, setPosition] = useState();
  const [size, setSize] = useState();

  const actionData = useActionData();

  const positionHandler = (event) => {
    setPosition(event.target.value);
  };
  const sizeHandler = (event) => {
    setSize(event.target.value);
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       setPreViewPhoto(reader.result);
  //     };
  //   }
  // };

  const positionOptions = dummyPositions.map((position) => (
    <option value={position || ''} key={position}>
      {position}
    </option>
  ));

  const sizeOptions = dummySize.map((size) => (
    <option value={size || ''} key={size}>
      {size}
    </option>
  ));

  const editStyle = {
    '--urlPhoto': preViewPhoto ? `url(${preViewPhoto})` : `url(${noPhoto})`,
    '--position': position ? position : 'center',
    '--size': size ? size : 'cover',
  };
  return (
    <div className={styled.container}>
      <Link to='/profile' className={styled.background} />
      <Form
        method='post'
        className={styled['upload-photo-container']}
        encType='multipart/form-data'
      >
        <div className={styled.preView} style={editStyle} />
        <Input
          name='url-photo'
          type='text'
          className={
            actionData?.errType?.includes('url-photo')
              ? `${styled.invalid}`
              : null
          }
          placeholder='Enter image URL'
          onChange={(event) => {
            setPreViewPhoto(event.target.value);
          }}
        />
        {/* <Input
          name='file'
          type='file'
          accept='image/*'
          className={styled.fileInput}
          onChange={handleFileChange}
        /> */}
        <div className={styled.selectContainer}>
          <span>Position : </span>
          <select
            name='position'
            onChange={positionHandler}
            className={styled.typeSelect}
          >
            {positionOptions}
          </select>
          <span className={styled['custom-arrow']}>
            <HiSelector className={styled.icon} />
          </span>
        </div>
        <div className={styled.selectContainer}>
          <span>Size : </span>
          <select
            name='size'
            onChange={sizeHandler}
            className={styled.typeSelect}
          >
            {sizeOptions}
          </select>
          <span className={styled['custom-arrow']}>
            <HiSelector className={styled.icon} />
          </span>
        </div>

        <Button>Upload</Button>
        <Link to='/profile'>
          <Button>Cancel</Button>
        </Link>

        {actionData?.errMessage && (
          <p className={styled.err}>{actionData.errMessage.trim()}</p>
        )}
      </Form>
    </div>
  );
}

export default UploadPhoto;
