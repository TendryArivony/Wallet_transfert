import React from 'react';
import { Link } from "react-router-dom"

const Navigation = () => {
    return (
        <nav className="pcoded-navbar">
            <div className="navbar-wrapper">
                <div className="navbar-brand header-logo">
                    <a href="index.html" className="b-brand">
                        <div className="b-bg">
                            <i className="feather icon-trending-up"></i>
                        </div>
                        <span className="b-title">Bondy</span>
                    </a>
                    <a className="mobile-menu" id="mobile-collapse" href="javascript:"><span></span></a>
                </div>
                <div className="navbar-content scroll-div">
                    <ul className="nav pcoded-inner-navbar">
                        <li className="nav-item pcoded-menu-caption">
                            <label>Navigation</label>
                        </li>
                        <li>
                            <Link to="../tokens"><span className="pcoded-micon"><i className="feather icon-home"></i></span><span className="pcoded-mtext">Liste des tokens dans ce wallet</span></Link>
                        </li>
                        <li data-username="form elements advance componant validation masking wizard picker select" className="nav-item">
                            <Link to="../wallets"><span className="pcoded-micon"><i className="feather icon-alert-octagon"></i></span><span className="pcoded-mtext">Liste de tous les wallet gérés</span></Link>
                        </li>

                        <li data-username="form elements advance componant validation masking wizard picker select" className="nav-item">
                            <Link to="../transfers"><span className="pcoded-micon"><i className="feather icon-box"></i></span><span className="pcoded-mtext">Transférer des tokens entre les wallets</span></Link>
                        </li>
                        <li data-username="form elements advance componant validation masking wizard picker select" className="nav-item">
                            <Link to="#"><span className="pcoded-micon"><i className="feather icon-users"></i></span><span className="pcoded-mtext">Voir les transferts</span></Link>
                        </li>
                        <li data-username="form elements advance componant validation masking wizard picker select" className="nav-item">
                            <Link to="../relationship"><span className="pcoded-micon"><i className="feather icon-box"></i></span><span className="pcoded-mtext">Trust relationship</span></Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;

