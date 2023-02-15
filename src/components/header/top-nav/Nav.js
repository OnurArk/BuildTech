import React from "react";
import { NavLink, Link } from "react-router-dom";

import styled from "./Nav.module.css";

const Nav = () => {
  const activeStyle = {
    borderBottom: "solid 3px #ffffff",
  };

  return (
    <div className={styled.nav}>
      <NavLink
        to="/home"
        className={({ isActive }) => (isActive ? undefined : `${styled.links}`)}
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Home
      </NavLink>
      <NavLink
        to="/deals"
        className={({ isActive }) => (isActive ? undefined : `${styled.links}`)}
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Deals
      </NavLink>
      <NavLink
        to="/cart"
        className={({ isActive }) => (isActive ? undefined : `${styled.links}`)}
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Cart
      </NavLink>
      <NavLink
        to="profile"
        className={({ isActive }) => (isActive ? undefined : `${styled.links}`)}
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Profile
      </NavLink>
      <Link>Logout</Link>
      <NavLink
        to="/authentication"
        className={({ isActive }) => (isActive ? undefined : `${styled.links}`)}
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Login
      </NavLink>
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
