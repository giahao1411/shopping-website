import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Home/MainContent.css";
import { Link } from "react-router-dom";

const MainContent = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [products, setProducts] = useState([]); // Sản phẩm lấy từ API
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); // Để lưu lỗi khi gọi API

    // Gọi API để lấy sản phẩm
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await axios.get("http://localhost:8080/api/product/products");
                setProducts(response.data.products); // Lưu sản phẩm vào state
            } catch (error) {
                setError("Failed to fetch products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // Chạy 1 lần khi component được mount

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

    // Lọc các sản phẩm theo category và search query
    const filteredProducts = products.filter((product) => {
        const matchesSearchQuery = product.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedFilter === "all" || product.category === selectedFilter;
        return matchesSearchQuery && matchesCategory;
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <main className="main">
            <div className="banner">
                <h2>Welcome to the shop!</h2>
                <p>This page provides information about our website.</p>
            </div>

            <div className="search-container">
                <form onSubmit={handleSearchSubmit} className="search-form">
                    <input
                        type="text1"
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
                        <option value="Phone">Phone</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Screen">Screen</option>
                        <option value="Smart Watch">Smart Watch</option>
                        <option value="Television">Television</option>
                    </select>

                    <button type="submit" className="search-button">
                        Search
                    </button>
                </form>
            </div>

            <hr className="divider" />

            {/* Cards Section */}
            <div className="cards">
                {filteredProducts.map((product) => (
                    <Link
                        to={`/details/product/${product._id}`} // Đảm bảo truyền đúng ID của sản phẩm
                        key={product._id}
                        className="card-link"
                    >
                        <div className="card">
                            <img
                                src={product.images[0]} // Dùng URL đầy đủ của ảnh
                                alt={product.name}
                                className="card-image"
                            />
                            <h3>{product.name}</h3>
                            <p className="price">${product.price}</p>
                        </div>
                    </Link>
                ))}
            </div>

        </main>
    );
};

export default MainContent;
