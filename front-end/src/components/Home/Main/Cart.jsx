import React, { useState, useEffect } from "react";
import axios from "axios";
import { SESSION } from "../../../libs/constant";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { FaShoppingCart } from "react-icons/fa";
import { formatMoney, formatNumber } from "../../../libs/utilities";
import Swal from "sweetalert2";

const Cart = () => {
    const storedUser = JSON.parse(localStorage.getItem(SESSION));
    const [isRedirecting, setIsRedirecting] = useState(false); // Trạng thái để kiểm tra xem popup đã được xử lý hay chưa

    const navigate = useNavigate(); // Khởi tạo navigate

    // Kiểm tra xem người dùng có đăng nhập hay không
    useEffect(() => {
        if (!storedUser && !isRedirecting) {
            Swal.fire({
                title: "You need to login to view the cart",
                text: "Do you want to log in?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login",
                cancelButtonText: "No, stay on Home",
            }).then((result) => {
                if (result.isConfirmed) {
                    setIsRedirecting(true); // Đặt trạng thái redirect thành true để chuyển trang sau
                    navigate("/account/login"); // Chuyển hướng đến trang login bằng useNavigate
                } else {
                    setIsRedirecting(true); // Cập nhật trạng thái khi người dùng chọn "No"
                    navigate("/"); // Quay về trang home bằng useNavigate
                }
            });
        }
    }, [storedUser, isRedirecting, navigate]); // Đảm bảo useEffect chỉ chạy khi storedUser thay đổi hoặc trạng thái redirect thay đổi

    const [cartItems, setCartItems] = useState([]);
    const api = import.meta.env.VITE_APP_URL;

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(
                    `${api}/api/cart/carts/${storedUser.userId}`
                );

                if (response.status === 200) {
                    const carts = response.data.carts;
                    setCartItems(carts.items);
                }
            } catch (error) {
                if (error.response) {
                    alert("Failed to get cart items");
                } else {
                    console.error(error);
                }
            }
        };

        fetchCartItems();
    }, [cartItems]);

    const toggleCheckout = async (productId, isChecked) => {
        try {
            const newStatus = isChecked ? "checkout" : "inCart";
            const response = await axios.patch(
                `${api}/api/cart/carts/${storedUser.userId}/update-status/${productId}`,
                { newStatus }
            );

            console.log(response.data.message);

            if (response.status === 200) {
                setCartItems((prevItems) =>
                    prevItems.map((item) =>
                        item.productId._id === productId
                            ? { ...item, isCheckout: newStatus }
                            : item
                    )
                );
            }
        } catch (error) {
            if (error.response) {
                alert("Failed to get cart items");
            } else {
                console.error(error);
            }
        }
    };

    const updateQuantity = async (productId, newQuantity) => {
        try {
            const response = await axios.patch(
                `${api}/api/cart/carts/${storedUser.userId}/update/${productId}`,
                { newQuantity }
            );

            if (response.status === 200) {
                setCartItems((prevItems) =>
                    prevItems.map((item) =>
                        item.productId === productId
                            ? { ...item, quantity: newQuantity }
                            : item
                    )
                );
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                console.error(error);
            }
        }
    };

    const removeItem = async (productId) => {
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
                    `${api}/api/cart/carts/${storedUser.userId}/delete/${productId}`
                );

                if (response.status === 200) {
                    setCartItems((prevItems) =>
                        prevItems.filter((item) => item.productId !== productId)
                    );
                }
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    console.error(error);
                }
            }
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
                    <p className="text-center text-xl text-gray-600">
                        Your cart is empty.
                    </p>
                ) : (
                    <>
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
                                                checked={
                                                    item.isCheckout ===
                                                    "checkout"
                                                }
                                                onChange={(e) => {
                                                    toggleCheckout(
                                                        item.productId._id,
                                                        e.target.checked
                                                    );
                                                }}
                                            />
                                        </td>
                                        <td className="py-3 px-4 text-center border-none">
                                            {item.productId.name}
                                        </td>
                                        <td className="py-3 px-4 border-none">
                                            <div className="flex items-center justify-center py-5">
                                                <button
                                                    className="text-black text-2xl disabled:bg-gray-400 border border-gray-600 px-[10px] rounded-l-md"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.productId._id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                    disabled={
                                                        item.quantity <= 1
                                                    }
                                                >
                                                    -
                                                </button>
                                                <span className="text-1xl font-semibold border-t border-b border-gray-600 px-5 py-1">
                                                    {formatNumber(
                                                        item.quantity
                                                    )}
                                                </span>
                                                <button
                                                    className="text-black text-2xl disabled:bg-gray-400 border border-gray-600 px-2 rounded-r-md"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.productId._id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    disabled={
                                                        item.quantity >=
                                                        item.productId.quantity
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-center border-none">
                                            {formatMoney(
                                                item.quantity *
                                                    item.productId.price
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-center border-none">
                                            <button
                                                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                                                onClick={() =>
                                                    removeItem(
                                                        item.productId._id
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="text-right">
                            <Link
                                to="/checkout"
                                className="inline-block px-6 py-3 bg-white text-green-600 border border-green-600 text-center rounded hover:bg-green-600 hover:text-white"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
