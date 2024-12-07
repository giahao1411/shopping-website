import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const CreateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [productData, setProductData] = useState({
        name: "",
        category: "",
        description: "",
        quantity: 0,
        price: 0,
        images: null,
    });

    const navigate = useNavigate();
    const api = import.meta.env.VITE_APP_URL;

    // Categories available for selection
    const getAllCategories = async () => {
        try {
            const response = await axios.get(
                `${api}/api/category/categories/all`
            );

            if (response.status === 200) {
                setCategories(response.data.categories);
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                console.error(error);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setProductData({
            ...productData,
            images: e.target.files,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", productData.name);
        formData.append("category", productData.category);
        formData.append("description", productData.description);
        formData.append("quantity", productData.quantity);
        formData.append("price", productData.price);

        if (productData.images) {
            for (let i = 0; i < productData.images.length; i++) {
                formData.append("images", productData.images[i]);
            }
        }

        try {
            const response = await axios.post(
                `${api}/api/product/products`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/admin/product");
            }
        } catch (error) {
            if (error.response) {
                alert("Failed to create product.");
            } else {
                console.error("Error creating product:", error);
            }
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <div className="max-w-lg mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Create New Product
            </h1>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <label
                    htmlFor="name"
                    className="block text-gray-700 font-semibold mb-2"
                >
                    Name:
                </label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                />

                <label
                    htmlFor="category"
                    className="block text-gray-700 font-semibold mb-2"
                >
                    Category:
                </label>
                <select
                    id="category"
                    name="category"
                    value={productData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                >
                    <option value="">Select Category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category.type}>
                            {category.type}
                        </option>
                    ))}
                </select>

                <label
                    htmlFor="description"
                    className="block text-gray-700 font-semibold mb-2"
                >
                    Description:
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={productData.description}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                ></textarea>

                <label
                    htmlFor="quantity"
                    className="block text-gray-700 font-semibold mb-2"
                >
                    Quantity:
                </label>
                <input
                    id="quantity"
                    type="number"
                    name="quantity"
                    value={productData.quantity}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                />

                <label
                    htmlFor="price"
                    className="block text-gray-700 font-semibold mb-2"
                >
                    Price:
                </label>
                <input
                    id="price"
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                />

                <label
                    htmlFor="images"
                    className="block text-gray-700 font-semibold mb-2"
                >
                    Images:
                </label>
                <input
                    id="images"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                />

                <button
                    type="submit"
                    className="w-full py-3 text-white font-semibold rounded bg-blue-600 hover:bg-blue-700"
                >
                    Create Product
                </button>
            </form>

            <Link
                to="/admin/product"
                className="block mt-6 text-center text-blue-600 hover:underline"
            >
                Back to Product List
            </Link>
        </div>
    );
};

export default CreateProduct;
