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
                <span className="b-title">Administrateur</span>
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
                    <div className="dropdown">
                        <a className="dropdown-toggle" href="javascript:" data-toggle="dropdown"><i className="icon feather icon-bell"></i></a>
                        <div className="dropdown-menu dropdown-menu-right notification">
                            <div className="noti-head">
                                <h6 className="d-inline-block m-b-0">Notifications</h6>
                                <div className="float-right">
                                    <a href="javascript:" className="m-r-10">mark as read</a>
                                    <a href="javascript:">clear all</a>
                                </div>
                            </div>
                            <ul className="noti-body">
                                <li className="n-title">
                                    <p className="m-b-0">NEW</p>
                                </li>
                                <li className="notification">
                                    <div className="media">
                                        {/* <img className="img-radius" src="assets/images/user/avatar-1.jpg" alt="Generic placeholder image"> */}
                                        <div className="media-body">
                                            <p><strong>John Doe</strong><span className="n-time text-muted"><i className="icon feather icon-clock m-r-10"></i>30 min</span></p>
                                            <p>New ticket Added</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="n-title">
                                    <p className="m-b-0">EARLIER</p>
                                </li>
                                <li className="notification">
                                    <div className="media">
                                        {/* <img className="img-radius" src="assets/images/user/avatar-2.jpg" alt="Generic placeholder image"> */}
                                        <div className="media-body">
                                            <p><strong>Joseph William</strong><span className="n-time text-muted"><i className="icon feather icon-clock m-r-10"></i>30 min</span></p>
                                            <p>Prchace New Theme and make payment</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="notification">
                                    <div className="media">
                                        {/* <img className="img-radius" src="assets/images/user/avatar-3.jpg" alt="Generic placeholder image"> */}
                                        <div className="media-body">
                                            <p><strong>Sara Soudein</strong><span className="n-time text-muted"><i className="icon feather icon-clock m-r-10"></i>30 min</span></p>
                                            <p>currently login</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div className="noti-footer">
                                <a href="javascript:">show all</a>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="dropdown drp-user">
                        <a href="javascript:" className="dropdown-toggle" data-toggle="dropdown">
                            <i className="icon feather icon-settings"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right profile-notification">
                            <div className="pro-head">
                                {/* <img src="assets/images/user/avatar-1.jpg" className="img-radius" alt="User-Profile-Image"> */}
                                <span>Admin</span>
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

