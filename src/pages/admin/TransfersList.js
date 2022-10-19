import React from 'react';
import Navigation from '../../compoments/admin/Navigation';
import Header from '../../compoments/admin/Header';
import ListeTransfers from '../../compoments/admin/ListeTransfers';
import Footer from '../../compoments/admin/Footer';


const TransfersList = () => {
  return (
    <div>
      <Navigation />
      <Header />
      <ListeTransfers />
      <Footer/>
    </div>
  );
};

export default TransfersList;