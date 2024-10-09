import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        accessToken: localStorage.getItem("accessToken") ?? null,
        refreshToken: localStorage.getItem("refreshToken") ?? null,
        user: JSON.parse(localStorage.getItem("user")) ?? null,
    },
    reducers: {
        setCredentials: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            localStorage.setItem("accessToken", action.payload.accessToken);
            localStorage.setItem("refreshToken", action.payload.refreshToken);
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        },
        logout: (state) => {
            state.accessToken = null;
            state.user = null;
            state.refreshToken = null;
            localStorage.clear();
        },
    },
});

export const { setCredentials, logout, setUser } = authSlice.actions;

export const selectAccessToken = (state) => state.auth.accessToken;
export const selectRefreshToken = (state) => state.auth.refreshToken;
export const selectUser = (state) => state.auth.user;


export default authSlice.reducer;
