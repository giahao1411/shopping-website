import React, { useState } from "react";
import "../../styles/Home/MainContent.css";

const MainContent = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State để lưu giá trị tìm kiếm
  const [selectedFilter, setSelectedFilter] = useState("all"); // State để lưu giá trị filter

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Xử lý tìm kiếm, ví dụ như in ra console (hoặc tìm kiếm trong dữ liệu)
    console.log("Tìm kiếm: ", searchQuery, "Với bộ lọc: ", selectedFilter);
  };

  return (
    <main className="main">
      {/* Banner */}
      <div className="banner">
        <h2>Chào mừng đến với trang chủ!</h2>
        <p>Trang này cung cấp thông tin về website của chúng tôi.</p>
      </div>

      {/* Form tìm kiếm với Filter */}
      <div className="search-container">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Tìm kiếm..."
            className="search-input"
          />

          {/* Dropdown filter */}
          <select
            value={selectedFilter}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="all">Tất cả</option>
            <option value="card1">Card 1</option>
            <option value="card2">Card 2</option>
            <option value="card3">Card 3</option>
          </select>

          <button type="submit" className="search-button">Tìm kiếm</button>
        </form>
      </div>

      {/* Cards Section */}
      <div className="cards">
        <div className="card">
          <h3>Card 1</h3>
          <p>Thông tin về card 1.</p>
        </div>
        <div className="card">
          <h3>Card 2</h3>
          <p>Thông tin về card 2.</p>
        </div>
        <div className="card">
          <h3>Card 3</h3>
          <p>Thông tin về card 3.</p>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
