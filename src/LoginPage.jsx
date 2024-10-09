import React from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {setCredentials, setUser} from "./slices/authSlice.js";
import {useLoginMutation} from "./slices/authApiSlice.js";
import {loginSchema} from "./utils/validations.js";
import {errorParser} from "./utils/helpers.js";
import TextInput from "./components/formInputs/TextInput.jsx";
import PasswordInput from "./components/formInputs/PasswordInput.jsx";


const LoginPage = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // get redirect path
    const location = useLocation();
    const [login, { isLoading }] = useLoginMutation();

    const handleLogin = async (data) => {
        try {
            const {
                access_token: accessToken,
                refresh_token: refreshToken,
                user_id,
                username
            } = await login(data).unwrap();

            dispatch(setCredentials({ accessToken, refreshToken}));
            dispatch(setUser({ user_id, username }));
            const redirect = new URLSearchParams(location.search).get("redirect");
            navigate(decodeURIComponent(redirect || "/dashboard"));
        } catch (err) {
            if (parseInt(err.status) !== err.status) {
                toast.error(("network_error"));
            } else {
                const message = errorParser(err?.data);
                toast.error(message);
            }
        }
    };

    return (
        <form  className="mt-4"  onSubmit={handleSubmit(handleLogin)}>
            <div className="form-group mb-4">
                <TextInput name={"username"} label={"Username"} register={register}/>
            </div>
            <div className="form-group mb-4">
                <PasswordInput name={"password"} label={"Password"} register={register} />
            </div>
            <button type="submit" className="btn btn-primary shadow px-5">Log in</button>
        </form>
    );
};

export default LoginPage;
