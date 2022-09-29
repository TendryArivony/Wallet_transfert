import React from 'react';
import Navigation from '../../compoments/admin/Navigation';
import Header from '../../compoments/admin/Header';
import TransfersComponent from '../../compoments/admin/TransfersComponent';

const Transfers = () => {
  return (
    <div>
      <Navigation />
      <Header />
      <TransfersComponent />
    </div>
  );
};

export default Transfers;