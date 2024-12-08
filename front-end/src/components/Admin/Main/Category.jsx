import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatNumber } from "../../../libs/utilities";
import { BiSolidChevronRight, BiSolidChevronLeft } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const api = import.meta.env.VITE_APP_URL;

    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                `${api}/api/category/categories?page=${page}&limit=8`
            );

            if (response.status === 200) {
                setCategories(response.data.categories);
                setTotalPage(response.data.totalPages);
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                console.error(error);
            }
        }
    };

    const handleBackward = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleForward = () => {
        setPage((prevPage) => (prevPage < totalPage ? prevPage + 1 : prevPage));
    };

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

    const deleteCategory = async (type) => {
        const confirmation = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (confirmation.isConfirmed) {
            try {
                const response = await axios.delete(
                    `${api}/api/category/categories/delete/${type}`
                );

                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate("/admin/category");
                }
            } catch (error) {
                if (error.response) {
                    Swal.fire({
                        icon: "error",
                        title: error.response.data.message,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    console.error("Error creating product:", error);
                }
            }
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [page]);

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-4 text-gray-700">
                Category Management
            </h1>
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Category List</h2>
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
                    to="/admin/category/create"
                    className="text-left text-blue-600 hover:text-blue-700 hover:underline"
                >
                    Add new category
                </Link>
            </div>

            <div>
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border border-gray-200 text-center">
                                Type
                            </th>
                            <th className="px-4 py-2 border border-gray-200 text-center">
                                Amount
                            </th>
                            <th className="px-4 py-2 border border-gray-200 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr
                                key={category._id || index}
                                className={
                                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                }
                            >
                                <td className="px-4 py-3 border border-gray-200 text-center">
                                    {category.type}
                                </td>
                                <td className="px-4 py-3 border border-gray-200 text-center">
                                    {formatNumber(category.amount)}
                                </td>
                                <td className="px-4 py-3 border border-gray-200">
                                    <div className="flex justify-center">
                                        <FaRegTrashAlt
                                            className="text-xl cursor-pointer hover:text-blue-500"
                                            onClick={() =>
                                                deleteCategory(category.type)
                                            }
                                        />
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

export default Category;
