// Description: This component will hold the home page of the application along with all the components that are used in the home page.
// The app is a single page app. So, the home page will be the first page that will be loaded when the app is loaded.
// It will be mounted on the App component.

import React from 'react';

import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};