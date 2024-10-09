import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {logout} from "./slices/authSlice.js";


const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout());
        navigate("/auth/login")
    }, [dispatch, navigate]);
    return <div>Logging out...</div>;
};

export default Logout;