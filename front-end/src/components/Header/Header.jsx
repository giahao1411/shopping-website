import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { SESSION } from "../../libs/constant";

const Header = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false); 
    const [user, setUser] = useState(null); 
    const [dropdownOpen, setDropdownOpen] = useState(false); 

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem(SESSION));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); 
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen); 
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null); 
        setDropdownOpen(false); 
    };

    const handleProfileClick = () => {
        history.push("/profile");
        setMenuOpen(false); // Đóng menu khi chuyển trang
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
                                            to="/profile"
                                            className="dropdown-item"
                                            onClick={handleProfileClick} // Thêm hàm xử lý khi click vào Profile
                                        >
                                            Profile
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
