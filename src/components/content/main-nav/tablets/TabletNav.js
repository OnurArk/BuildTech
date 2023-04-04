import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';

import { itemActions } from '../../../../store/item-slice';

import styled from './TabletNav.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RxDoubleArrowDown } from 'react-icons/rx';

const TabletNav = ({ id, type, icon, Icon2 }) => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  const toggleActive = () => {
    setIsActive((pre) => !pre);
    onFiltedCategory();
  };

  const onFiltedCategory = () => {
    isActive
      ? dispatch(itemActions.removeFilter({ type }))
      : dispatch(itemActions.itemFilter({ type, id }));
  };

  return (
    <Fragment>
      <div
        className={`${styled['tablet-container']} ${
          isActive ? styled.active : null
        }`}
        onClick={toggleActive}
      >
        {icon && <FontAwesomeIcon className={styled.icon} icon={icon} />}
        {Icon2 && <Icon2 className={styled.icon} size='2rem' />}

        <p className={styled.typeName}>{type}</p>
        {isActive && <RxDoubleArrowDown className={styled.closeIcon} />}
      </div>
    </Fragment>
  );
};

export default TabletNav;
