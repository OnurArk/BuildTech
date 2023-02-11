import React, { useState } from "react";

import styled from "./ItemDetailSlide.module.css";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

const ItemDetailSlide = ({ item }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const forwardSlide = () => {
    if (slideIndex === item.images.length - 1) {
      setSlideIndex(0);
      return;
    }
    setSlideIndex((preIndex) => preIndex + 1);
  };

  const backwardSlide = () => {
    if (slideIndex === 0) {
      setSlideIndex(item.images.length - 1);
      return;
    }
    setSlideIndex((preIndex) => preIndex - 1);
  };

  const itemImages = item?.images.map((item, itemIndex) => {
    return (
      <div
        className={styled.smallImage}
        style={{ backgroundImage: `url(${item}) ` }}
        onMouseOver={() => setSlideIndex(itemIndex)}
        key={itemIndex}
      />
    );
  });

  const slideStyles = {
    backgroundImage: `url(${item?.images[slideIndex]}) `,
  };
  return (
    <>
      <div className={styled.slideContainer}>
        <BiLeftArrow className={styled.icon} onClick={backwardSlide} />
        <div className={styled.slideImg} style={slideStyles} />
        <BiRightArrow className={styled.icon} onClick={forwardSlide} />
      </div>
      <div className={styled["smallImg-container"]}>{itemImages}</div>
    </>
  );
};

export default ItemDetailSlide;
