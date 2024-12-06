import React from "react";
import "../../styles/Admin/Admin.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Admin = () => {
    return (
        <div className="flex gap-5 p-5 bg-gray-200 min-h-screen">
            <Sidebar />
            <div className="bg-white flex-1 rounded-2xl p-8 flex gap-6 justify-between">
                {/* outlet for more Children in */}
                <Outlet />
            </div>
        </div>
    );
};

export default Admin;
