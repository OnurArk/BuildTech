import { Form, Link, useActionData } from 'react-router-dom';

import Input from '../../Input';
import Button from '../../Button';

import styled from './WithInput.module.css';

const WithInput = ({ inCart, toCancel, btnName }) => {
  const actionData = useActionData();

  return (
    <Form
      method='post'
      className={`${styled['adress-container']} ${
        inCart ? styled['cart-adress-container'] : null
      }`}
    >
      <Input
        type='text'
        name='line1'
        placeholder='Address Line'
        invalid={actionData?.errType?.includes('line1') ? true : undefined}
        className={`${styled.longAdress} ${
          inCart ? styled.cartLongAdress : null
        }`}
      />

      <div className={styled['short-adress-container']}>
        <Input
          type='text'
          name='country'
          placeholder='Country'
          invalid={actionData?.errType?.includes('country') ? true : undefined}
          className={`${styled.shortAdresses} ${
            inCart ? styled.cartShortAdresses : null
          }`}
        />

        <span className={styled.colon}>:</span>
        <Input
          type='text'
          name='state'
          placeholder='(optional) State'
          className={`${styled.middleAdresses} ${
            inCart ? styled.cartMiddleAdresses : null
          }`}
        />

        <span className={styled.colon}>:</span>
        <Input
          type='text'
          name='city'
          placeholder='City'
          invalid={actionData?.errType?.includes('city') ? true : undefined}
          className={`${styled.shortAdresses} ${
            inCart ? styled.cartShortAdresses : null
          }`}
        />
      </div>
      <div className={styled.buttons}>
        <Link to={toCancel}>
          <Button type='button' className={styled.btn}>
            {btnName ? btnName : 'Cancel'}
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

export default WithInput;
