import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation(); // Lấy thông tin đường dẫn hiện tại

  return (
    <header className="header">
      <div className="header-main">
        <div className="logo">
          <img
            src="https://cdn.haitrieu.com/wp-content/uploads/2021/09/Logo-DH-Ton-Duc-Thang-TDT.png"
            alt="Logo"
            className="logo-img"
          />
          <h1>BAANHEM</h1>
        </div>
        <nav>
          <ul>
            <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link></li>
            <li><Link to="/cart" className={location.pathname === "/cart" ? "active" : ""}>Cart</Link></li>
            <li><Link to="/sales" className={location.pathname === "/sales" ? "active" : ""}>Sales</Link></li>
            <li><Link to="/account/login" className={location.pathname === "/account/login" ? "active" : ""}>Log In</Link></li>
            <li><Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About Us</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
