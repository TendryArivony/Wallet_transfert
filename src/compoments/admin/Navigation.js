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
                        <span className="b-title">Token Transfers</span>
                    </a>
                    <a className="mobile-menu" id="mobile-collapse" href="javascript:"><span></span></a>
                </div>
                <div className="navbar-content scroll-div">
                    <ul className="nav pcoded-inner-navbar">
                        <li className="nav-item pcoded-menu-caption">
                            <label>Navigation</label>
                        </li>
                        <li>
                            <Link to="../tokens"><span className="pcoded-micon"><i className="feather icon-file-text"></i></span><span className="pcoded-mtext">List of tokens in this wallet</span></Link>
                        </li>
                        <li data-username="form elements advance componant validation masking wizard picker select" className="nav-item">
                            <Link to="../wallets"><span className="pcoded-micon"><i className="feather icon-briefcase"></i></span><span className="pcoded-mtext">List of all managed wallets</span></Link>
                        </li>

                        <li data-username="form elements advance componant validation masking wizard picker select" className="nav-item">
                            <Link to="../transfers"><span className="pcoded-micon"><i className="feather icon-repeat"></i></span><span className="pcoded-mtext">Token transfer</span></Link>
                        </li>
                        <li data-username="form elements advance componant validation masking wizard picker select" className="nav-item">
                            <Link to="../transfersList"><span className="pcoded-micon"><i className="feather icon-box"></i></span><span className="pcoded-mtext">See all transfers</span></Link>
                        </li>
                        <li data-username="form elements advance componant validation masking wizard picker select" className="nav-item">
                            <Link to="../relationship"><span className="pcoded-micon"><i className="feather icon-users"></i></span><span className="pcoded-mtext">Trust relationship</span></Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;

