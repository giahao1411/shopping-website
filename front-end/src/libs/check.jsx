import React from "react";
import { Navigate } from "react-router-dom";
import { SESSION } from "./constant"; // Đảm bảo SESSION được định nghĩa chính xác

const PrivateRoute = ({ allowedRoles, children }) => {
    const userSession = localStorage.getItem(SESSION);

    if (!userSession) {
        // Nếu không có session, chuyển hướng tới trang đăng nhập
        return <Navigate to="/account/login" />;
    }

    const userRole = JSON.parse(userSession).role;

    if (!allowedRoles.includes(userRole)) {
        // Nếu vai trò không phù hợp, chuyển hướng tới trang không được phép
        return <Navigate to="/unauthorized" />;
    }

    // Nếu tất cả các điều kiện đều ổn, render children
    return children;
};

export default PrivateRoute;
