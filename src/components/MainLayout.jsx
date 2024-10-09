import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import HeaderComponent from "./HeaderComponent.jsx";
import Footer from "./Footer.jsx";

const MainLayout = () => {
    const [toggleMobile, setToggleMobile] = useState(false);

    return (
        <>
            <HeaderComponent/>
            <sideBar/>
            <div className="page-holder w-100 d-flex flex-wrap">
                <div className="container-fluid px-xl-5">
                    <Outlet/>
                </div>
                <Footer/>
            </div>
        </>
    )
};

export default MainLayout;
