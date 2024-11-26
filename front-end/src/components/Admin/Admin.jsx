import React from "react";
import "../../styles/Admin/Admin.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Admin = () => {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard-content">
                {/* outlet for more Children in */}
                <Outlet />
            </div>
        </div>
    );
};

export default Admin;
