import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Item from './Item/Item';

import Pagination from 'rc-pagination';
import styled from './Products.module.css';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';

const Products = () => {
  const [itemsPerPage, setItemsPerPage] = useState(
    window.innerWidth > 1276 ? 15 : 12
  );

  useEffect(() => {
    const handleResize = () => {
      const newWindowWidth = window.innerWidth;
      const newItemsPerPage = newWindowWidth > 1276 ? 15 : 12;
      if (newItemsPerPage !== itemsPerPage) {
        setItemsPerPage(newItemsPerPage);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [itemsPerPage]);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = itemsPerPage;

  const items = useSelector((state) => state.items.preferedItems);

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
    <Item item={item} key={item.id} />
  ));

  return (
    <>
      <div className={styled['item-container']}>{itemData}</div>
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
