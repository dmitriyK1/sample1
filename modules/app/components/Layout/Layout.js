import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  manufacturersPath,
  productsPath,
  usersPath,
} from '../../config/routePaths';
import logo from './sitoo_logo.svg';
import styles from './Layout.module.scss';

const Layout = props => {
  return (
    <>
      <header className={styles.header}>
        <img src={logo} alt="logo" />
      </header>
      <ul className={styles.navigation}>
        <li className={styles.item}>
          <NavLink
            activeClassName={styles.activeLink}
            to={usersPath}
            className={styles.link}
          >
            Users
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
            activeClassName={styles.activeLink}
            to={productsPath}
            className={styles.link}
          >
            Products
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
            activeClassName={styles.activeLink}
            to={manufacturersPath}
            className={styles.link}
          >
            Manufacturers
          </NavLink>
        </li>
      </ul>
      {props.children}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export { Layout };
