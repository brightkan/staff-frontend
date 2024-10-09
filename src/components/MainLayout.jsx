import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import HeaderComponent from "./HeaderComponent.jsx";
import Footer from "./Footer.jsx";
import SideBar from "./SideBar.jsx";

const MainLayout = () => {
    const [toggleMobile, setToggleMobile] = useState(false);

    return (
        <>
            <HeaderComponent/>
            <div className="d-flex align-items-stretch">
                <SideBar/>
                <div className="page-holder w-100 d-flex flex-wrap">
                    <div className="container-fluid px-xl-5">
                        <Outlet/>
                    </div>
                    <Footer/>
                </div>
            </div>
            </>
            )
            };

            export default MainLayout;
