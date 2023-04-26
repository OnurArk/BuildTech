import { Link } from 'react-router-dom';

import Button from '../../Button';

import styled from './WithoutInput.module.css';
const WithoutInput = ({ adress, toCancel, btnName }) => {
  const result = Object.values(adress).every(
    (val) => val === undefined || val === null
  );

  if (result || Object.keys(adress)?.length === 0) {
    return (
      <>
        <h3>Press Edit Button to Add Adress</h3>
        <div className={styled.buttons}>
          <Link to={toCancel}>
            <Button type='button' className={styled.btn}>
              {btnName ? btnName : 'Cancel'}
            </Button>
          </Link>

          <Link to={'?mode=adress&nav=editing'}>
            <Button type={'button'} className={styled.btn}>
              Edit
            </Button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className={styled['adress-container']}>
      <p>{adress.line}</p>
      <div className={styled['short-adress-container']}>
        <p>{adress.country}</p>
        <span>/</span>
        {adress.state && (
          <>
            <p>{adress.state}</p>
            <span>/</span>
          </>
        )}
        <p>{adress.city}</p>
      </div>
      <div className={styled.buttons}>
        <Link to={toCancel}>
          <Button type='button' className={styled.btn}>
            {btnName || 'Cancel'}
          </Button>
        </Link>

        <Link to={'?mode=adress&nav=editing'}>
          <Button type={'button'} className={styled.btn}>
            Edit
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default WithoutInput;
