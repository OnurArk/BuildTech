import React, { useState } from "react";

import TabletNav from "./tablets/TabletNav";

import styled from "./Nav.module.css";
import { FiMonitor } from "react-icons/fi";
import { BsKeyboardFill, BsFillMouseFill } from "react-icons/bs";
import { GiSmartphone, GiLaptop } from "react-icons/gi";
import { SiPcgamingwiki } from "react-icons/si";
import { IoWatchSharp, IoGameController } from "react-icons/io5";
import { ImCamera } from "react-icons/im";
import { UilTvRetro } from "@iconscout/react-unicons";
import { UilTablet } from "@iconscout/react-unicons";
import { UilHeadphonesAlt } from "@iconscout/react-unicons";

const dummyNav = [
  { icon: FiMonitor, type: "Monitor" },
  { icon: SiPcgamingwiki, type: "Computer Case" },
  { icon: BsKeyboardFill, type: "Keyboard" },
  { icon: BsFillMouseFill, type: "Mouse" },
  { icon: GiLaptop, type: "Laptop" },
  { icon: UilTvRetro, type: "Tv" },
  { icon: UilTablet, type: "Tablet" },
  { icon: GiSmartphone, type: "Phone" },
  { icon: IoWatchSharp, type: "Smart Watch" },
  { icon: ImCamera, type: "Camera" },
  { icon: IoGameController, type: "Game" },
  { icon: UilHeadphonesAlt, type: "Headphones" },
];

const Nav = () => {
  const [activeSelecs, setActiveSelecs] = useState([]);

  const onActive = (id) => {
    if (activeSelecs.includes(id)) {
      setActiveSelecs((pre) => [...pre].filter((item) => item !== id));
      return;
    }
    setActiveSelecs((pre) => [...pre, id]);
  };

  const navSelects = dummyNav.map((section, sectionIndex) => {
    const isActive = activeSelecs.includes(sectionIndex) ? true : false;
    return (
      <TabletNav
        icon={section.icon}
        type={section.type}
        key={sectionIndex}
        id={sectionIndex}
        onActive={onActive}
        className={isActive && styled.active}
        isActive={isActive}
      >
        message
      </TabletNav>
    );
  });

  return <div className={styled["nav-container"]}>{navSelects}</div>;
};

export default Nav;
