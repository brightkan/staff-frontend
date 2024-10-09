import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import MainLayout from "./MainLayout";

import PropTypes from "prop-types";
import {selectAccessToken} from "../slices/authSlice.js";

const ProtectedRoute = ({props}) => {
    const accessToken = useSelector(selectAccessToken);


    let currentPath = useLocation().pathname;
    if (currentPath === "/auth/logout") {
        currentPath = "/dashboard";
    }
    currentPath = encodeURIComponent(currentPath);

    if (!accessToken) {
        // User is not authenticated, redirect to login
        return <Navigate to={"/auth/login?redirect=" + currentPath} />;
    }
    else {
        // User is authenticated
        return <MainLayout {...props} />;
    }
};

ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.array,
    props: PropTypes.object
}

export default ProtectedRoute;
