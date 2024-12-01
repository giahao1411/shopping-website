import React, { useState } from "react";
import "../../styles/Home/MainContent.css";
import { Link } from "react-router-dom";

const MainContent = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [products] = useState([
        // Mảng sản phẩm tĩnh
        {
            id: 1,
            name: "T-Shirt",
            description:
                "Comfortable cotton t-shirt sdasdn dadasd dasdasd sada s",
            imageUrl: "https://placehold.co/400x500",
            category: "T-Shirts",
            price: "$19.99", // Thêm giá sản phẩm
        },
        {
            id: 2,
            name: "Pants",
            description: "Stylish denim pants",
            imageUrl: "https://placehold.co/400x500",
            category: "Pants",
            price: "$39.99", // Thêm giá sản phẩm
        },
        {
            id: 3,
            name: "Backpack",
            description: "Durable travel backpack",
            imageUrl: "https://placehold.co/400x500",
            category: "Backpacks",
            price: "$49.99", // Thêm giá sản phẩm
        },
        {
            id: 4,
            name: "Outerwear",
            description: "Winter jacket to keep you warm",
            imageUrl: "https://placehold.co/400x500",
            category: "Outerwear",
            price: "$59.99",
        },
        {
            id: 5,
            name: "Wallet",
            description: "Leather wallet for everyday use",
            imageUrl: "https://placehold.co/400x500",
            category: "Wallets",
            price: "$29.99", // Thêm giá sản phẩm
        },
    ]);

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
                        <option value="T-Shirts">T-Shirts</option>
                        <option value="Pants">Pants</option>
                        <option value="Backpacks">Backpacks</option>
                        <option value="Outerwear">Outerwear</option>
                        <option value="Wallets">Wallets</option>
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
                        to={`/details/product/${product.id}`}
                        key={product.id}
                        className="card-link"
                    >
                        <div className="card">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="card-image"
                            />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p className="price">{product.price}</p>{" "}
                            {/* Hiển thị giá tiền */}
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
};

export default MainContent;
