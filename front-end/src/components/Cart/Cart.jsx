import React, { useState, useEffect } from "react";
import axios from "axios";
import { SESSION } from "../../libs/constant";
import "../../styles/Cart/Cart.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header"; // Import Header
import Footer from "../Footer/Footer"; // Import Footer

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            const storedUser = JSON.parse(localStorage.getItem(SESSION));
            if (!storedUser) {
                setError("You need to log in to view your cart.");
                setLoading(false);
                return;
            }

            try {
                // Giả sử API trả về danh sách sản phẩm trong giỏ hàng của người dùng
                const response = await axios.get(
                    `http://localhost:8080/api/cart/${storedUser._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${storedUser.token}`,
                        },
                    }
                );
                setCartItems(response.data.items);
            } catch (err) {
                setError("Failed to load cart items.");
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const handleRemoveItem = async (itemId) => {
        const storedUser = JSON.parse(localStorage.getItem(SESSION));
        if (!storedUser) return;

        try {
            // Giả sử API xóa sản phẩm khỏi giỏ hàng
            await axios.delete(
                `http://localhost:8080/api/cart/${storedUser._id}/item/${itemId}`,
                {
                    headers: {
                        Authorization: `Bearer ${storedUser.token}`,
                    },
                }
            );
            setCartItems(cartItems.filter(item => item._id !== itemId)); // Cập nhật lại giỏ hàng
        } catch (err) {
            setError("Failed to remove item.");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="cart-page">
            <Header /> {/* Thêm Header ở đầu trang */}
            <div className="cart-container">
                <h2>Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul>
                        {cartItems.map(item => (
                            <li key={item._id} className="cart-item">
                                <div className="item-details">
                                    <img src={item.imageUrl} alt={item.name} />
                                    <div>
                                        <h4>{item.name}</h4>
                                        <p>Price: ${item.price}</p>
                                        <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                <Link to="/checkout" className="checkout-button">
                    Proceed to Checkout
                </Link>
            </div>
            <Footer /> {/* Thêm Footer ở cuối trang */}
        </div>
    );
};

export default Cart;
