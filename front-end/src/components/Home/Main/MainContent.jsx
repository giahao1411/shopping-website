import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { formatMoney } from "../../../libs/utilities";

const MainContent = () => {
    const [searchQuery, setSearchQuery] = useState(""); // Trạng thái tìm kiếm
    const [selectedFilter, setSelectedFilter] = useState("all"); // Bộ lọc danh mục
    const [products, setProducts] = useState([]); // Tất cả sản phẩm
    const [categories, setCategories] = useState([]);
    const [newProducts, setNewProducts] = useState([]); // Sản phẩm mới

    const api = import.meta.env.VITE_APP_URL; // API URL
    const navigate = useNavigate(); // Hook điều hướng

    // Lấy sản phẩm từ API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${api}/api/product/products`);
                const allProducts = response.data.products;
                setProducts(allProducts);

                // Lọc sản phẩm mới (thêm trong vòng 7 ngày)
                const newProductsList = allProducts.filter((product) => {
                    const createdAt = new Date(product.createdAt);
                    const today = new Date();
                    const diffTime = Math.abs(today - createdAt);
                    const diffDays = Math.floor(
                        diffTime / (1000 * 60 * 60 * 24)
                    ); // Tính số ngày
                    return diffDays <= 7; // Sản phẩm thêm vào trong 7 ngày qua
                });
                setNewProducts(newProductsList);
            } catch (error) {
                console.error(error);
                if (error.response) {
                    alert(error.response.data.message);
                }
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    `${api}/api/category/categories/all`
                );

                if (response.status === 200) {
                    setCategories(response.data.categories);
                }
            } catch (error) {
                console.error(error);
                if (error.response) {
                    alert(error.response.data.message);
                }
            }
        };

        fetchProducts();
        fetchCategories();
    }, []);

    // Hàm xử lý thay đổi input tìm kiếm
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Hàm xử lý thay đổi bộ lọc
    const handleFilterChange = (e) => {
        setSelectedFilter(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        navigate(
            `/searchresults?query=${searchQuery}&filter=${selectedFilter}`
        );
    };

    // Lọc sản phẩm theo tên và bộ lọc danh mục
    const filteredProducts = products.filter((product) => {
        const matchesSearchQuery = product.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedFilter === "all" || product.category === selectedFilter;
        return matchesSearchQuery && matchesCategory;
    });

    // Hàm lấy sản phẩm theo danh mục
    const getProductsByCategory = (category) => {
        return products.filter((product) => product.category === category);
    };

    // Hàm lấy top 5 sản phẩm theo danh mục
    const getTopProducts = (category) => {
        const categoryProducts = getProductsByCategory(category);
        return categoryProducts.slice(0, 5); // Lấy 5 sản phẩm đầu tiên
    };

    // Hàm lấy sản phẩm bán chạy
    const getBestSellingProducts = () => {
        const sortedBySales = [...products].sort((a, b) => b.sales - a.sales);
        return sortedBySales.slice(0, 5);
    };

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

            {/* Tìm kiếm và bộ lọc */}
            <div className="flex justify-center items-center py-8">
                {/* Tìm kiếm và bộ lọc */}
                <div className="flex justify-center items-center py-8">
                    <form
                        onSubmit={handleSearchSubmit} // Khi submit form, sẽ gọi hàm handleSearchSubmit
                        className="inline-flex items-center bg-gray-200 border border-orange-500 rounded-full max-w-full py-2 px-4 shadow-md"
                    >
                        <input
                            type="text"
                            value={searchQuery} // Trạng thái tìm kiếm
                            onChange={handleSearchChange} // Cập nhật trạng thái tìm kiếm khi người dùng nhập
                            placeholder="Search..."
                            className="border-none px-4 py-3 text-xl w-60 rounded-full focus:outline-none shadow-sm"
                        />

                        <select
                            value={selectedFilter} // Trạng thái bộ lọc
                            onChange={handleFilterChange} // Cập nhật bộ lọc khi người dùng thay đổi
                            className="ml-2 px-4 py-3 text-xl border border-orange-500 rounded-full bg-white text-gray-800"
                        >
                            <option value="all">All Categories</option>
                            {categories
                                .filter(
                                    (category) =>
                                        getProductsByCategory(category).length >
                                        0 // Lọc danh mục có sản phẩm
                                )
                                .map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                        </select>

                        <button
                            type="submit" // Khi nhấn nút này sẽ gọi handleSearchSubmit
                            className="bg-orange-500 text-white rounded-full py-3 px-6 text-xl hover:bg-orange-600 ml-2"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>

            {/* Sản phẩm mới */}
            {newProducts.length > 0 && (
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-orange-500 uppercase text-center border-b-2 border-black pb-2 mx-[250px]">
                        New Arrival
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-5 mx-[auto] max-w-7xl justify-items-center">
                        {newProducts.slice(0, 5).map((product) => {
                            return (
                                <Link
                                    to={`/details/product/${product._id}`}
                                    key={product._id}
                                    className="block"
                                >
                                    <div className="bg-white rounded-lg shadow-md px-5 pt-5 border-2 border-black text-center flex flex-col justify-start items-center hover:translate-y-[-5px] hover:shadow-lg transition-all h-[350px]">
                                        <img
                                            src={product.images[0]}
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
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Sản phẩm bán chạy */}
            {getBestSellingProducts().length > 0 && (
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-orange-500 uppercase text-center border-b-2 border-black pb-2 mx-[250px]">
                        Best Selling
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-5 mx-[auto] max-w-7xl justify-items-center">
                        {getBestSellingProducts()
                            .slice(0, 5) // Giới hạn 5 sản phẩm
                            .map((product) => {
                                return (
                                    <Link
                                        to={`/details/product/${product._id}`}
                                        key={product._id}
                                        className="block"
                                    >
                                        <div className="bg-white rounded-lg shadow-md px-5 pt-5 border-2 border-black text-center flex flex-col justify-start items-center hover:translate-y-[-5px] hover:shadow-lg transition-all h-[350px]">
                                            <img
                                                src={product.images[0]}
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
                                    </Link>
                                );
                            })}
                    </div>
                </div>
            )}

            {/* Danh mục sản phẩm */}
            {categories
                .filter(
                    (category) =>
                        getProductsByCategory(category.type).length > 0
                )
                .map((category, index) => (
                    <div key={category._id || index} className="mt-10">
                        <h2 className="text-2xl font-semibold text-orange-500 uppercase text-center border-b-2 border-black pb-2 mx-[250px]">
                            {category.type}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-5 mx-[auto] max-w-7xl justify-items-center">
                            {getTopProducts(category.type).map((product) => {
                                return (
                                    <Link
                                        to={`/details/product/${product._id}`}
                                        key={product._id}
                                        className="block"
                                    >
                                        <div className="bg-white rounded-lg shadow-md px-5 pt-5 border-2 border-black text-center flex flex-col justify-start items-center hover:translate-y-[-5px] hover:shadow-lg transition-all h-[350px]">
                                            <img
                                                src={product.images[0]}
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
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
        </main>
    );
};

export default MainContent;
