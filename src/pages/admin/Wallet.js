import React from 'react';
import Navigation from '../../compoments/admin/Navigation';
import Header from '../../compoments/admin/Header';
import ListeWallet from '../../compoments/admin/ListeWallet';
import Footer from '../../compoments/admin/Footer';


const Wallet= () => {
    return (
        <div>
            <Navigation/>
            <Header/>
            <ListeWallet/> 
            <Footer/>
        </div>
    );
};

export default Wallet;