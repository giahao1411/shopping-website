import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../../styles/Home/Home.css";

const Home = () => {
    return (
        <div className="home-container">
            <Header />
            {/* Outlet to reuse the header and footer */}
            <Outlet />
            <Footer />
        </div>
    );
};

export default Home;
