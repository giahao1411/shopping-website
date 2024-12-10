import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SESSION } from "../../../libs/constant";
import axios from "axios";
import { formatMoney, formatNumber } from "../../../libs/utilities";
import Swal from "sweetalert2";

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

    const [username, setUsername] = useState("");
    const [selectedPhone, setSelectedPhone] = useState("");
    const [selectedAddress, setSelectedAddress] = useState("");

    const [addresses, setAddresses] = useState([]);
    const [phones, setPhones] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    const api = import.meta.env.VITE_APP_URL;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(
                    `${api}/api/cart/carts/${storedUser.userId}/checkout`
                );

                if (response.status === 200) {
                    setCartItems(response.data.carts);
                }
            } catch (error) {
                if (error.response) {
                    alert("Failed to get product");
                } else {
                    console.error(error);
                }
            }
        };

        const getInformation = async () => {
            try {
                const response = await axios.get(
                    `${api}/api/user-information/information/${storedUser.userId}`
                );

                if (response.status === 200) {
                    setUsername(response.data.username);
                    setAddresses(response.data.addresses);
                    setPhones(response.data.phones);
                }
            } catch (error) {
                if (error.response) {
                    alert("Failed to get product");
                } else {
                    console.error(error);
                }
            }
        };

        getInformation();
        fetchCartItems();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedAddress || !selectedPhone || cartItems.length === 0) {
            alert("Please fill in all the required fields.");
            return;
        }

        const orderData = {
            username,
            phone: selectedPhone,
            address: selectedAddress,
            cartItems: cartItems.map((item) => ({
                productId: item.productId._id,
                quantity: item.quantity,
                totalPrice: item.totalPrice,
            })),
        };

        try {
            const response = await axios.post(
                `${api}/api/order/orders/${storedUser.userId}`,
                orderData
            );

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                setSelectedAddress("");
                setSelectedPhone("");
                navigate("/");
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
            {cartItems.length <= 0 ? (
                <div className="mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl">
                    <div>
                        <h1 className="text-3xl font-semibold mb-7">
                            Checkout
                        </h1>
                        <h3 className="mb-7">
                            There is no product to checkout. Please re-check
                            your cart
                        </h3>
                    </div>
                </div>
            ) : (
                <div className="mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl">
                    {/* Checkout section */}
                    <div>
                        <h1 className="text-3xl font-semibold mb-7">
                            Checkout
                        </h1>
                        <h3 className="text-2xl font-semibold mb-7">
                            Delivery Information
                        </h3>

                        <form onSubmit={handleSubmit}>
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
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                                />
                            </div>
                            {/*Phone input*/}
                            <div className="mb-3">
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-gray-700 my-2"
                                >
                                    Phone
                                </label>
                                <select
                                    id="phone"
                                    value={selectedPhone}
                                    onChange={(e) =>
                                        setSelectedPhone(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                                >
                                    <option value="">Select your phone</option>
                                    {phones && phones.length > 0 ? (
                                        phones.map((phone, index) => (
                                            <option key={index} value={phone}>
                                                {phone}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>
                                            Loading phones...
                                        </option>
                                    )}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="address"
                                    className="block text-sm font-medium text-gray-700 my-2"
                                >
                                    Address
                                </label>
                                <select
                                    id="address"
                                    value={selectedAddress}
                                    onChange={(e) =>
                                        setSelectedAddress(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                                >
                                    <option value="">
                                        Select your address
                                    </option>
                                    {addresses && addresses.length > 0 ? (
                                        addresses.map((address, index) => (
                                            <option key={index} value={address}>
                                                {address}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>
                                            Loading addresses...
                                        </option>
                                    )}
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
                                <button
                                    type="submit"
                                    className="rounded-md bg-blue-500 text-white px-14 py-2 mt-4 hover:bg-blue-600"
                                >
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
                                        className="w-16 h-16 object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold">
                                            {item.productId.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Quantity:{" "}
                                            {formatNumber(item.quantity)}
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
                                    <p className="text-gray-500">
                                        Shipping fee:
                                    </p>
                                    <p className="text-right font-semibold">
                                        $2
                                    </p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-500">VAT:</p>
                                    <p className="text-right font-semibold">
                                        10%
                                    </p>
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
            )}
        </main>
    );
};

export default Checkout;
