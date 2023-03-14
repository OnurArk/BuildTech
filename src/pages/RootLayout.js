import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/footer/Footer';

import Header from '../components/layout/header/Header';

const RootLayout = () => {
  return (
    <Fragment>
      <Header />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default RootLayout;

// out lete backgroun ver
