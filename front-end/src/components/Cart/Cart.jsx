import React, { useState, useEffect } from "react";
import axios from "axios";
import { SESSION } from "../../libs/constant";
import "../../styles/Cart/Cart.css";
import { Link } from "react-router-dom";

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
            <div className="cart-container">
                <h2>Shopping Cart</h2>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                                <tr key={item._id}>
                                    <td>
                                        <input type="checkbox" />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>
                                        <input 
                                            type="number" 
                                            value={item.quantity} 
                                            min="1" 
                                            onChange={(e) => {
                                                // Handle quantity change logic
                                            }} 
                                        />
                                    </td>
                                    <td>${item.price}</td>
                                    <td>
                                        <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <Link to="/checkout" className="checkout-button">
                    Proceed to Checkout
                </Link>
            </div>
        </div>
    );
};

export default Cart;
