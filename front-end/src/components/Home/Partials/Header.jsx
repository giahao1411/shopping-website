import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SESSION } from "../../../libs/constant";

const Header = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem(SESSION));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const redirectHome = () => {
        navigate("/");
    };

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
        setMenuOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white">
            <div className="flex justify-between items-center h-16 px-5 md:px-10">
                <div
                    className="flex items-center cursor-pointer"
                    onClick={redirectHome}
                >
                    <img
                        src="https://cdn.haitrieu.com/wp-content/uploads/2021/09/Logo-DH-Ton-Duc-Thang-TDT.png"
                        alt="Logo"
                        className="w-12 h-8 mr-2"
                    />
                    <h1 className="text-lg font-bold text-orange-500 uppercase">
                        BAANHEM
                    </h1>
                </div>

                <div
                    className="block md:hidden space-y-1 cursor-pointer"
                    onClick={toggleMenu}
                >
                    <div className="w-8 h-1 bg-blue-500"></div>
                    <div className="w-8 h-1 bg-blue-500"></div>
                    <div className="w-8 h-1 bg-blue-500"></div>
                </div>

                <nav className={`${menuOpen ? "block" : "hidden"} md:flex`}>
                    <ul className="flex flex-col md:flex-row items-center md:space-x-6 space-y-3 md:space-y-0">
                        <li>
                            <Link
                                to="/"
                                className={`${location.pathname === "/"
                                    ? "text-orange-500 font-semibold"
                                    : ""
                                    } hover:text-blue-400`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/cart"
                                className={`${location.pathname === "/cart"
                                    ? "text-orange-500 font-semibold"
                                    : ""
                                    } hover:text-blue-400`}
                            >
                                Cart
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/sales"
                                className={`${location.pathname === "/sales"
                                    ? "text-orange-500 font-semibold"
                                    : ""
                                    } hover:text-blue-400`}
                            >
                                Sales
                            </Link>
                        </li>

                        {user ? (
                            <li className="relative flex items-center">
                                <span
                                    className="cursor-pointer font-semibold hover:text-blue-400"
                                    onClick={toggleDropdown}
                                >
                                    {user.username}
                                </span>
                                {dropdownOpen && (
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 border border-blue-500 rounded-lg shadow-lg overflow-hidden">
                                        <Link
                                            to="/profile"
                                            className="block px-6 py-3 text-white hover:bg-orange-500 whitespace-nowrap"
                                            onClick={handleProfileClick}
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            to="/order-history"
                                            className="block px-6 py-3 text-white hover:bg-orange-500 whitespace-nowrap"
                                            onClick={handleProfileClick}
                                        >
                                            Order History
                                        </Link>
                                        <span
                                            onClick={handleLogout}
                                            className="block px-6 py-3 text-white cursor-pointer hover:bg-orange-500 whitespace-nowrap"
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
                                    className={`${location.pathname === "/account/login"
                                        ? "text-orange-500 font-semibold"
                                        : ""
                                        } hover:text-blue-400`}
                                >
                                    Log In
                                </Link>
                            </li>
                        )}

                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;