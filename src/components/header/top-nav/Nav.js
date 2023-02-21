import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import AuthContext from "../../../context/Auth-Context";

import styled from "./Nav.module.css";

const Nav = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const logout = () => {
    authCtx.logout();
    navigate("authentication");
  };

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
      {authCtx.currentUser && (
        <NavLink
          to="profile"
          className={({ isActive }) =>
            isActive ? undefined : `${styled.links}`
          }
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Profile
        </NavLink>
      )}
      {authCtx.currentUser && <button onClick={logout}>Logout</button>}
      {!authCtx.currentUser && (
        <NavLink
          to="/authentication"
          className={({ isActive }) =>
            isActive ? undefined : `${styled.links}`
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
