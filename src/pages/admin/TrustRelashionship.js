import React from 'react';
import Navigation from '../../compoments/admin/Navigation';
import Header from '../../compoments/admin/Header';
import TrustRelashionshipComponent from '../../compoments/admin/TrustRelashionshipComponent';
import Footer from '../../compoments/admin/Footer';


const TrustRelashionship = () => {
  return (
    <div>
      <Navigation />
      <Header />
      <TrustRelashionshipComponent />
      <Footer/>
    </div>
  );
};

export default TrustRelashionship;