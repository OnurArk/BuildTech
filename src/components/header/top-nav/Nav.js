import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import AuthContext from '../../../context/Auth-Context';

import styled from './Nav.module.css';

const Nav = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const logout = () => {
    authCtx.logout();
    navigate('authentication');
  };

  const activeStyle = {
    borderBottom: props.isInAuth ? 'solid 3px #fff' : 'solid 3px #293462',
  };

  return (
    <div className={styled.nav} style={props.styling}>
      <NavLink
        to='/home'
        className={({ isActive }) =>
          `${isActive ? null : `${styled.links}`} ${styled.linkColor}`
        }
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Home
      </NavLink>

      {authCtx.currentUser && (
        <NavLink
          to='/cart'
          className={({ isActive }) =>
            `${isActive ? null : `${styled.links}`} ${styled.linkColor}`
          }
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Cart
        </NavLink>
      )}
      {authCtx.currentUser && (
        <NavLink
          to='profile'
          className={({ isActive }) =>
            `${isActive ? null : `${styled.links}`} ${styled.linkColor}`
          }
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Profile
        </NavLink>
      )}
      {authCtx.currentUser && (
        <NavLink
          onClick={logout}
          to='/authentication'
          className={`${styled.links} ${styled.linkColor}`}
        >
          Logout
        </NavLink>
      )}
      {!authCtx.currentUser && (
        <NavLink
          to='/authentication'
          className={({ isActive }) =>
            `${isActive ? null : `${styled.links}`} ${styled.linkColor}`
          }
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
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
