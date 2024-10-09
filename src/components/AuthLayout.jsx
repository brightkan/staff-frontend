import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {selectAccessToken} from "../slices/authSlice.js";


const AuthLayout = () => {
    const accessToken = useSelector(selectAccessToken);

    if (accessToken) {
        return <Navigate to="/dashboard" replace={true} />;
    }

    return (
        <div className="page-holder d-flex align-items-center">
            <div className="container">
                <div className="row align-items-center py-5">

                    <div className="col-lg-10 px-lg-4">
                        <h1 className="text-base text-primary text-uppercase mb-4">Staff Application</h1>
                        <h2 className="mb-4">Welcome back!</h2>
                        <p className="text-muted">This enables staff registration and update</p>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AuthLayout;
