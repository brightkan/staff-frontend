import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { toast } from "react-hot-toast";

import {logout, selectAccessToken, selectRefreshToken,  setCredentials} from "./authSlice.js";
import config from "../../config.js";
import {parseDRFErrorResponse} from "../utils/parseDRFErrorResponse.js";

const baseURL = config.baseURL;
const refreshBaseURL = import.meta.env.PROD
    ? "/api/v1"
    : "http://localhost:8000/api/v1";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
        const token = selectAccessToken(getState());
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const refreshBaseQuery = fetchBaseQuery({
    baseUrl: refreshBaseURL,
});

const baseWithErrorHandling = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error) {
        if (args.method === "GET" || result.meta.request.method === "GET") {
            if (result.error?.originalStatus === 500)
                toast.error("Internal Server Error");
            if (result.error?.status === 400)
                toast.error(parseDRFErrorResponse(result.error));
        }
    }
    return result;
};

const baseQueryWithRetry = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();

    try {
        let result = await baseWithErrorHandling(args, api, extraOptions);

        const isAccessTokenExpired =
            result?.error?.status === 403 &&
            result.error?.data?.detail === "access_token expired";
        const isRefreshTokenExpired =
            result?.error?.status === 403 &&
            result.error?.data?.detail === "refresh_token expired";

        if (isAccessTokenExpired) {
            const release = await mutex.acquire();

            try {
                const refreshToken = selectRefreshToken(api.getState());

                if (refreshToken) {
                    result = await refreshBaseQuery(
                        {
                            url: "/auth/refresh_token",
                            method: "POST",
                            body: { refreshToken },
                        },
                        api,
                        extraOptions
                    );

                    if (result.data) {
                        api.dispatch(
                            setCredentials({
                                accessToken: result.data.access_token,
                                refreshToken,
                            })
                        );
                        result = await baseQuery(args, api, extraOptions);
                    } else {
                        api.dispatch(logout());
                    }
                } else {
                    api.dispatch(logout());
                }
            } finally {
                release();
            }
        } else if (isRefreshTokenExpired) {
            api.dispatch(logout());
        }

        return result;
    } finally {
        mutex.release();
    }
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithRetry,
    keepUnusedDataFor: 30,
    endpoints: (builder) => ({}),
    tagTypes: [
        "User",
    ],
});
