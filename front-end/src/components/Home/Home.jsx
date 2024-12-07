import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Partials/Header";
import Footer from "./Partials/Footer";

const Home = () => {
    return (
        <div className="min-h-screen">
            <Header />
            {/* Outlet to reuse the header and footer */}
            <Outlet />
            <Footer />
        </div>
    );
};

export default Home;
