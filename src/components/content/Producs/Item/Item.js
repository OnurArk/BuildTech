import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../../ui/Card";

import styled from "./Item.module.css";
import { BsFillHeartFill } from "react-icons/bs";

const Item = ({ items, img, price, name, id }) => {
  const navigate = useNavigate();

  const onOpenDetail = () => {
    navigate(`/home/${id}`);
  };

  const onFav = () => {};

  return (
    <Card className={styled.card}>
      <BsFillHeartFill className={styled.icon} onClick={onFav} />
      <div className={styled["item-container"]} onClick={onOpenDetail}>
        <div className={styled["image-container"]}>
          <img className={styled.img} src={img} alt={name} />
        </div>
        <p max={10}>{name}</p>
        <p className={`${styled.price}`}>{price} TL</p>
      </div>
    </Card>
  );
};

export default Item;
