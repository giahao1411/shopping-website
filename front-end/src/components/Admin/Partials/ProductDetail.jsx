import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ProductDetail = () => {
    const { productId } = useParams();
    console.log();

    const [categories, setCategories] = useState([]);
    const [productData, setProductData] = useState({
        name: "",
        category: "",
        description: "",
        quantity: 0,
        price: 0,
        images: null,
        existedImages: [],
    });

    const navigate = useNavigate();
    const api = import.meta.env.VITE_APP_URL;

    // categories available for selection
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

    // get product details
    const getProductDetail = async () => {
        try {
            const response = await axios.get(
                `${api}/api/product/products/${productId}`
            );

            if (response.status === 200) {
                const { name, category, description, quantity, price, images } =
                    response.data.product;

                setProductData({
                    name: name || "",
                    category: category || "",
                    description: description || "",
                    quantity: quantity || 0,
                    price: price || 0,
                    existedImages: images || [],
                });
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

    // delete single image
    const handleDeleteImage = async (imageUrl) => {
        const fileName = imageUrl.split("\\").pop().split("/").pop();

        try {
            await axios.delete(
                `${api}/api/product/products/delete/images/${productId}/${fileName}`
            );
            setProductData({
                ...productData,
                existedImages: productData.existedImages.filter(
                    (img) => img !== imageUrl
                ),
            });
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                console.error(error);
            }
        }
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
            const response = await axios.patch(
                `${api}/api/product/products/edit/${productId}`,
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
    };

    // delete product api
    const deleteProduct = async (req, res) => {
        
    };

    useEffect(() => {
        getAllCategories();
        getProductDetail();
    }, []);

    return (
        <div className="max-w-lg mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Product Details
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
                    className="w-full p-3 border border-gray-300 rounded"
                />

                {/* Category Dropdown */}
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
                    className="w-full p-3 border border-gray-300 rounded"
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

                {/* Existing Images */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Existing Images:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {productData.existedImages.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={image}
                                    alt="Product"
                                    className="w-full h-24 object-cover rounded"
                                />
                                <button
                                    type="button"
                                    className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full p-1"
                                    onClick={() => handleDeleteImage(image)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* New Images */}
                <label
                    htmlFor="images"
                    className="block text-gray-700 font-semibold mb-2"
                >
                    Upload New Images:
                </label>
                <input
                    id="images"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="w-full p-3 border border-gray-300 rounded"
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 text-white font-semibold rounded bg-blue-600 hover:bg-blue-700"
                >
                    Save Changes
                </button>
            </form>

            <button
                type="button"
                className="w-full mt-4 py-3 text-white font-semibold rounded bg-red-600 hover:bg-red-700"
            >
                Delete Product
            </button>

            <Link
                to="/admin/product"
                className="block mt-6 text-center text-blue-600 hover:underline"
            >
                Back to Product List
            </Link>
        </div>
    );
};

export default ProductDetail;
