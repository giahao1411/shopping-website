import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/product/products/${productId}`
                );
                if (response.status === 200) {
                    setProduct(response.data.product); // Lưu dữ liệu sản phẩm vào state
                }
            } catch (error) {
                if (error.response) {
                    alert("Failed to get product");
                } else {
                    console.error(error);
                }
            }
        };

        fetchProductDetails();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    // Hàm xử lý thêm vào giỏ hàng
    const handleAddToCart = () => {
        alert("Product added to cart!");
        // Logic thêm sản phẩm vào giỏ hàng
    };

    // Hàm xử lý mua ngay
    const handleBuyNow = () => {
        alert("Proceeding to checkout...");
        // Logic chuyển hướng đến trang thanh toán
        navigate("/checkout"); // Chuyển hướng đến trang checkout (nếu có)
    };

    return (
        <div className="product-detail">
            <div className="product-image">
                <img
                    src={`http://localhost:8080/${product.images[0]}`} // Lấy ảnh sản phẩm từ server
                    alt={product.name}
                />
            </div>
            <div className="product-info">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p className="price">${product.price}</p>
                <div className="action-buttons">
                    <button className="add-to-cart" onClick={handleAddToCart}>
                        Add to cart
                    </button>
                    <button className="buy-now" onClick={handleBuyNow}>
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
