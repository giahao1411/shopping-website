import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/Home/MainContent.css";
import { Link } from "react-router-dom";

const MainContent = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [products, setProducts] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [newProducts, setNewProducts] = useState([]); 

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await axios.get(
                    "http://localhost:8080/api/product/products"
                );
                const allProducts = response.data.products;
                setProducts(allProducts); 

                // Filter new products (added in the last 7 days)
                const newProductsList = allProducts.filter(product => {
                    const createdAt = new Date(product.createdAt);
                    const today = new Date();
                    const diffTime = Math.abs(today - createdAt);
                    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
                    return diffDays <= 7; // Products added within 7 days are "new"
                });
                setNewProducts(newProductsList); // Set new products
            } catch (error) {
                setError("Failed to fetch products.");
            } finally {
                setLoading(false);
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

    // Filter products by search query and category
    const filteredProducts = products.filter((product) => {
        const matchesSearchQuery = product.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedFilter === "all" || product.category === selectedFilter;
        return matchesSearchQuery && matchesCategory;
    });

    const getTopProducts = (category) => {
        const categoryProducts = products.filter(product => product.category === category);
        return categoryProducts.slice(0, 5); // Return first 5 products as representative
    };

    // Get the top 5 best selling products
    const getBestSellingProducts = () => {
        const sortedBySales = [...products].sort((a, b) => b.sales - a.sales);
        return sortedBySales.slice(0, 5);
    };

    // Get the top 5 most viewed products
    const getMostViewedProducts = () => {
        const sortedByViews = [...products].sort((a, b) => b.views - a.views);
        return sortedByViews.slice(0, 5);
    };

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

            {/* <hr className="divider" /> */}

            {/* New Products Section */}
            {newProducts.length > 0 && (
                <div className="category-section">
                    <h2 className="category-title">New Products</h2>
                    <div className="cards">
                        {newProducts.slice(0, 5).map((product) => (
                            <Link
                                to={`/details/product/${product._id}`}
                                key={product._id}
                                className="card-link"
                            >
                                <div className="card">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="card-image"
                                    />
                                    <h3>{product.name}</h3>
                                    <p className="price">${product.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

<div className="category-section">
                <h2 className="category-title">Best Selling</h2>
                <div className="cards">
                    {getBestSellingProducts().map((product) => (
                        <Link
                            to={`/details/product/${product._id}`}
                            key={product._id}
                            className="card-link"
                        >
                            <div className="card">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="card-image"
                                />
                                <h3>{product.name}</h3>
                                <p className="price">${product.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Most Viewed Products */}
            <div className="category-section">
                <h2 className="category-title">Most Viewed</h2>
                <div className="cards">
                    {getMostViewedProducts().map((product) => (
                        <Link
                            to={`/details/product/${product._id}`}
                            key={product._id}
                            className="card-link"
                        >
                            <div className="card">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="card-image"
                                />
                                <h3>{product.name}</h3>
                                <p className="price">${product.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Category Sections */}
            {["Phone", "Laptop", "Television", "Smart Watch", "Screen"].map((category) => (
                <div key={category} className="category-section">
                    <h2 className="category-title">{category}</h2>
                    <div className="cards">
                        {getTopProducts(category).map((product) => (
                            <Link
                                to={`/details/product/${product._id}`}
                                key={product._id}
                                className="card-link"
                            >
                                <div className="card">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="card-image"
                                    />
                                    <h3>{product.name}</h3>
                                    <p className="price">${product.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}

            {/* Best Selling Products */}
            

        </main>
    );
};

export default MainContent;
