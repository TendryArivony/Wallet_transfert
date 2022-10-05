import React from 'react';
import Navigation from '../../compoments/admin/Navigation';
import Header from '../../compoments/admin/Header';
import ListeTransfers from '../../compoments/admin/ListeTransfers';

const TransfersList = () => {
  return (
    <div>
      <Navigation />
      <Header />
      <ListeTransfers />
    </div>
  );
};

export default TransfersList;