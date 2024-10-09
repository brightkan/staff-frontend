import { apiSlice } from "./apiSlice";
import { logout } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body,
            }),
            invalidatesTags: ["User"],
        }),

        logout: builder.mutation({
            query: () => ({
                url: "/logout/",
                method: "POST",
            }),
            invalidatesTags: ["User"],
            onQueryStarted: (arg, { dispatch }) => {
                dispatch(logout());
            },
        }),
    }),
});

export const {
    useLoginMutation,
} = authApiSlice;
