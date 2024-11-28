import React from "react";
import Header from "../Header/Header";
import MainContent from "./MainContent";
import Footer from "../Footer/Footer";
import "../../styles/Home/Home.css";

const Home = () => {
    return (
        <div className="home-container">
            <Header />
            <MainContent />
            <Footer />
        </div>
    );
};

export default Home;
