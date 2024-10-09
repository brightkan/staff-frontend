import { apiSlice } from "./apiSlice.js";

export const staffSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Query for getting all staff members
        getStaff: builder.query({
            query: () => ({
                url: '/staff/retrieve',  // Assuming the endpoint for all staff is `/staff/`
                method: 'GET',
            }),
            providesTags: (result = [], error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Staff', id })), { type: 'Staff', id: 'LIST' }]
                    : [{ type: 'Staff', id: 'LIST' }],
        }),

        // Query for retrieving a specific staff member by employee number
        getStaffMember: builder.query({
            query: (employeeNumber) => ({
                url: `/staff/retrieve/${employeeNumber}/`,  // Assuming the endpoint for a single staff is `/staff/{employeeNumber}/`
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Staff', id }],
        }),

        // Mutation for editing a staff member
        editStaffMember: builder.mutation({
            query: ({ employeeNumber, data }) => ({
                url: `/staff/update/${employeeNumber}/`,  // Assuming the endpoint for updating staff is `/staff/{employeeNumber}/`
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { employeeNumber }) => [{ type: 'Staff', id: employeeNumber }],
        }),
    }),
});

export const {
    useGetStaffQuery,
    useGetStaffMemberQuery,
    useEditStaffMemberMutation,
} = staffSlice;
