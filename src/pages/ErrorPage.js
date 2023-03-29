import React from 'react';
import { useRouteError } from 'react-router-dom';

import Header from '../components/layout/header/Header';
import Footer from '../components/layout/footer/Footer';

const ErrorPage = () => {
  let error = useRouteError();
  console.dir(error);

  let title = 'An error occured!';
  let message = 'Could Not Find This Page!';

  if (error.status === 404) {
    // message = JSON.parse(error.data).message;
    // If we are not using Responce no need for Json.parse method
    // using react routers json method
    message = error.statusText;
  }

  if (error.name === 'FirebaseError') {
    message = error.message;
  }

  return (
    <>
      <Header />
      <main>
        <h1 className='centered err'>{title}</h1>
        <p className='centered err'>{message}</p>
      </main>
      <Footer />
    </>
  );
};

export default ErrorPage;
