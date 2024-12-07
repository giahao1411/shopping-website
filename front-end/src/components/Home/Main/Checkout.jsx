import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const cartItems = [
    {
        name: "Machine Learning",
        by: "DeepLearning.AI",
        price: 20,
    },
    {
        name: "Software Engineer",
        by: "Google",
        price: 18.99,
    },
    {
        name: "Design UX/UI",
        by: "Mr. Ha Le Hoai Trung",
        price: 15.99,
    },
];

const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
};

const Checkout = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [securityCode, setSecurityCode] = useState("");

    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.match(/.{1,4}/g)?.join(" ") || "";
        setCardNumber(value);
    };

    const handleExpirationDateChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 2) {
            value = value.slice(0, 2) + " / " + value.slice(2, 4);
        }
        setExpirationDate(value);
    };

    const handleSecurityCodeChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 3) {
            value = value.slice(0, 3);
        }
        setSecurityCode(value);
    };

    return (
        <main className="min-h-screen bg-white py-20">
            <div className="mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl">
                {/* Checkout section */}
                <div className="">
                    <h1 className="text-3xl font-semibold mb-7">Checkout</h1>
                    <h3 className="text-2xl font-semibold mb-7">Billing Information</h3>

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
                                placeholder="Enter your phone number"
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
                                    checked
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
                                    src="/signal-2024-12-05-002042_002.png"
                                    alt={item.name}
                                    className="w-16 h-16"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-sm text-gray-500">by {item.by}</p>
                                    <button className="text-blue-500 hover:underline text-sm mt-2">
                                        Remove from cart
                                    </button>
                                </div>
                                <p className="font-semibold">${item.price.toFixed(2)}</p>
                            </div>
                        ))}

                        <p className="text-lg px-4 pt-10 font-semibold">
                            Total: ${calculateTotal()} USD
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Checkout;
