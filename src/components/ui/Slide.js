import React, { useCallback, useEffect, useState } from "react";

import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { FaCircle } from "react-icons/fa";
import styled from "./Slide.module.css";

const Slide = ({ slideData, className, isArrowsActive }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Slide forward or bacward funtions
  const previousImage = () => {
    currentIndex === 0
      ? setCurrentIndex(slideData.length - 1)
      : setCurrentIndex((pre) => pre - 1);
  };

  const forwardImage = useCallback(() => {
    currentIndex === slideData.length - 1
      ? setCurrentIndex(0)
      : setCurrentIndex((pre) => pre + 1);
  }, [currentIndex, slideData]);

  // Chance Slide every 5 sec
  useEffect(() => {
    const interval = setTimeout(() => {
      forwardImage();
    }, 5000);

    return () => clearTimeout(interval);
  }, [forwardImage]);

  // carousels dots nav
  const carouselDots = slideData?.map((slide, slideindex) => {
    const active = slideindex === currentIndex ? styled.active : null;
    return (
      <FaCircle
        className={`${styled.circles} ${styled.icons} ${active}`}
        key={slideindex}
        onClick={() => setCurrentIndex(slideindex)}
      />
    );
  });

  const slideStyles = {
    backgroundImage: `url(${slideData[currentIndex]?.url}) `,
  };

  return (
    <div className={`${styled["slide-section"]} ${className}`}>
      <div className={styled["slide-container"]}>
        {isArrowsActive && (
          <BiLeftArrow className={styled.icons} onClick={previousImage} />
        )}
        <a
          target="_blank"
          rel="noreferrer"
          href={`${slideData[currentIndex]?.linkTo}`}
        >
          <div className={styled.slide} style={slideStyles} />
        </a>
        {isArrowsActive && (
          <BiRightArrow className={styled.icons} onClick={forwardImage} />
        )}
      </div>
      <div className={styled["circles-container"]}>{carouselDots}</div>
    </div>
  );
};

export default Slide;
