import React, { useState, useEffect } from "react";
import axios from "axios";
// import "../../../styles/Home/MainContent.css";
import { Link } from "react-router-dom";
import { formatMoney } from "../../../libs/utilities";

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
                const newProductsList = allProducts.filter((product) => {
                    const createdAt = new Date(product.createdAt);
                    const today = new Date();
                    const diffTime = Math.abs(today - createdAt);
                    const diffDays = Math.floor(
                        diffTime / (1000 * 60 * 60 * 24)
                    ); // Convert milliseconds to days
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
        const categoryProducts = products.filter(
            (product) => product.category === category
        );
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
        <main className="py-8 px-20 mt-20">
            <div className="relative bg-cover bg-center bg-no-repeat h-[450px] rounded-xl shadow-lg p-8 flex flex-col justify-center items-center bg-[url('../../../Banner1.jpg')] backdrop-blur-lg text-white">
                <h2 className="text-6xl font-bold text-orange-400 text-shadow-md">
                    Welcome to the shop!
                </h2>
                <p className="text-2xl mt-5 text-shadow-md">
                    This page provides information about our website.
                </p>
            </div>

            <div className="flex justify-center items-center py-8">
                <form
                    onSubmit={handleSearchSubmit}
                    className="inline-flex items-center bg-gray-200 border border-orange-500 rounded-full max-w-full py-2 px-4 shadow-md"
                >
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        className="border-none px-4 py-3 text-xl w-60 rounded-full focus:outline-none shadow-sm"
                    />

                    <select
                        value={selectedFilter}
                        onChange={handleFilterChange}
                        className="ml-2 px-4 py-3 text-xl border border-orange-500 rounded-full bg-white text-gray-800"
                    >
                        <option value="all">All Categories</option>
                        <option value="Phone">Phone</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Screen">Screen</option>
                        <option value="Smart Watch">Smart Watch</option>
                        <option value="Television">Television</option>
                    </select>

                    <button
                        type="submit"
                        className="bg-orange-500 text-white rounded-full py-3 px-6 text-xl hover:bg-orange-600 ml-2"
                    >
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
            {["Phone", "Laptop", "Television", "Smart Watch", "Screen"].map(
                (category) => (
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
                                        <p className="price">
                                            ${product.price}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )
            )}

            {/* Best Selling Products */}
        </main>
    );
};

export default MainContent;
