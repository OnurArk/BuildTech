import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import AuthContext from '../../../../context/Auth-Context';

import styled from './Nav.module.css';

const Nav = ({ styling, className, onClick }) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const logout = () => {
    authCtx.logout();
    onClick();
    navigate('authentication');
  };

  return (
    <div className={`${styled.nav} ${className}`} style={styling}>
      <NavLink
        to='home'
        className={({ isActive }) =>
          `${isActive ? styled.activeLink : styled.links} ${styled.linkColor}`
        }
        onClick={onClick}
      >
        Home
      </NavLink>

      {authCtx?.currentUid && (
        <NavLink
          to='cart'
          className={({ isActive }) =>
            `${isActive ? styled.activeLink : styled.links} ${styled.linkColor}`
          }
          onClick={onClick}
        >
          Cart
        </NavLink>
      )}
      {authCtx?.currentUid && (
        <NavLink
          to='profile'
          className={({ isActive }) =>
            `${isActive ? styled.activeLink : styled.links} ${styled.linkColor}`
          }
          onClick={onClick}
        >
          Profile
        </NavLink>
      )}
      {authCtx?.currentUid && (
        <NavLink
          onClick={logout}
          to='authentication'
          className={`${styled.links} ${styled.linkColor}`}
        >
          Logout
        </NavLink>
      )}
      {!authCtx?.currentUid && (
        <NavLink
          to='authentication'
          className={({ isActive }) =>
            `${isActive ? styled.activeLink : styled.links} ${styled.linkColor}`
          }
          onClick={onClick}
          // end = {true} sadece bu sonda bitiyorsa bu ektif kalır ve end koyarsan default olarak true demek zaten
        >
          Login
        </NavLink>
      )}
    </div>
  );
};

export default Nav;
