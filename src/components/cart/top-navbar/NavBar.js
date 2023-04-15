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
        className={`${styled.link} ${styled.leftLink} ${
          mode === 'items' ? styled.activeLink : null
        }`}
      >
        Items
      </Link>
      <Link
        to={'?mode=adress'}
        className={`${styled.link} ${styled.middleLink} ${
          mode === 'adress' ? styled.activeLink : null
        }`}
      >
        Adress
      </Link>
      <Link
        to={'?mode=payment'}
        className={`${styled.link}  ${styled.rightLink} ${
          mode === 'payment' ? styled.activeLink : null
        }`}
      >
        Payment
      </Link>
    </div>
  );
};

export default NavBar;
