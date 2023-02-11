import Item from "./Item/Item";
import { useSelector } from "react-redux";
import styled from "./Products.module.css";
const Products = () => {
  const items = useSelector((state) => state.items.preferedItems);

  const itemData = items.map((item) => (
    <Item
      img={item.img}
      name={item.name}
      price={item.price.toLocaleString()}
      type={item.type}
      key={item.id}
      id={item.id}
    />
  ));

  return <div className={styled.container}>{itemData}</div>;
};

export default Products;
