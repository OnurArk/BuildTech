import { useLoaderData } from 'react-router-dom';

import AdressUi from '../../ui/adress/AdressUi';
import styled from './Adress.module.css';

const Adress = () => {
  const { adress } = useLoaderData();

  return (
    <div className={styled['adress-container']}>
      <AdressUi
        inCart={true}
        toCancel={'?mode=items'}
        btnName={'Back'}
        isEditOpen={false}
        adress={adress}
      />
    </div>
  );
};

export default Adress;
