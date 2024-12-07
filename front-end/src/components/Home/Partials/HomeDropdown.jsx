import React from "react";
import { Link } from "react-router-dom";

const HomeDropdown = ({ isOpen, storedUser, handleLogout, closeDropdown }) => {
    return (
        isOpen && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 border border-blue-500 rounded-lg shadow-lg overflow-hidden">
                <Link
                    to="/profile"
                    className="block px-6 py-3 text-white hover:bg-orange-500 whitespace-nowrap"
                    onClick={() => closeDropdown()}  // Đóng dropdown khi chọn Profile
                >
                    Profile
                </Link>
                {storedUser.email === "admin@gmail.com" ? (
                    <Link
                        to="/admin"
                        className="block px-6 py-3 text-white hover:bg-orange-500 whitespace-nowrap"
                        onClick={() => closeDropdown()}  // Đóng dropdown khi chọn Admin
                    >
                        Admin
                    </Link>
                ) : (
                    ""
                )}
                <Link
                    to="/order-history"
                    className="block px-6 py-3 text-white hover:bg-orange-500 whitespace-nowrap"
                    onClick={() => closeDropdown()}  // Đóng dropdown khi chọn Order History
                >
                    Order History
                </Link>
                <span
                    onClick={() => {
                        handleLogout();
                        closeDropdown();  // Đóng dropdown khi Log Out
                    }}
                    className="block px-6 py-3 text-white cursor-pointer hover:bg-orange-500 whitespace-nowrap"
                >
                    Log Out
                </span>
            </div>
        )
    );
};

export default HomeDropdown;
