import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../../../styles/Admin/CreateProduct.css";

const CreateProduct = () => {
    const [productData, setProductData] = useState({
        name: "",
        category: "",
        description: "",
        quantity: 0,
        price: 0,
        images: null,
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
        setLoading(true);

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
                "http://localhost:8080/api/product/products",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                alert(response.data.message);

                navigate("/admin/product");
            }
        } catch (error) {
            if (error.response) {
                alert("Failed to create product.");
            } else {
                console.error("Error creating product:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-product-container">
            <h1>Create New Product</h1>

            <form className="create-product-form" onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    required
                />

                <label>Category:</label>
                <input
                    type="text"
                    name="category"
                    value={productData.category}
                    onChange={handleInputChange}
                    required
                />

                <label>Description:</label>
                <textarea
                    name="description"
                    value={productData.description}
                    onChange={handleInputChange}
                ></textarea>

                <label>Quantity:</label>
                <input
                    type="number"
                    name="quantity"
                    value={productData.quantity}
                    onChange={handleInputChange}
                    required
                />

                <label>Price:</label>
                <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                    required
                />

                <label>Images:</label>
                <input type="file" multiple onChange={handleFileChange} />

                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Product"}
                </button>
            </form>

            <Link to="/admin/product" className="create-product-link">
                Back to Product List
            </Link>
        </div>
    );
};

export default CreateProduct;
