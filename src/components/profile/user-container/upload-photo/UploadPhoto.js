import React from 'react';
import { Form, Link } from 'react-router-dom';

import Input from '../../../ui/Input';
import Button from '../../../ui/Button';

import styled from './UploadPhoto.module.css';

function UploadPhoto() {
  return (
    <div className={styled.container}>
      <Link to='/profile' className={styled.background} />
      <Form
        method='post'
        className={styled['upload-photo-container']}
        encType='multipart/form-data'
      >
        <Input name='url-photo' type='text' placeholder='Enter image URL' />
        <p>or</p>
        <Input name='local-photo' type='file' />
        <Button>Upload</Button>
      </Form>
    </div>
  );
}

export default UploadPhoto;
