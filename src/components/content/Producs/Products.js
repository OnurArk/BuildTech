import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Item from './Item/Item';

import Pagination from 'rc-pagination';
import styled from './Products.module.css';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';

const Products = () => {
  const items = useSelector((state) => state.items.preferedItems);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  if (!items) {
    return <div>Loading...</div>;
  }

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const itemData = currentItems.map((item) => (
    <Item
      img={item.img}
      name={item.name}
      price={item.price.toLocaleString()}
      type={item.type}
      key={item.id}
      id={item.id}
    />
  ));

  return (
    <>
      <div className={styled.container}>{itemData}</div>
      <Pagination
        key={currentPage}
        prevIcon={<MdOutlineNavigateBefore />}
        nextIcon={<MdOutlineNavigateNext />}
        className={styled.pagination}
        total={items.length}
        pageSize={ITEMS_PER_PAGE}
        defaultCurrent={1}
        current={currentPage}
        onChange={setCurrentPage}
        locale='en_US'
        showLessItems
      />
    </>
  );
};

export default Products;
