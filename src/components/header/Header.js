import React from "react";
import { Link } from "react-router-dom";

import Nav from "./top-nav/Nav";

import styled from "./Header.module.css";
const Header = () => {
  return (
    <header className={styled.header}>
      <h1>
        <Link to="/home">Brand Logo</Link>
      </h1>
      <Nav />
    </header>
  );
};

export default Header;
