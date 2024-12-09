import React, { useState, useEffect } from "react";
import { NavLink, useFetcher } from "react-router-dom";
import { SESSION } from "../../../libs/constant";
import axios from "axios";
import { formatMoney, formatNumber } from "../../../libs/utilities";

const Checkout = () => {
    const storedUser = JSON.parse(localStorage.getItem(SESSION));
    if (!storedUser) {
        Swal.fire({
            icon: "error",
            title: "You need to login to view cart",
            showConfirmButton: false,
            timer: 1500,
        });
        return;
    }

    const [phone, setPhone] = useState("");
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
                    alert("Failed to get product");
                } else {
                    console.error(error);
                }
            }
        };

        fetchCartItems();
    }, []);

    const handlePhoneNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length <= 3) {
            value = value.replace(/(\d{3})(\d{0,})/, "$1-$2");
        } else if (value.length <= 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{0,})/, "$1-$2-$3");
        } else {
            value = value.replace(/(\d{3})(\d{4})(\d{3})/, "$1-$2-$3");
        }
        if (value.endsWith("-")) {
            value = value.slice(0, -1);
        }

        setPhone(value);
    };

    // Calculate total price
    const calculateTotalPrice = () => {
        const subtotal = cartItems.reduce(
            (sum, item) => sum + item.totalPrice,
            0
        );
        const shippingFee = 2; // fixed shipping fee
        const vat = subtotal * 0.1; // 10% VAT
        const discount = subtotal * 0.05; // 5% coupon discount

        return (subtotal + shippingFee + vat - discount).toFixed(2);
    };

    return (
        <main className="min-h-screen bg-white py-20">
            <div className="mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl">
                {/* Checkout section */}
                <div className="">
                    <h1 className="text-3xl font-semibold mb-7">Checkout</h1>
                    <h3 className="text-2xl font-semibold mb-7">
                        Delivery Information
                    </h3>

                    <form>
                        {/* Name input */}
                        <div className="mb-3">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 my-2"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter your name"
                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                            />
                        </div>
                        {/*Phone input*/}
                        <div className="mb-3">
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700 my-2"
                            >
                                Phone number
                            </label>
                            <input
                                type="text"
                                id="phone"
                                value={phone}
                                onChange={handlePhoneNumberChange}
                                placeholder="012-3456-789"
                                maxLength="12"
                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                            />
                        </div>

                        {/* Country dropdown */}
                        <div className="mb-3">
                            <label
                                htmlFor="country"
                                className="block text-sm font-medium text-gray-700 my-2"
                            >
                                Address
                            </label>
                            <select
                                id="address"
                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                            >
                                <option>Select your address</option>
                                <option>Ha Noi</option>
                                <option>Thanh Hoa</option>
                                <option>Long An</option>
                                <option>Ho Chi Minh City</option>
                            </select>
                        </div>

                        <div className="pt-2">
                            <h3 className="text-2xl font-semibold mb-2">
                                Payment methods
                            </h3>
                            <div className="mt-4 border border-gray-300 p-3 rounded-md">
                                <input
                                    type="radio"
                                    name="payment"
                                    id="paypal"
                                    className="mr-2"
                                    defaultChecked
                                />
                                <label
                                    htmlFor="paypal"
                                    className="text-md text-gray-700 font-semibold"
                                >
                                    Cash on delivery
                                </label>
                            </div>
                        </div>

                        <div className="py-2">
                            {/* Pay button */}
                            <button className="rounded-md bg-blue-500 text-white px-14 py-2 mt-4 hover:bg-blue-600">
                                Confirm
                            </button>
                        </div>

                        {/* Terms and policies links */}
                        <p className="mt-3">
                            I agree to the{" "}
                            <NavLink className="text-blue-600 underline hover:text-blue-700">
                                Terms of Use
                            </NavLink>
                            ,{" "}
                            <NavLink className="text-blue-600 underline hover:text-blue-700">
                                Refund Policy
                            </NavLink>
                            , and{" "}
                            <NavLink className="text-blue-600 underline hover:text-blue-700">
                                Privacy Policy
                            </NavLink>
                            .
                        </p>
                    </form>
                </div>

                {/* Cart Summary Section */}
                <div className="bg-white">
                    <div className="space-y-4 border border-gray-400 p-5 rounded-md">
                        {cartItems.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-4 p-4"
                            >
                                <img
                                    src={`${api}/${item.productId.images[0]}`}
                                    alt={item.productId.name}
                                    className="w-16 h-16"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold">
                                        {item.productId.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Quantity: {formatNumber(item.quantity)}
                                    </p>
                                    <button className="text-blue-500 hover:underline text-sm mt-2">
                                        Remove from cart
                                    </button>
                                </div>
                                <p className="font-semibold">
                                    {formatMoney(item.totalPrice)}
                                </p>
                            </div>
                        ))}

                        <hr className="mx-4" />

                        <div className="space-y-2 px-4 text-sm">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500">Shipping fee:</p>
                                <p className="text-right font-semibold">$2</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500">VAT:</p>
                                <p className="text-right font-semibold">10%</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500">Coupon:</p>
                                <p className="text-right font-semibold">
                                    5% discount
                                </p>
                            </div>
                        </div>

                        <p className="text-lg px-4 font-semibold">
                            Total: {formatMoney(calculateTotalPrice())}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Checkout;
