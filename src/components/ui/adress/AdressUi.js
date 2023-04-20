import { useState } from 'react';

import WithInput from './withInput/WithInput';
import WithoutInput from './withoutInput/WithoutInput';

const AdressUi = ({ inCart, toCancel, btnName, isEditOpen, adress }) => {
  const [isEditing, setIsEditing] = useState(isEditOpen || null);

  const editHandler = () => {
    setIsEditing(true);
  };

  return (
    <>
      {isEditing && (
        <WithInput inCart={inCart} toCancel={toCancel} btnName={btnName} />
      )}
      {!isEditing && (
        <WithoutInput
          inCart={inCart}
          adress={adress}
          toCancel={toCancel}
          btnName={btnName}
          editHandler={editHandler}
        />
      )}
    </>
  );
};

export default AdressUi;
