import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import AuthContext from '../../../../context/Auth-Context';

import styled from './Nav.module.css';

const Nav = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const logout = () => {
    authCtx.logout();
    navigate('authentication');
  };

  return (
    <div className={styled.nav} style={props.styling}>
      <NavLink
        to='home'
        className={({ isActive }) =>
          `${isActive ? styled.activeLink : styled.links} ${styled.linkColor}`
        }
      >
        Home
      </NavLink>

      {authCtx.currentEmail && (
        <NavLink
          to='cart'
          className={({ isActive }) =>
            `${isActive ? styled.activeLink : styled.links} ${styled.linkColor}`
          }
        >
          Cart
        </NavLink>
      )}
      {authCtx.currentEmail && (
        <NavLink
          to='profile'
          className={({ isActive }) =>
            `${isActive ? styled.activeLink : styled.links} ${styled.linkColor}`
          }
        >
          Profile
        </NavLink>
      )}
      {authCtx.currentEmail && (
        <NavLink
          onClick={logout}
          to='authentication'
          className={`${styled.links} ${styled.linkColor}`}
        >
          Logout
        </NavLink>
      )}
      {!authCtx.currentEmail && (
        <NavLink
          to='authentication'
          className={({ isActive }) =>
            `${isActive ? styled.activeLink : styled.links} ${styled.linkColor}`
          }
          // end = {true} sadece bu sonda bitiyorsa bu ektif kalır ve end koyarsan defaul olarak true demek zaten
        >
          Login
        </NavLink>
      )}
    </div>
  );
};

export default Nav;

// let activeStyle = {
//   textDecoration: "underline",
// };

/* <NavLink
to="/home"
className={styled.links}
style={({ isActive }) => (isActive ? activeStyle : undefined)}
> */
