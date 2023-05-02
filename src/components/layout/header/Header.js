import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Nav from './top-nav/Nav';
import Hamburger from '../../ui/Hamburger';

import styled from './Header.module.css';
const Header = ({ isError }) => {
  const [isActive, setIsActive] = useState(false);

  const locationData = useLocation();
  const isInAuth = locationData.pathname === '/authentication';

  const toggleHamburger = () => {
    setIsActive((pre) => !pre);
  };

  const styleColor = {
    '--text-color': isInAuth || isError ? '#fff' : '#293462',
    '--background-color': isInAuth || isError ? '#000' : '#f2f2f2',
  };

  return (
    <header className={styled.header} style={styleColor}>
      <h1>
        <Link to='/home' className={styled.logo}>
          Build TecH
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
