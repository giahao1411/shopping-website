import React from "react";
import "../../styles/Admin/Admin.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Profile from "./Profile/Profile";

const Admin = () => {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard-content">
                <Outlet />
                <Profile />
            </div>
        </div>
    );
};

export default Admin;
