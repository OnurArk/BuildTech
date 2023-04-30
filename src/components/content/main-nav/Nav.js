import TabletNav from './tablets/TabletNav';

import styled from './Nav.module.css';
import {
  faGamepad,
  faMouse,
  faComputer,
  faCameraRetro,
  faHeadphonesSimple,
  faTelevision,
  faDesktop,
  faLaptop,
  faKeyboard,
  faTablet,
  faMobileAndroid,
} from '@fortawesome/free-solid-svg-icons';

import { IoWatchSharp } from 'react-icons/io5';

const dummyNav = [
  { icon: faDesktop, type: 'Monitor' },
  { icon: faComputer, type: 'Computer Case' },
  { icon: faKeyboard, type: 'Keyboard' },
  { icon: faMouse, type: 'Mouse' },
  { icon: faLaptop, type: 'Laptop' },
  { icon: faTelevision, type: 'Tv' },
  { icon: faTablet, type: 'Tablet' },
  { icon: faMobileAndroid, type: 'Phone' },
  { icon2: IoWatchSharp, type: 'Watch' },
  { icon: faCameraRetro, type: 'Camera' },
  { icon: faGamepad, type: 'Game' },
  { icon: faHeadphonesSimple, type: 'Headphones' },
];

const Nav = () => {
  return (
    <div className={styled['nav-container']}>
      {dummyNav.map((section, sectionIndex) => (
        <TabletNav
          icon={section.icon}
          Icon2={section.icon2}
          type={section.type}
          key={sectionIndex}
          id={sectionIndex}
        >
          message
        </TabletNav>
      ))}
    </div>
  );
};

export default Nav;
