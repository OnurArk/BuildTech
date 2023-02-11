import React, { Fragment } from "react";
import { useDispatch } from "react-redux";

import { itemActions } from "../../../store/item-slice";

import styled from "./TabletNav.module.css";
import { RxDoubleArrowDown } from "react-icons/rx";

const TabletNav = (props) => {
  const dispatch = useDispatch();

  const onFiltedCategory = () => {
    props.isActive
      ? dispatch(itemActions.removeFilter({ type: props.type }))
      : dispatch(itemActions.itemFilter({ type: props.type, id: props.id }));

    props.onActive(props.id);
  };

  return (
    <Fragment>
      <div
        className={`${styled["tablet-container"]} ${props.className}`}
        onClick={onFiltedCategory}
      >
        <props.icon className={styled.icon} size="2rem" />
        <p className={styled.typeName}>{props.type}</p>
        {props.isActive && <RxDoubleArrowDown className={styled.closeIcon} />}
      </div>
    </Fragment>
  );
};

export default TabletNav;
