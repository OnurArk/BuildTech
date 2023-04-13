import { Form, useActionData, Link } from 'react-router-dom';

import Input from '../../../../../ui/Input';
import Button from '../../../../../ui/Button';

import styled from './Adress.module.css';

const Adress = () => {
  const actionData = useActionData();

  return (
    <Form method='post' className={styled['adress-container']}>
      <Input
        type='text'
        name='line1'
        placeholder='Address Line'
        invalid={actionData?.errType?.includes('line1') ? true : false}
        className={styled.longAdress}
      />
      <div className={styled['short-adress-container']}>
        <Input
          type='text'
          name='country'
          placeholder='Country'
          invalid={actionData?.errType?.includes('country') ? true : false}
          className={styled.shortAdresses}
        />

        <span className={styled.colon}>:</span>
        <Input
          type='text'
          name='state'
          placeholder='(optional) State'
          className={styled.middleAdresses}
        />
        <span className={styled.colon}>:</span>
        <Input
          type='text'
          name='city'
          placeholder='City'
          invalid={actionData?.errType?.includes('city') ? true : false}
          className={styled.shortAdresses}
        />
      </div>
      <div className={styled.buttons}>
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
