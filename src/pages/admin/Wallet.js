import React from 'react';
import Navigation from '../../compoments/admin/Navigation';
import Header from '../../compoments/admin/Header';
import ListeWallet from '../../compoments/admin/ListeWallet';


const Wallet= () => {
    return (
        <div>
            <Navigation/>
            <Header/>
            <ListeWallet/> 
        </div>
    );
};

export default Wallet;