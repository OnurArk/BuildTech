import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import AuthContext from '../../../../context/Auth-Context';

import styled from './Nav.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Nav = ({ styling, className, onClick }) => {
  const totalCartQuantity = useSelector((state) => state.cart.totalQuantity);

  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const logout = () => {
    authCtx.logout();
    onClick();
    navigate('authentication');
  };

  return (
    <div className={`${styled.nav} ${className}`} style={styling}>
      <div className={styled['links-container']}>
        <NavLink
          to='home'
          className={({ isActive }) =>
            `${isActive ? styled.activeLink : styled.links} ${styled.linkColor}`
          }
          onClick={onClick}
        >
          Home
        </NavLink>
      </div>

      {authCtx?.currentUid && (
        <div className={styled['links-container']}>
          <p className={styled.cartQuantity}>{totalCartQuantity}</p>
          <NavLink
            to='cart?mode=items'
            className={({ isActive }) =>
              `${isActive ? styled.activeLink : styled.links} ${
                styled.linkColor
              } ${styled.cartLink}`
            }
            onClick={onClick}
          >
            <span>Cart</span>
            <FontAwesomeIcon className={styled.icon} icon={faCartShopping} />
          </NavLink>
        </div>
      )}
      {authCtx?.currentUid && (
        <div className={styled['links-container']}>
          <NavLink
            to='profile'
            className={({ isActive }) =>
              `${isActive ? styled.activeLink : styled.links} ${
                styled.linkColor
              }`
            }
            onClick={onClick}
          >
            Profile
          </NavLink>
        </div>
      )}
      {authCtx?.currentUid && (
        <div className={styled['links-container']}>
          <NavLink
            onClick={logout}
            to='authentication'
            className={`${styled.links} ${styled.linkColor}`}
          >
            Logout
          </NavLink>
        </div>
      )}
      {!authCtx?.currentUid && (
        <div className={styled['links-container']}>
          <NavLink
            to='authentication'
            className={({ isActive }) =>
              `${isActive ? styled.activeLink : styled.links} ${
                styled.linkColor
              }`
            }
            onClick={onClick}
            // end = {true} sadece bu sonda bitiyorsa bu ektif kalır ve end koyarsan default olarak true demek zaten
          >
            Login
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Nav;
