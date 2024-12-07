import React, { useState, useEffect } from "react";
import axios from "axios";
import { SESSION } from "../../../libs/constant";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
    const [orders, setOrders] = useState([
        {
            _id: "1",
            createdAt: Date.now(),
            totalPrice: "1,000",
            status: "Pending",
        },
        {
            _id: "2",
            createdAt: Date.now(),
            totalPrice: "1,000",
            status: "Confirmed",
        },
        {
            _id: "3",
            createdAt: Date.now(),
            totalPrice: "1,000",
            status: "Delivered",
        },
    ]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            const storedUser = JSON.parse(localStorage.getItem(SESSION));
            if (!storedUser) {
                setError("You need to log in to view your order history.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:8080/api/orders/${storedUser._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${storedUser.token}`,
                        },
                    }
                );
                setOrders(response.data.orders);
            } catch (err) {
                setError("Failed to load order history.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="py-40 font-sans">
            <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800">
                Order History
            </h2>
            {orders.length === 0 ? (
                <p className="text-center text-gray-600">
                    You have no orders yet.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 max-w-7xl mx-auto">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-3 border border-gray-300 text-center">
                                    Order ID
                                </th>
                                <th className="p-3 border border-gray-300 text-center">
                                    Date
                                </th>
                                <th className="p-3 border border-gray-300 text-center">
                                    Total
                                </th>
                                <th className="p-3 border border-gray-300 text-center">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr
                                    key={order._id || index}
                                    className="bg-gray-100 even:bg-white"
                                >
                                    <td className="p-3 border border-gray-300 text-center">
                                        {order._id}
                                    </td>
                                    <td className="p-3 border border-gray-300 text-center">
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="p-3 border border-gray-300 text-center">
                                        {order.totalPrice}
                                    </td>
                                    <td
                                        className={`p-3 border border-gray-300 text-center font-semibold ${
                                            order.status === "Pending"
                                                ? "text-yellow-500"
                                                : [
                                                      "Confirmed",
                                                      "Delivering",
                                                  ].includes(order.status)
                                                ? "text-green-500"
                                                : [
                                                      "Delivered",
                                                      "Cancelled",
                                                  ].includes(order.status)
                                                ? "text-red-500"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        {order.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <button
                className="block w-48 mx-auto mt-10 py-2 px-4 text-white bg-blue-600 hover:bg-blue-800 rounded-md transition-colors"
                onClick={handleBack}
            >
                Back
            </button>
        </div>
    );
};

export default OrderHistory;
