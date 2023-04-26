import { useSearchParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import WithInput from './withInput/WithInput';
import WithoutInput from './withoutInput/WithoutInput';

import styled from './AdressUi.module.css';

const AdressUi = ({ inCart, toCancel, btnName, isEditOpen, adress }) => {
  const [searchParams] = useSearchParams();

  const isEditing = searchParams.get('nav') === 'editing';

  return (
    <>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={isEditing || isEditOpen}
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
        in={inCart && !isEditing}
        key={'WithoutInput'}
        timeout={{ enter: 500 }}
        classNames={{
          enterActive: `${styled.open}`,
          exitActive: `${styled.close}`,
        }}
      >
        <WithoutInput adress={adress} toCancel={toCancel} btnName={btnName} />
      </CSSTransition>
    </>
  );
};

export default AdressUi;
