import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
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
import Transfers from './pages/admin/Transfers';
import TrustRelashionship from './pages/admin/TrustRelashionship';
import TransfersList from './pages/admin/TransfersList';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" exact element={<CustomRoutes compoment={Home} />} />
                <Route path="/types" exact element={<Type />} />
                <Route path="/tokens" exact element={<Tokens />} />
                <Route path="/wallets" exact element={<Wallet />} />
                <Route path="/" exact element={<Login />} />
                <Route path="/transfers" exact element={<Transfers />} />
                <Route path="/relationship" exact element={<TrustRelashionship />} />
                <Route path="/transfersList" exact element={<TransfersList />} />
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