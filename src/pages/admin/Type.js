import React from 'react';
import Navigation from '../../compoments/admin/Navigation';
import Header from '../../compoments/admin/Header';
import ListeTypeSignalement from '../../compoments/admin/ListeTypeSignalement';


const Type = () => {
    return (
        <div>
            <Navigation/>
            <Header/>
            <ListeTypeSignalement/>
        </div>
    );
};

export default Type;