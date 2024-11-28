import React, { useState, useEffect } from "react";
import "../../styles/Home/MainContent.css";

const MainContent = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [products, setProducts] = useState([]);

    // Lấy dữ liệu sản phẩm từ API khi component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/product/products"
                );
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilterChange = (e) => {
        setSelectedFilter(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Search: ", searchQuery, "Filter: ", selectedFilter);
    };

    return (
        <main className="main">
            <div className="banner">
                <h2>Welcome to the shop!</h2>
                <p>This page provides information about our website.</p>
            </div>

            <div className="search-container">
                <form onSubmit={handleSearchSubmit} className="search-form">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        className="search-input"
                    />

                    <select
                        value={selectedFilter}
                        onChange={handleFilterChange}
                        className="filter-select"
                    >
                        <option value="all">All Categories</option>
                        <option value="card1">T-Shirts</option>
                        <option value="card2">Pants</option>
                        <option value="card3">Backpacks</option>
                        <option value="card3">Outerwear</option>
                        <option value="card3">Wallets</option>
                    </select>

                    <button type="submit" className="search-button">
                        Search
                    </button>
                </form>
            </div>

            {/* Cards Section */}
            <div className="cards">
                {products.map((product) => (
                    <div className="card" key={product.id}>
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="card-image"
                        />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default MainContent;
