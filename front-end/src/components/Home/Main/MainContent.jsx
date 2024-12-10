import axios from "axios";
import { Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatMoney } from "../../../libs/utilities";
import { toast, ToastContainer } from 'react-toastify';  // Import Toastify
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify styles

const ProductCard = ({ product }) => (
    <Link
        to={`/details/product/${product._id}`}
        className="group transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
        <div className="bg-white border-2 border-gray-500 rounded-xl shadow-md overflow-hidden w-50">
            <div className="relative">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform"
                />
                {product && product.discount > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                        {product.discount}% OFF
                    </span>
                )}
            </div>
            <div className="p-4">
                <h3 className=" w-full h-14 break-word font-bold text-lg mb-2 line-clamp-2 text-gray-800">
                    {product.name}
                </h3>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-orange-500 font-bold">
                            {formatMoney(product.price)}
                        </p>
                        {product.originalPrice && (
                            <p className="text-gray-400 line-through text-sm">
                                {formatMoney(product.originalPrice)}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center text-yellow-500">
                        {[...Array(5)].map((_, index) => (
                            <Star
                                key={index}
                                fill={index < Math.floor(product.rating) ? "currentColor" : "none"}
                                size={16}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </Link>
);

const MainContent = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const api = import.meta.env.VITE_APP_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsResponse, categoriesResponse] = await Promise.all([
                    axios.get(`${api}/api/product/products`),
                    axios.get(`${api}/api/category/categories/all`),
                ]);

                setProducts(productsResponse.data.products);
                setCategories(categoriesResponse.data.categories);
            } catch (error) {
                console.error("Data fetching error:", error);
            }
        };

        fetchData();
    }, []);

    const filteredProducts = useMemo(() => {
        let filtered = products;

        if (selectedFilter !== "all") {
            filtered = filtered.filter(
                (product) => product.category === selectedFilter
            );
        }

        if (searchQuery) {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    }, [products, selectedFilter, searchQuery]);

    const bestSellingProducts = useMemo(
        () => [...products].sort((a, b) => b.sales - a.sales).slice(0, 5),
        [products]
    );

    const newArrivals = useMemo(() => {
        const today = new Date();
        return products.filter((product) => {
            const createdAt = new Date(product.createdAt);
            const diffDays = Math.floor(
                Math.abs(today - createdAt) / (1000 * 60 * 60 * 24)
            );
            return diffDays <= 7;
        });
    }, [products]);

    const handleCategoryFilter = (category) => {
        setSelectedFilter(category);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            // Show a toast message when search query is empty
            toast.error("Please enter a search keyword.");
            return; // Prevent form submission
        }
        // Navigate to search results page if there's a valid search query
        navigate(`/search-results/${encodeURIComponent(searchQuery.trim())}`);
    };

    const renderProductGrid = (productsToRender) => (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-5 mx-auto max-w-7xl">
            {productsToRender.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );

    return (
        <main className="py-8 px-20 mt-20">
            {/* Banner Section */}
            <div className="relative bg-cover bg-center bg-no-repeat h-[450px] rounded-xl shadow-lg p-8 flex flex-col justify-center items-center bg-[url('../../../Banner1.jpg')] backdrop-blur-lg text-white">
                <h2 className="text-6xl font-bold text-orange-400 text-shadow-md">
                    Welcome to the world of technology!
                </h2>
                <p className="text-2xl mt-5 text-shadow-md">
                    Never Stop Innovation, Never Stop Progress
                </p>
            </div>

            {/* Search Bar */}
            <form
                onSubmit={handleSearch}
                className="flex justify-center items-center py-4"
            >
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-6 py-3 text-xl rounded-full border-2 border-gray-300 w-80"
                />
                <button
                    type="submit"
                    className="ml-4 px-6 py-3 bg-orange-500 text-white rounded-full text-xl font-semibold hover:bg-orange-600 transition"
                >
                    Search
                </button>
            </form>

            {/* Category Filters and Product Sections */}
            <div className="flex justify-center items-center py-4 gap-6">
                <button
                    onClick={() => handleCategoryFilter("all")}
                    className={`px-6 py-3 text-xl font-semibold rounded-full ${
                        selectedFilter === "all"
                            ? "bg-orange-500 text-white"
                            : "bg-gray-200 text-gray-800"
                    }`}
                >
                    All Categories
                </button>

                {categories.map((category) => (
                    <button
                        key={category._id}
                        onClick={() => handleCategoryFilter(category.type)}
                        className={`px-6 py-3 text-xl font-semibold rounded-full ${
                            selectedFilter === category.type
                                ? "bg-orange-500 text-white"
                                : "bg-gray-200 text-gray-800"
                        }`}
                    >
                        {category.type}
                    </button>
                ))}
            </div>

            {/* Existing product sections */}
            {selectedFilter === "all" ? (
                <>
                    {/* New Arrivals */}
                    {/* <div className="mt-10">
                        <h2 className="text-2xl font-semibold text-orange-500 uppercase text-center border-b-2 border-black pb-2 mx-[250px]">
                            New Arrival
                        </h2>
                        {renderProductGrid(newArrivals.slice(0, 5))}
                    </div> */}

                    {/* Best Selling */}
                    <div className="mt-10">
                        <h2 className="text-2xl font-semibold text-orange-500 uppercase text-center border-b-2 border-black pb-2 mx-[250px]">
                            Best Selling
                        </h2>
                        {renderProductGrid(bestSellingProducts)}
                    </div>

                    {categories.map((category) => (
                        <div key={category._id} className="mt-10">
                            <h2 className="text-2xl font-semibold text-orange-500 uppercase text-center border-b-2 border-black pb-2 mx-[250px]">
                                {category.type}
                            </h2>
                            {renderProductGrid(
                                products.filter(
                                    (product) => product.category === category.type
                                )
                            )}
                        </div>
                    ))}
                </>
            ) : (
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-orange-500 uppercase text-center border-b-2 border-black pb-2 mx-[250px]">
                        {selectedFilter} Products
                    </h2>
                    {renderProductGrid(filteredProducts)}
                </div>
            )}

            {/* Toast Container for error messages */}
            <ToastContainer />
        </main>
    );
};

export default MainContent;
