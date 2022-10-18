import React from 'react';
import { Link } from "react-router-dom"

const Header = () => {

    const logout = () =>{
        localStorage.setItem("token","");
        localStorage.clear();
        window.location.href = "/";
    }

    return (
        <header className="navbar pcoded-header navbar-expand-lg navbar-light">
        <div className="m-header">
            <a className="mobile-menu" id="mobile-collapse1" href="javascript:"><span></span></a>
            <a href="index.html" className="b-brand">
                <div className="b-bg">
                    <i className="feather icon-trending-up"></i>
                </div>
                <span className="b-title">Log out</span>
            </a>
        </div>
        <a className="mobile-menu" id="mobile-header" href="javascript:">
            <i className="feather icon-more-horizontal"></i>
        </a>
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
                
                <li className="nav-item">
                    <div className="main-search">
                        <div className="input-group">
                            <input type="text" id="m-search" className="form-control" placeholder="Search . . ."/>
                            <a href="javascript:" className="input-group-append search-close">
                                <i className="feather icon-x input-group-text"></i>
                            </a>
                            <span className="input-group-append search-btn btn btn-primary">
                                <i className="feather icon-search input-group-text"></i>
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li>
                    <div className="dropdown drp-user">
                        <a href="javascript:" className="dropdown-toggle" data-toggle="dropdown">
                            <i className="icon feather icon-settings"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right profile-notification">
                            <div className="pro-head">
                                {/* <img src="assets/images/user/avatar-1.jpg" className="img-radius" alt="User-Profile-Image"> */}
                                <span>Log out</span>
                                <Link to="#" className="dud-logout" title="Logout"  onClick={() => logout()}>
                                    <i className="feather icon-log-out"></i>
                                </Link>
                            </div>
                            {/* <ul className="pro-body">
                                <li><a href="javascript:" className="dropdown-item"><i className="feather icon-settings"></i> Settings</a></li>
                                <li><a href="javascript:" className="dropdown-item"><i className="feather icon-user"></i> Profile</a></li>
                            </ul> */}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </header>
    );
};

export default Header;

