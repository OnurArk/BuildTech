import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Nav from './top-nav/Nav';

import styled from './Header.module.css';
const Header = () => {
  const locationData = useLocation();
  const isInAuth = locationData.pathname === '/authentication';

  const styleColor = {
    '--text-color': isInAuth ? '#fff' : '#293462',
    '--background-color': isInAuth ? '#000' : '#f2f2f2',
    '--border-bottom': isInAuth ? 'solid 3px #fff' : 'solid 3px #293462',
  };

  return (
    <header className={styled.header} style={styleColor}>
      <h1>
        <Link to='/home' className={styled.logo}>
          Brand Logo
        </Link>
      </h1>
      <Nav isInAuth={isInAuth} styling={styleColor} />
    </header>
  );
};

export default Header;
