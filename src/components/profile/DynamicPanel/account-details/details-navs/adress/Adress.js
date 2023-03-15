import React, { useContext } from 'react';
import { Form, useActionData, Link } from 'react-router-dom';

import AuthContext from '../../../../../../context/Auth-Context';
import Input from '../../../../../ui/Input';
import Button from '../../../../../ui/Button';

import styled from './Adress.module.css';

const Adress = () => {
  const actionData = useActionData();

  const authCtx = useContext(AuthContext);

  const getNewAdress = () => {
    authCtx.getUserData('adress');
  };

  return (
    <Form
      method='post'
      onSubmit={getNewAdress}
      className={styled['adress-container']}
    >
      <Input
        type='text'
        name='line1'
        placeholder='Address Line'
        className={styled.longAdress}
      />
      <div className={styled['short-adress-container']}>
        <Input
          type='text'
          name='country'
          placeholder='Country'
          className={styled.shortAdresses}
        />

        <span>:</span>
        <Input
          type='text'
          name='state'
          placeholder='(optional) State'
          className={styled.middleAdresses}
        />
        <span>:</span>
        <Input
          type='text'
          name='city'
          placeholder='City'
          className={styled.shortAdresses}
        />
      </div>
      <div>
        <Link to={'?mode=account-details'}>
          <Button type='button' className={styled.btn}>
            Cancel
          </Button>
        </Link>
        <Button className={styled.btn}>Save</Button>
      </div>

      {actionData?.errMessage && (
        <p className={styled.err}>{actionData?.errMessage}</p>
      )}
    </Form>
  );
};

export default Adress;
