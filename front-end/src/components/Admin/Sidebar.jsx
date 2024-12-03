import React from "react";
import {
    BiHome,
    BiSolidUserRectangle,
    BiUserCircle,
    BiTask,
    BiBox,
} from "react-icons/bi";
import "../../styles/Admin/Sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="menu">
            <div className="logo">
                <BiSolidUserRectangle className="logo-icon" />
                <h2>Admin</h2>
            </div>

            <div className="menu-list">
                <NavLink
                    to="/admin"
                    end
                    className={({ isActive }) =>
                        `item ${isActive ? "admin-active" : ""}`
                    }
                >
                    <BiHome className="icon" />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/user"
                    className={({ isActive }) =>
                        `item ${isActive ? "admin-active" : ""}`
                    }
                >
                    <BiUserCircle className="icon" />
                    Users
                </NavLink>

                <NavLink
                    to="/admin/product"
                    className={({ isActive }) =>
                        `item ${isActive ? "admin-active" : ""}`
                    }
                >
                    <BiBox className="icon" />
                    Products
                </NavLink>

                <NavLink
                    to="/admin/order"
                    className={({ isActive }) =>
                        `item ${isActive ? "admin-active" : ""}`
                    }
                >
                    <BiTask className="icon" />
                    Orders
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
