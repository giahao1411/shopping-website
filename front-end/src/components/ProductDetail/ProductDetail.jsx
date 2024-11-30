import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
    const { productId } = useParams(); // Lấy productId từ URL params
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Giả sử bạn đang gọi API để lấy chi tiết sản phẩm
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/products/${productId}`
                );
                if (response.status === 200) {
                    setProduct(response.data.product);
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

    return (
        <div className="product-detail">
            <div className="product-image">
                <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="product-info">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p className="price">{product.price}</p>
                <button className="add-to-cart">Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductDetail;
