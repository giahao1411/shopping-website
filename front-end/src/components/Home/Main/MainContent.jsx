import React, { useState, useEffect } from "react";
import axios from "axios";
// import "../../../styles/Home/MainContent.css";
import { Link } from "react-router-dom";
import { formatMoney } from "../../../libs/utilities";

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
                const response = await axios.get(
                    "http://localhost:8080/api/product/products"
                );
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

            <hr className="border-t-2 border-orange-500 mx-40 mb-10" />

            {/* Cards Section */}
            <div className="grid grid-cols-3 gap-6 mx-40 justify-items-center">
                {filteredProducts.map((product) => (
                    <Link
                        to={`/details/product/${product._id}`}
                        key={product._id}
                        className="block text-decoration-none"
                    >
                        <div className="bg-white rounded-lg p-4 w-full h-full text-gray-800 shadow-md border-2 border-orange-500 gap-4 transform transition-transform duration-200 hover:scale-105">
                            <div>
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-96 h-72 rounded-lg object-cover mb-4"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-center h-12 overflow-hidden text-ellipsis">
                                    {product.name}
                                </h3>
                                <p className="font-bold text-orange-500 mt-4">{`${formatMoney(
                                    product.price
                                )}`}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
};

export default MainContent;
