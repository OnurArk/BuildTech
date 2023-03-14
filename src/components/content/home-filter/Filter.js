import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { itemActions } from '../../../store/item-slice';
import Button from '../../ui/Button';

import styled from './Filter.module.css';
const Filter = () => {
  const [rangeVal, setRangeVal] = useState(0);
  const [isTouched, setIsTouched] = useState(false);

  const dispatch = useDispatch();

  const onSliding = (event) => {
    setRangeVal(+event.target.value);
    setIsTouched(true);
  };

  const sliderThumbStyle = {
    left: `${(rangeVal / 100000) * 94}%`,
  };

  const progressStyle = {
    width: `${(rangeVal / 100000) * 98}%`,
  };

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(itemActions.priceFilter(rangeVal));
  };

  return (
    <form className={styled['filter-container']} onSubmit={onSubmit}>
      <div className={styled['range-slider']}>
        <input
          type='range'
          min='0'
          max='100000'
          step='500'
          value={rangeVal}
          onChange={onSliding}
          className={styled.slider}
        />
        <div className={styled['slider-thumb']} style={sliderThumbStyle} />

        <div className={styled.progress} style={progressStyle} />
      </div>
      {isTouched && rangeVal > 0 && (
        <div className={styled.tooltip}>{rangeVal} TL</div>
      )}
      <Button type='subbit' className={styled.btn}>
        <span>Filt</span>
      </Button>
    </form>
  );
};

export default Filter;
