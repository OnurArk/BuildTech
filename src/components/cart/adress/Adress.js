import React from 'react';

import AdressUi from '../../ui/adress/AdressUi';
import styled from './Adress.module.css';

const dummyAdress = {
  line: 'Bu adress tamamen hayal ürünüdür Bu adress tamamen hayal ürünüdür',
  country: 'Amerika',
  city: 'NewYork',
  state: 'Texas',
};

const Adress = () => {
  return (
    <div className={styled['adress-container']}>
      <AdressUi
        inCart={true}
        toCancel={'?mode=items'}
        btnName={'Back'}
        isEditOpen={false}
        adress={dummyAdress}
      />
    </div>
  );
};

export default Adress;
