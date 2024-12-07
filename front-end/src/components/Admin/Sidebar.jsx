import React from "react";
import {
    BiHome,
    BiUserCircle,
    BiTask,
    BiBox,
    BiCategory,
} from "react-icons/bi";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="flex flex-col gap-9 min-h-fit">
            <div className="flex justify-center gap-x-2 p-5 text-gray-800">
                <h2 className="text-3xl font-bold">Admin</h2>
            </div>

            <div className="flex flex-col gap-5 flex-grow">
                <NavLink
                    to="/admin"
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-5 text-lg font-semibold px-3 py-2 rounded-lg transition ${
                            isActive
                                ? "bg-gray-800 text-gray-200"
                                : "text-gray-800 hover:bg-gray-800 hover:text-gray-200"
                        }`
                    }
                >
                    <BiHome className="text-xl" />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/user"
                    className={({ isActive }) =>
                        `flex items-center gap-5 text-lg font-semibold px-3 py-2 rounded-lg transition ${
                            isActive
                                ? "bg-gray-800 text-gray-200"
                                : "text-gray-800 hover:bg-gray-800 hover:text-gray-200"
                        }`
                    }
                >
                    <BiUserCircle className="text-xl" />
                    Users
                </NavLink>

                <NavLink
                    to="/admin/product"
                    className={({ isActive }) =>
                        `flex items-center gap-5 text-lg font-semibold px-3 py-2 rounded-lg transition ${
                            isActive
                                ? "bg-gray-800 text-gray-200"
                                : "text-gray-800 hover:bg-gray-800 hover:text-gray-200"
                        }`
                    }
                >
                    <BiBox className="text-xl" />
                    Products
                </NavLink>

                <NavLink
                    to="/admin/order"
                    className={({ isActive }) =>
                        `flex items-center gap-5 text-lg font-semibold px-3 py-2 rounded-lg transition ${
                            isActive
                                ? "bg-gray-800 text-gray-200"
                                : "text-gray-800 hover:bg-gray-800 hover:text-gray-200"
                        }`
                    }
                >
                    <BiTask className="text-xl" />
                    Orders
                </NavLink>

                <NavLink
                    to="/admin/category"
                    className={({ isActive }) =>
                        `flex items-center gap-5 text-lg font-semibold px-3 py-2 rounded-lg transition ${
                            isActive
                                ? "bg-gray-800 text-gray-200"
                                : "text-gray-800 hover:bg-gray-800 hover:text-gray-200"
                        }`
                    }
                >
                    <BiCategory className="text-xl" />
                    Category
                </NavLink>
            </div>

            <div className="">
                <NavLink
                    to="/"
                    className="flex items-center gap-5 text-lg font-semibold px-3 py-2 rounded-lg transition text-gray-800 hover:bg-gray-800 hover:text-gray-200"
                >
                    <HiArrowUturnLeft className="text-xl" />
                    Home
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
