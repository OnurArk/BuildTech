import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import styled from './NavBar.module.css';

const NavBar = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  return (
    <div className={styled['nav-container']}>
      <Link
        to={'?mode=items'}
        className={`${styled.link} ${
          mode === 'items' || mode === 'adress' || mode === 'payment'
            ? styled.activeLink
            : null
        }`}
      >
        Items
      </Link>
      <p
        className={`${styled.link} ${styled.middleLink} ${
          mode === 'adress' || mode === 'payment' ? styled.activeLink : null
        }`}
      >
        Adress
      </p>
      <p
        className={`${styled.link} ${
          mode === 'payment' ? styled.activeLink : null
        }`}
      >
        Payment
      </p>
    </div>
  );
};

export default NavBar;
