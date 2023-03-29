import { Form, Link, useActionData } from 'react-router-dom';

import Input from '../../../ui/Input';
import Button from '../../../ui/Button';

import styled from './Change-User-Name.module.css';

const ChangeUserName = () => {
  const actionData = useActionData();

  return (
    <Form method='post' className={styled.form}>
      <h2 className={styled.title}>Change Your User Name</h2>
      <Input
        name='user-name'
        type='text'
        className={actionData?.errMessage ? styled.invalid : null}
        placeholder='At least 5 characters'
        maxLength={20}
      >
        New User Name
      </Input>
      <div>
        <Link to={'/profile'}>
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

export default ChangeUserName;
