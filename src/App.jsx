import './App.css'
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthLayout from "./components/AuthLayout.jsx";
import LoginPage from "./LoginPage.jsx";
import ProtectedLayout from "./components/ProtectedLayout.jsx";
import HomePage from "./HomePage.jsx";
import Logout from "./Logout.jsx";
import StaffManagementPage from "./StaffManagementPage.jsx";
import RegisterStaffPage from "./RegisterStaffPage.jsx";
import UpdateStaffMemberPage from "./UpdateStaffMemberPage.jsx";
import ProfilePage from "./ProfilePage.jsx";



function App() {
    const routes = [
        {
            path: "/auth/",
            element: <AuthLayout />,
            children: [
                { path: "login", element: <LoginPage /> },
            ],
        },
        {
            path: "/",
            element: <ProtectedLayout />,
            children: [
                { path: "", element: <Navigate to="/home" /> },
                { path: "home", element: <HomePage /> },
                { path: "staff_management", element: <StaffManagementPage /> },
                {path: "register_staff", element: <RegisterStaffPage/>},
                {path: "update_staff_member/:id", element: <UpdateStaffMemberPage/>},
                {path: "profile/:id", element: <ProfilePage/>},
                { path: "/auth/logout", element: <Logout /> },

            ],
        },
        ]
    const router = createBrowserRouter(routes);


    return (
        <>
            <Toaster
                position="top-right"
                containerStyle={{
                    zIndex: 999999,
                }}
                toastOptions={{
                    style: {
                        fontSize: "14px",
                        width: "300px",
                    },
                }}
            />
            <RouterProvider router={router} />
        </>
    )
}

export default App
