import React from 'react';
import { Suspense,LoadingSpinner } from 'react';
import Navigation from '../../compoments/admin/Navigation';
import Header from '../../compoments/admin/Header';
import ListeToken from '../../compoments/admin/ListeToken';
import Footer from '../../compoments/admin/Footer';

const Tokens = () => {
    return (
        <div>
             <Suspense fallback={<LoadingSpinner />}>
            
            <Navigation/>
            <Header/>
            <ListeToken/> 
            <Footer/>
            </Suspense>
        </div>
    );
};

export default Tokens;