import React, { useState } from 'react';
import { Form } from 'react-router-dom';

import Input from '../../../ui/Input';
import Button from '../../../ui/Button';

import styled from './UploadPhoto.module.css';

function UploadPhoto(props) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return (
    <Form
      className={styled['upload-photo-container']}
      onClick={props.toggleEditSec}
    >
      <Input type='file' onChange={handleFileChange} />
      <Button type='submit'>Upload</Button>
    </Form>
  );
}

export default UploadPhoto;
