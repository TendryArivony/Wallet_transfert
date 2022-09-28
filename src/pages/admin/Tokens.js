import React from 'react';
import Navigation from '../../compoments/admin/Navigation';
import Header from '../../compoments/admin/Header';
import ListeToken from '../../compoments/admin/ListeToken';


const Tokens = () => {
    return (
        <div>
            <Navigation/>
            <Header/>
            <ListeToken/> 
        </div>
    );
};

export default Tokens;