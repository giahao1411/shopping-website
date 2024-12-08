import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { formatMoney } from "../../../libs/utilities"; // Assuming you have this utility function

const SearchResult = () => {
    const { search } = useLocation();  // Get query params from the URL
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    
    // Default values for filters
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000); // Default price range
    const [selectedRating, setSelectedRating] = useState(0);

    const api = import.meta.env.VITE_APP_URL;

    // Parse query params from URL
    const params = new URLSearchParams(search);
    const query = params.get("query") || "";  // Get the search query
    const filter = params.get("filter") || "all";  // Get the category filter

    // Fetch products based on the query and filters
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${api}/api/product/products`, {
                    params: {
                        searchQuery: query,
                        category: selectedCategory,
                        minPrice: minPrice,
                        maxPrice: maxPrice,
                        rating: selectedRating,
                    },
                });
                setProducts(response.data.products);
                setCategories(response.data.categories); // Assuming categories are returned from the API
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [query, selectedCategory, minPrice, maxPrice, selectedRating]);

    // Handle category change
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    // Handle price range change
    const handlePriceChange = (e) => {
        const [newMin, newMax] = e.target.value.split(',').map(Number);
        setMinPrice(newMin);
        setMaxPrice(newMax);
    };

    // Handle rating change
    const handleRatingChange = (e) => {
        setSelectedRating(e.target.value);
    };

    return (
        <main className="py-8 px-20 mt-20">
            <h2 className="text-3xl font-bold mb-5">Search Results</h2>

            {/* Filters Section */}
            <div className="flex space-x-4 mb-5">
                {/* Category Filter */}
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="px-4 py-2 border border-orange-500 rounded"
                >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                {/* Price Range Filter */}
                <div>
                    <input
                        type="range"
                        min={0}
                        max={1000}
                        step={10}
                        value={[minPrice, maxPrice].join(',')}  // Join the values for two-way binding
                        onChange={handlePriceChange}
                        className="w-60"
                    />
                    <span className="block mt-2">Price: ${minPrice} - ${maxPrice}</span>
                </div>

                {/* Rating Filter */}
                <select
                    value={selectedRating}
                    onChange={handleRatingChange}
                    className="px-4 py-2 border border-orange-500 rounded"
                >
                    <option value={0}>All Ratings</option>
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <option key={rating} value={rating}>
                            {rating} Stars
                        </option>
                    ))}
                </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-5">
                {products.length === 0 ? (
                    <p>No products found matching your criteria.</p>
                ) : (
                    products.map((product) => {
                        const imageUrl = `${api}/images/${product.images[0]}`;
                        return (
                            <div
                                key={product._id}
                                className="bg-white rounded-lg shadow-md px-5 pt-5 border-2 border-black text-center flex flex-col justify-start items-center hover:translate-y-[-5px] hover:shadow-lg transition-all h-[350px]"
                            >
                                <img
                                    src={imageUrl}
                                    alt={product.name}
                                    className="w-[300px] h-[200px] rounded-lg object-cover mb-4"
                                />
                                <h3 className="text-lg font-bold overflow-hidden overflow-ellipsis line-clamp-2 w-40 h-[50px]">
                                    {product.name}
                                </h3>
                                <p className="text-md font-bold text-orange-500 mt-4">
                                    {formatMoney(product.price)}
                                </p>
                            </div>
                        );
                    })
                )}
            </div>
        </main>
    );
};

export default SearchResult;
