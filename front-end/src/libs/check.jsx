import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SESSION } from "./constant";

const PrivateRoute = ({ allowedRoles }) => {
    const userSession = localStorage.getItem(SESSION);
    if (!userSession) {
        return <Navigate to="/account/login" />;
    }

    const userRole = JSON.parse(userSession).role;
    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
