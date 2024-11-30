import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { SESSION } from "../../libs/constant";

const Header = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false); // Menu hamburger
    const [user, setUser] = useState(null); // Lưu thông tin người dùng
    const [dropdownOpen, setDropdownOpen] = useState(false); // Trạng thái của menu dropdown

    useEffect(() => {
        // Lấy thông tin người dùng từ localStorage
        const storedUser = JSON.parse(localStorage.getItem(SESSION));
        if (storedUser) {
            setUser(storedUser); // Lưu thông tin người dùng vào state
        }
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Điều khiển menu hamburger
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen); // Điều khiển menu dropdown
    };

    const handleLogout = () => {
        // Xóa thông tin người dùng khi đăng xuất
        localStorage.removeItem("user");
        setUser(null); // Xóa state người dùng
        setDropdownOpen(false); // Đóng dropdown khi đăng xuất
    };

    return (
        <header className={`header ${menuOpen ? "nav-open" : ""}`}>
            <div className="header-main">
                <div className="logo">
                    <img
                        src="https://cdn.haitrieu.com/wp-content/uploads/2021/09/Logo-DH-Ton-Duc-Thang-TDT.png"
                        alt="Logo"
                        className="logo-img"
                    />
                    <h1>BAANHEM</h1>
                </div>

                <div className="hamburger-menu" onClick={toggleMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <nav>
                    <ul>
                        <li>
                            <Link
                                to="/"
                                className={
                                    location.pathname === "/" ? "active" : ""
                                }
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/cart"
                                className={
                                    location.pathname === "/cart"
                                        ? "active"
                                        : ""
                                }
                            >
                                Cart
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/sales"
                                className={
                                    location.pathname === "/sales"
                                        ? "active"
                                        : ""
                                }
                            >
                                Sales
                            </Link>
                        </li>

                        {/* Hiển thị tên người dùng hoặc "Log In" */}
                        {user ? (
                            <li className="user-menu">
                                <span
                                    className="username"
                                    onClick={toggleDropdown}
                                >
                                    {user.username}
                                </span>
                                {dropdownOpen && (
                                    <div className="dropdown-menu">
                                        <Link
                                            to="/account"
                                            className="dropdown-item"
                                        >
                                            Account
                                        </Link>
                                        <span
                                            onClick={handleLogout}
                                            className="dropdown-item logout"
                                        >
                                            Log Out
                                        </span>
                                    </div>
                                )}
                            </li>
                        ) : (
                            <li>
                                <Link
                                    to="/account/login"
                                    className={
                                        location.pathname === "/account/login"
                                            ? "active"
                                            : ""
                                    }
                                >
                                    Log In
                                </Link>
                            </li>
                        )}

                        <li>
                            <Link
                                to="/about"
                                className={
                                    location.pathname === "/about"
                                        ? "active"
                                        : ""
                                }
                            >
                                About Us
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
