import React from 'react';
import { useRouteError } from 'react-router-dom';

import Header from '../components/layout/header/Header';
import Footer from '../components/layout/footer/Footer';

import styled from '../styles/ErrorPage.module.css';

const ErrorPage = () => {
  let error = useRouteError();
  console.dir(error);

  let title = 'An error occured!';
  let message = 'Something Went Wrong!';
  let status = 404;

  if (error.status === 404) {
    // message = JSON.parse(error.data).message;
    // If we are not using Responce no need for Json.parse method
    // using react routers json method
    status = error.status;
    message = error.statusText;
  }

  if (error.name === 'FirebaseError') {
    message = error.message;
    status = 403;
  }

  return (
    <>
      <Header isError={true} />
      <main className={styled['error-container']}>
        {(error.status || status) && (
          <h1 className={styled.statusCode}>{status}</h1>
        )}
        <h1 className={styled.title}>{title}</h1>
        <p className={styled.message}>{message}</p>
      </main>
      <Footer />
    </>
  );
};

export default ErrorPage;
