import React, { useState, useEffect } from "react";
import axios from "axios";
import { SESSION } from "../../../libs/constant";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { formatMoney, formatNumber } from "../../../libs/utilities";

const Cart = () => {
    const [cartItems, setCartItems] = useState([
        {
            _id: "1",
            name: "Product 1",
            quantity: 2,
            price: 25.99,
        },
        {
            _id: "2",
            name: "Product 2",
            quantity: 1,
            price: 45.99,
        },
        {
            _id: "3",
            name: "Product 3",
            quantity: 3,
            price: 15.49,
        },
    ]);

    const api = import.meta.env.VITE_APP_URL;

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
                    `${api}/api/cart/${storedUser._id}`,
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

        // fetchCartItems();
    }, []);

    const incrementQuantity = () => {
        // if (quantity < product.quantity) {
        //     setQuantity((prevQuantity) => prevQuantity + 1);
        // }
    };

    const decrementQuantity = () => {
        // if (quantity > 1) {
        //     setQuantity((prevQuantity) => prevQuantity - 1);
        // }
    };

    const totalPricePerItem = (quantity, price) => {
        return quantity * price;
    };

    const handleRemoveItem = async (itemId) => {
        const storedUser = JSON.parse(localStorage.getItem(SESSION));
        if (!storedUser) return;

        try {
            // Giả sử API xóa sản phẩm khỏi giỏ hàng
            await axios.delete(
                `${api}/api/cart/${storedUser._id}/item/${itemId}`,
                {
                    headers: {
                        Authorization: `Bearer ${storedUser.token}`,
                    },
                }
            );
            setCartItems(cartItems.filter((item) => item._id !== itemId)); // Cập nhật lại giỏ hàng
        } catch (err) {
            setError("Failed to remove item.");
        }
    };

    return (
        <div className="py-20 mt-10 min-h-screen">
            <div className="max-w-5xl mx-auto p-6">
                <div className="flex items-center space-x-4">
                    <FaShoppingCart className="text-4xl" />
                    <h2 className="text-2xl font-bold text-gray-800">
                        Shopping Cart
                    </h2>
                </div>
                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-600">
                        Your cart is empty.
                    </p>
                ) : (
                    <table className="w-full border-none mb-5">
                        <thead>
                            <tr className="text-gray-700">
                                <th className="py-3 px-4 text-center border-none">
                                    Select
                                </th>
                                <th className="py-3 px-4 text-center border-none">
                                    Product Name
                                </th>
                                <th className="py-3 px-4 text-center border-none">
                                    Quantity
                                </th>
                                <th className="py-3 px-4 text-center border-none">
                                    Price
                                </th>
                                <th className="py-3 px-4 text-center border-none">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={item._id || index}>
                                    <td className="py-3 px-4 text-center border-none">
                                        <input
                                            type="checkbox"
                                            className="scale-125"
                                        />
                                    </td>
                                    <td className="py-3 px-4 text-center border-none">
                                        {item.name}
                                    </td>
                                    <td className="py-3 px-4 border-none">
                                        <div className="flex items-center justify-center py-5">
                                            <button
                                                className="text-black text-2xl disabled:bg-gray-400 border border-gray-600 px-[10px] rounded-l-md"
                                                onClick={decrementQuantity}
                                            >
                                                -
                                            </button>
                                            <span className="text-1xl font-semibold border-t border-b border-gray-600 px-5 py-1">
                                                {formatNumber(item.quantity)}
                                            </span>
                                            <button
                                                className="text-black text-2xl disabled:bg-gray-400 border border-gray-600 px-2 rounded-r-md"
                                                onClick={incrementQuantity}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-center border-none">
                                        {formatMoney(
                                            totalPricePerItem(
                                                item.quantity,
                                                item.price
                                            )
                                        )}
                                    </td>
                                    <td className="py-3 px-4 text-center border-none">
                                        <button
                                            onClick={() =>
                                                handleRemoveItem(item._id)
                                            }
                                            className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className="text-right">
                    <Link
                        to="/checkout"
                        className="inline-block px-6 py-3 bg-white text-green-600 border border-green-600 text-center rounded hover:bg-green-600 hover:text-white"
                    >
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
