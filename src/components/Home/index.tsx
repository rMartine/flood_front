import React from 'react';

import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';

const Home = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Home;