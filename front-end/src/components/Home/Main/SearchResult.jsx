import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { formatMoney } from "../../../libs/utilities";
import { Search, Filter, Star } from "lucide-react";

const ProductCard = ({ product, api }) => (
    <Link
        to={`/details/product/${product._id}`}
        className="group transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
        <div className="bg-white border-2 border-gray-300 rounded-xl shadow-md overflow-hidden">
            <div className="relative">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-70 object-cover group-hover:scale-105 transition-transform"
                />
                {product.discount > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                        {product.discount}% OFF
                    </span>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-800">
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
                                fill={index < Math.floor(product.rating) ? 'currentColor' : 'none'}
                                size={16}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </Link>
);

const SearchResult = () => {
    const { query } = useParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const api = import.meta.env.VITE_APP_URL;

    // Enhanced filter states
    const [filters, setFilters] = useState({
        priceRange: { min: 0, max: Infinity },
        selectedCategories: [],
        sortBy: 'relevance',
        searchQuery: query
    });

    const [metadata, setMetadata] = useState({
        categories: [],
        maxPrice: 0
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    

    // Fetch data and setup
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${api}/api/product/products`, {
                    params: { searchQuery: query }
                });

                const fetchedProducts = response.data.products;
                setProducts(fetchedProducts);
                
                // Populate metadata
                const uniqueCategories = [...new Set(fetchedProducts.map(p => p.category))];
                const maxProductPrice = Math.max(...fetchedProducts.map(p => p.price));
                
                setMetadata({
                    categories: uniqueCategories,
                    maxPrice: maxProductPrice
                });

                // Initial filtering
                applyFilters(fetchedProducts);
            } catch (error) {
                setError("No products found.");
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchProducts();
        }
    }, [query]);

    // Comprehensive filtering function
    const applyFilters = (sourceProducts = products) => {
        let filtered = sourceProducts.filter(product => {
            // Text search
            const matchesSearch = !filters.searchQuery || 
                product.name.toLowerCase().includes(filters.searchQuery.toLowerCase());

            // Price range
            const inPriceRange = 
                product.price >= filters.priceRange.min && 
                product.price <= filters.priceRange.max;

            // Category filter
            const matchesCategory = 
                filters.selectedCategories.length === 0 || 
                filters.selectedCategories.includes(product.category);

            return matchesSearch && inPriceRange && matchesCategory;
        });

        // Sorting logic
        switch (filters.sortBy) {
            case 'priceAsc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'priceDesc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            default:
                break;
        }

        setFilteredProducts(filtered);
    };

    // Update filters and reapply
    const updateFilters = (newFilterPart) => {
        const updatedFilters = { ...filters, ...newFilterPart };
        setFilters(updatedFilters);
        applyFilters();
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-orange-500"></div>
        </div>
    );

    if (error) return (
        <div className="text-center py-20 bg-gray-100">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">
                Oops! Something went wrong
            </h2>
            <p className="text-gray-500">{error}</p>
        </div>
    );

    return (
        <div className="container min-h-screen mt-20 mx-auto px-4 py-8">
            <div className="flex flex-col bor md:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-1/4 bg-white border shadow-lg rounded-xl p-6 h-fit sticky top-24">
                    <div className="flex items-center mb-6">
                        <Filter className="mr-2 text-gray-600" />
                        <h3 className="text-2xl font-bold text-gray-800">Filters</h3>
                    </div>

                    {/* Price Range */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-700 mb-3">Price Range</h4>
                        <input
                            type="range"
                            min="0"
                            max={metadata.maxPrice}
                            value={filters.priceRange.max}
                            onChange={(e) => updateFilters({ 
                                priceRange: { 
                                    min: 0, 
                                    max: Number(e.target.value) 
                                } 
                            })}
                            className="w-full h-2 bg-gray-300 rounded-full"
                        />
                        <div className="flex justify-between mt-2 text-sm text-gray-600">
                            <span>0</span>
                            <span>{formatMoney(filters.priceRange.max)}</span>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-700 mb-3">Categories</h4>
                        {metadata.categories.map(category => (
                            <label key={category} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    checked={filters.selectedCategories.includes(category)}
                                    onChange={() => {
                                        const currentCategories = filters.selectedCategories;
                                        const updatedCategories = currentCategories.includes(category)
                                            ? currentCategories.filter(c => c !== category)
                                            : [...currentCategories, category];
                                        
                                        updateFilters({ 
                                            selectedCategories: updatedCategories 
                                        });
                                    }}
                                    className="mr-2"
                                />
                                <span className="text-gray-600">{category}</span>
                            </label>
                        ))}
                    </div>

                    {/* Sort By */}
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-3">Sort By</h4>
                        <select
                            value={filters.sortBy}
                            onChange={(e) => updateFilters({ 
                                sortBy: e.target.value 
                            })}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="relevance">Relevance</option>
                            <option value="priceAsc">Price: Low to High</option>
                            <option value="priceDesc">Price: High to Low</option>
                            <option value="newest">Newest Arrivals</option>
                        </select>
                    </div>
                    <button
                        onClick={applyFilters}
                        className="mt-6 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Apply Filters
                    </button>
                </aside>

                {/* Product Grid */}
                <main className="w-full md:w-3/4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">
                            Search Results for "{query}"
                        </h2>
                        <p className="text-gray-600">
                            {filteredProducts.length} products found
                        </p>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 rounded-xl">
                            <Search className="mx-auto mb-4 text-gray-400" size={64} />
                            <h3 className="text-2xl font-bold text-gray-700 mb-2">
                                No Products Found
                            </h3>
                            <p className="text-gray-500">
                                Try adjusting your search or filters
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    api={api}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default SearchResult;