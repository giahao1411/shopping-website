import React from "react";
import {
    BiHome,
    BiSolidUserRectangle,
    BiUserCircle,
    BiTask,
    BiBox,
} from "react-icons/bi";
import "../../styles/Admin/Sidebar.css";

const Sidebar = () => {
    return (
        <div className="menu">
            <div className="logo">
                <BiSolidUserRectangle className="logo-icon" />
                <h2>Admin</h2>
            </div>

            <div className="menu-list">
                <a href="#" className="item active">
                    <BiHome className="icon" />
                    Dashboard
                </a>

                <a href="#" className="item">
                    <BiUserCircle className="icon" />
                    Users
                </a>

                <a href="#" className="item">
                    <BiBox className="icon" />
                    Products
                </a>

                <a href="#" className="item">
                    <BiTask className="icon" />
                    Orders
                </a>
            </div>
        </div>
    );
};

export default Sidebar;
