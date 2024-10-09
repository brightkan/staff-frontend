import React from 'react';
import {Link} from "react-router-dom";

const SideBar = () => {
    return (

            <div id="sidebar" className="sidebar py-3 ">
                <div
                    className="text-gray-400 text-uppercase px-3 px-lg-4 py-4 font-weight-bold small headings-font-family">MAIN
                </div>
                <ul className="sidebar-menu list-unstyled">
                    <li className="sidebar-list-item"><Link to="/"
                                                         className="sidebar-link text-muted {{home}}"><i
                        className="o-home-1 mr-3 text-gray"></i><span>Home</span></Link></li>
                    <li className="sidebar-list-item"><Link to="/staff_management"
                                                         className="sidebar-link text-muted {{withdraw}}"><i
                        className="fa fa-users mr-3 text-gray"></i><span>Staff Management</span></Link></li>
                    <li className="sidebar-list-item"><a href="/admin"
                                                         className="sidebar-link text-muted {{withdraw}}"><i
                        className="fa fa-lock mr-3 text-gray"></i><span>Admin Panel</span></a></li>
                    <li className="sidebar-list-item"><Link to="/auth/logout" className="sidebar-link text-muted"><i
                        className="o-exit-1 mr-3 text-gray"></i><span>Logout</span></Link></li>
                </ul>

            </div>

    );
};

export default SideBar;