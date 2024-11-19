import React from "react";
import "../../styles/Admin/Admin.css";
import Sidebar from "./Sidebar";
import Content from "./Content/Content";
import Profile from "./Profile/Profile";

const Admin = () => {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard-content">
                <Content />
                <Profile />
            </div>
        </div>
    );
};

export default Admin;
