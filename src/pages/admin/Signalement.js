import React from 'react';
import Navigation from '../../compoments/admin/Navigation';
import Header from '../../compoments/admin/Header';
import ListeSignalement from '../../compoments/admin/ListeSignalement';

const Signalement = () => {
    return (
        <>
            <Navigation/>
            <Header/>
            <ListeSignalement/>
        </>
    );
};

export default Signalement;
