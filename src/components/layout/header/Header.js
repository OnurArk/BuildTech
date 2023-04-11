import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Nav from './top-nav/Nav';
import Hamburger from '../../ui/Hamburger';

import styled from './Header.module.css';
const Header = () => {
  const [isActive, setIsActive] = useState(false);

  const locationData = useLocation();
  const isInAuth = locationData.pathname === '/authentication';

  const toggleHamburger = () => {
    setIsActive((pre) => !pre);
  };

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

      <div className={styled.hamburger}>
        <Hamburger
          isActive={isActive}
          styling={styleColor}
          onClick={toggleHamburger}
        />
        <Nav
          styling={styleColor}
          className={isActive ? styled.active : null}
          onClick={toggleHamburger}
        />
      </div>

      <Nav styling={styleColor} />
    </header>
  );
};

export default Header;
