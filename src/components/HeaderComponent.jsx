import React from 'react';

const HeaderComponent = () => {
    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg px-4 py-2 bg-white shadow"><a href="#"
                                                                                  className="sidebar-toggler text-gray-500 mr-4 mr-lg-5 lead"><i
                className="fas fa-align-left"></i></a><a href="index.html"
                                                         className="navbar-brand font-weight-bold text-uppercase text-base">Staff
                Application</a>
                <ul className="ml-auto d-flex align-items-center list-unstyled mb-0">
                    <li className="nav-item dropdown ml-auto"><a id="userInfo" href="http://example.com"
                                                                 data-toggle="dropdown" aria-haspopup="true"
                                                                 aria-expanded="false"
                                                                 className="nav-link dropdown-toggle"><i
                        className="o-user-1 mr-3 text-gray"></i></a>
                        <div aria-labelledby="userInfo" className="dropdown-menu"><a href="#" className="dropdown-item"><strong
                            className="d-block text-uppercase headings-font-family"> User
                            name </strong><small> Staff</small></a>
                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item">Settings</a><a href="#" className="dropdown-item">Activity
                                log </a>
                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item">Logout</a>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default HeaderComponent;