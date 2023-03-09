import React, { useState } from 'react';

import Input from '../../../ui/Input';
import Button from '../../../ui/Button';

import styled from './Adress.module.css';

const Adress = () => {
  const [address, setAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',

    country: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  return (
    <div className={styled['adress-container']}>
      <Input
        type='text'
        name='line1'
        onChange={handleChange}
        value={address.line1}
        placeholder='Address Line'
        className={styled.longAdress}
      />
      <div className={styled['short-adress-container']}>
        <Input
          type='text'
          name='city'
          onChange={handleChange}
          value={address.city}
          placeholder='City'
          className={styled.shortAdresses}
        />
        <span>:</span>
        <Input
          type='text'
          name='state'
          onChange={handleChange}
          value={address.state}
          placeholder='State'
          className={styled.shortAdresses}
        />
        <span>:</span>
        <Input
          type='text'
          name='country'
          onChange={handleChange}
          value={address.country}
          placeholder='Country'
          className={styled.shortAdresses}
        />
      </div>
      <Button>Save</Button>
    </div>
  );
};

export default Adress;
