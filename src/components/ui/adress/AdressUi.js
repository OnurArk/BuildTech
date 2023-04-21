import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import WithInput from './withInput/WithInput';
import WithoutInput from './withoutInput/WithoutInput';

import styled from './AdressUi.module.css';

const AdressUi = ({ inCart, toCancel, btnName, isEditOpen, adress }) => {
  const [isEditing, setIsEditing] = useState(isEditOpen || null);

  const editHandler = () => {
    setIsEditing(true);
  };

  return (
    <>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={isEditing}
        key={'WithInput'}
        timeout={{ enter: 500 }}
        classNames={{
          enterActive: `${styled.open}`,
          exitActive: `${styled.close}`,
        }}
      >
        <WithInput inCart={inCart} toCancel={toCancel} btnName={btnName} />
      </CSSTransition>

      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={!isEditing}
        key={'WithoutInput'}
        timeout={{ enter: 500 }}
        classNames={{
          enterActive: `${styled.open}`,
          exitActive: `${styled.close}`,
        }}
      >
        <WithoutInput
          adress={adress}
          toCancel={toCancel}
          btnName={btnName}
          editHandler={editHandler}
        />
      </CSSTransition>
    </>
  );
};

export default AdressUi;
