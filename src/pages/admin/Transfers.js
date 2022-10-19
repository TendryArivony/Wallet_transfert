import React from 'react';
import Navigation from '../../compoments/admin/Navigation';
import Header from '../../compoments/admin/Header';
import TransfersComponent from '../../compoments/admin/TransfersComponent';
import Footer from '../../compoments/admin/Footer';


const Transfers = () => {
  return (
    <div>
      <Navigation />
      <Header />
      <TransfersComponent />
      <Footer/>
    </div>
  );
};

export default Transfers;