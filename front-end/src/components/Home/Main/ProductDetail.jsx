import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCartPlus } from "react-icons/fa";
import "../../../styles/Home/ProductDetail.css";

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/product/products/${productId}`
                );
                if (response.status === 200) {
                    console.log(
                        "Product quantity:",
                        response.data.product.quantity
                    );
                    setProduct(response.data.product);
                    setQuantity(1);
                }
            } catch (error) {
                if (error.response) {
                    alert("Failed to get product");
                } else {
                    console.error(error);
                }
            }
        };

        // Scroll to top whenever the page is visited or the productId changes
        window.scrollTo(0, 0);

        fetchProductDetails();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = () => {
        alert(`Added ${quantity} ${product.name}(s) to the cart!`);
    };

    const handleBuyNow = () => {
        alert("Proceeding to checkout...");
        navigate("/checkout");
    };

    const incrementQuantity = () => {
        if (quantity < product.quantity) {
            setQuantity((prevQuantity) => prevQuantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    return (
        <div className="product-detail">
            <div className="product-content">
                <div className="product-image">
                    <div className="product-name">{product.name}</div>
                    <img src={product.images[0]} alt={product.name} />
                </div>
                <div className="product-info">
                    <h2>Product Information</h2>
                    <hr className="divider" />
                    <p>
                        <strong>Category:</strong> {product.category}
                    </p>
                    <p>
                        <strong>Description:</strong> {product.description}
                    </p>
                    <p>
                        <strong>Price:</strong> ${product.price}
                    </p>
                    <p>
                        <strong>Most Sold: </strong>{" "}
                        {product.most_sale || "Not Available"}
                    </p>

                    <div className="quantity-controls">
                        <button
                            className="decrement"
                            onClick={decrementQuantity}
                        >
                            -
                        </button>
                        <span className="quantity">{quantity}</span>
                        <button
                            className="increment"
                            onClick={incrementQuantity}
                        >
                            +
                        </button>
                    </div>

                    <div className="action-buttons">
                        <button
                            className="add-to-cart"
                            onClick={handleAddToCart}
                        >
                            <span className="flex items-center">
                                <FaCartPlus className="mr-2" /> Add to Cart
                            </span>
                        </button>
                        <button className="buy-now" onClick={handleBuyNow}>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
