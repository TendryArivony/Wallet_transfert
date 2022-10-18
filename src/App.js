import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/admin/Login';
import Tokens from './pages/admin/Tokens';
import Wallet from './pages/admin/Wallet';
import Transfers from './pages/admin/Transfers';
import TrustRelashionship from './pages/admin/TrustRelashionship';
import TransfersList from './pages/admin/TransfersList';
import CustomRoutes from './compoments/customRoutes/CustomRoutes';


const App = () => {
    return (
        <BrowserRouter>
           
            <Routes> 
                <Route path="/tokens" exact element={ <CustomRoutes compoment={Tokens}/>} />  
                <Route path="/wallets" exact element={ <CustomRoutes compoment={Wallet}/>}/>
                <Route path="/" exact element={<Login />} />
                <Route path="/transfers" exact element={ <CustomRoutes compoment={Transfers}/>} />
                <Route path="/relationship" exact element={ <CustomRoutes compoment={TrustRelashionship}/>} />
                <Route path="/transfersList" exact element={ <CustomRoutes compoment={TransfersList}/>} />
            </Routes> 
        </BrowserRouter>
    ); 
};

export default App;