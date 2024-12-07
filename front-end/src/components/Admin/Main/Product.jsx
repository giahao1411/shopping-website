import React, { useState } from "react";
import {
    BiSolidChevronRight,
    BiSolidChevronLeft,
    BiInfoCircle,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { formatMoney, formatNumber } from "../../../libs/utilities";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/product/products?page=${page}&limit=8`
            );

            if (response.status === 200) {
                setProducts(response.data.products);
                setTotalPage(response.data.totalPages);
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                console.error("Error fetching products", error);
            }
        }
    };

    // move backward 1 page
    const handleBackward = () => {
        // make sure not down below 1
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    // move forward 1 page
    const handleForward = () => {
        setPage((prevPage) => (prevPage < totalPage ? prevPage + 1 : prevPage));
    };

    // page input field
    const handleInputChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (value > 0 && value <= totalPage) {
            setPage(value);
        } else if (value > totalPage) {
            setPage(totalPage);
        } else {
            setPage(1);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [products, page]);

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-4 text-gray-700">
                Product Management
            </h1>
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Product List</h2>
                <div className="flex items-center space-x-2">
                    <BiSolidChevronLeft
                        className="text-xl cursor-pointer hover:text-blue-500"
                        onClick={handleBackward}
                    />
                    <input
                        type="number"
                        min="1"
                        max={totalPage}
                        value={page}
                        onChange={handleInputChange}
                        className="w-14 p-1 border border-gray-300 rounded-md text-center outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <BiSolidChevronRight
                        className="text-xl cursor-pointer hover:text-blue-500"
                        onClick={handleForward}
                    />
                </div>
            </div>

            <div className="my-5">
                <Link
                    to="/admin/product/create"
                    className="text-left text-blue-600 hover:text-blue-700 hover:underline"
                >
                    Create product
                </Link>
            </div>

            <div>
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border border-gray-200 text-center">
                                Name
                            </th>
                            <th className="px-4 py-2 border border-gray-200 text-center">
                                Category
                            </th>
                            <th className="px-4 py-2 border border-gray-200 text-center">
                                Quantity
                            </th>
                            <th className="px-4 py-2 border border-gray-200 text-center">
                                Price
                            </th>
                            <th className="px-4 py-2 border border-gray-200 text-center">
                                Detail
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr
                                key={product._id || index}
                                className={
                                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                }
                            >
                                <td className="px-4 py-3 border border-gray-200 text-center">
                                    {product.name}
                                </td>
                                <td className="px-4 py-3 border border-gray-200 text-center">
                                    {product.category}
                                </td>
                                <td className="px-4 py-3 border border-gray-200 text-center">
                                    {formatNumber(product.quantity)}
                                </td>
                                <td className="px-4 py-3 border border-gray-200 text-center">
                                    {formatMoney(product.price)}
                                </td>
                                <td className="px-4 py-3 border border-gray-200">
                                    <div className="flex justify-center">
                                        <Link
                                            to={`/admin/product/${product._id}`}
                                        >
                                            <BiInfoCircle className="text-xl cursor-pointer hover:text-blue-500" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="px-4 pt-10 text-center font-semibold text-gray-700">
                    Page {page} / {totalPage}
                </p>
            </div>
        </div>
    );
};

export default Product;
