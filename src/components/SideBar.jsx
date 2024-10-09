import React from 'react';

const SideBar = () => {
    return (
        <div className="d-flex align-items-stretch">
            <div id="sidebar" className="sidebar py-3">
                <div
                    className="text-gray-400 text-uppercase px-3 px-lg-4 py-4 font-weight-bold small headings-font-family">MAIN
                </div>
                <ul className="sidebar-menu list-unstyled">
                    <li className="sidebar-list-item"><a href="#"
                                                         className="sidebar-link text-muted {{home}}"><i
                        className="o-home-1 mr-3 text-gray"></i><span>Home</span></a></li>
                    <li className="sidebar-list-item"><a href="#"
                                                         className="sidebar-link text-muted {{withdraw}}"><i
                        className="fa fa-wallet mr-3 text-gray"></i><span>Withdraw</span></a></li>
                    <li className="sidebar-list-item"><a href="#"
                                                         className="sidebar-link text-muted {{deposit}}"><i
                        className="fa fa-money-bill-wave mr-3  text-gray"></i><span>Deposit</span></a></li>
                    <li className="sidebar-list-item"><a href="#"
                                                         className="sidebar-link text-muted {{transfer}}"><i
                        className="fa fa-exchange-alt mr-3 text-gray"></i><span>Transfer</span></a></li>
                    <li className="sidebar-list-item"><a href="#"
                                                         className="sidebar-link text-muted"><i
                        className="o-exit-1 mr-3 text-gray"></i><span>Logout</span></a></li>
                </ul>

            </div>
        </div>
            );
            };

            export default SideBar;