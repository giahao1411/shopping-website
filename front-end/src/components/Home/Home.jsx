import React from 'react';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
import "../../styles/Home/Home.css";

const Home = () => {
  return (
    <div className="home-container"> {/* Thay inline style bằng class từ CSS */}
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default Home;
