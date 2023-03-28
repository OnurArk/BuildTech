import React from 'react';

import Header from '../components/layout/header/Header';
import Footer from '../components/layout/footer/Footer';

const ErrorPage = () => {
  return (
    <>
      <Header />
      <main>
        <h1 className='centered err'>An error occured!</h1>
        <p className='centered err'>Could Not Find This Page!</p>
      </main>
      <Footer />
    </>
  );
};

export default ErrorPage;
