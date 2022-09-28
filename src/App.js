import React from 'react';
import { BrowserRouter, Routes , Route } from "react-router-dom" 
import Home from './pages/admin/Home';
import Region from './pages/admin/Region';
import Login from './pages/admin/Login';
import Type from './pages/admin/Type';
import Responsable from './pages/admin/Responsable';
import Signalement from './pages/admin/Signalement';
import DetailsSignalement from './pages/admin/DetailsSignalement';
import Affectation from './pages/admin/Affectation';
import CustomRoutes from './compoments/customRoutes/CustomRoutes';
import Tokens from './pages/admin/Tokens';
import Wallet from './pages/admin/Wallet';




const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" exact element={<CustomRoutes compoment={Home}/>} />
                {/* <Route path="/regions" exact element={<Region />}/> */}
                <Route path="/types" exact element={<Type />}/>
                <Route path="/tokens" exact element={<Tokens />}/>
                <Route path="/wallets" exact element={<Wallet />}/>
                <Route path="/" exact element={<Login />}/>
                {/* <Route path="/responsables" exact element={<Responsable />}/>
                <Route path="/affectation" exact element={<Affectation />}/>
                <Route path="/signalement" exact element={<Signalement />}/>
                <Route path="/fiche/:id" exact element={<DetailsSignalement />}/> */}
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default App;