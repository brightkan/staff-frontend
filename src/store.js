import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./slices/apiSlice";
import authReducer from "./slices/authSlice";


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    devTools: !import.meta.env.PROD,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([apiSlice.middleware]),
});

setupListeners(store.dispatch);

export default store;
