import { Link } from 'react-router-dom';

import Button from '../../Button';

import styled from './WithoutInput.module.css';
const WithoutInput = ({ inCart, adress, toCancel, btnName, editHandler }) => {
  if (!adress || Object.keys(adress).length === 0) {
    return <h3>Press Edit Button to Add Adress</h3>;
  }
  return (
    <div
      className={`${styled['adress-container']} ${
        inCart ? styled['cart-adress-container'] : null
      }`}
    >
      <p
        className={`${styled.longAdress} ${
          inCart ? styled.cartLongAdress : null
        }`}
      >
        {adress.line}
      </p>
      <div className={styled['short-adress-container']}>
        <p
          className={`${styled.shortAdresses} ${
            inCart ? styled.cartShortAdresses : null
          }`}
        >
          {adress.country}
        </p>
        <span>/</span>
        {adress.state && (
          <>
            <p
              className={`${styled.middleAdresses} ${
                inCart ? styled.cartMiddleAdresses : null
              }`}
            >
              {adress.state}
            </p>
            <span>/</span>
          </>
        )}
        <p
          className={`${styled.shortAdresses} ${
            inCart ? styled.cartShortAdresses : null
          }`}
        >
          {adress.city}
        </p>
      </div>
      <div className={styled.buttons}>
        <Link to={toCancel}>
          <Button type='button' className={styled.btn}>
            {btnName ? btnName : 'Cancel'}
          </Button>
        </Link>

        <Button type={'button'} className={styled.btn} onClick={editHandler}>
          Edit
        </Button>
      </div>
    </div>
  );
};

export default WithoutInput;
