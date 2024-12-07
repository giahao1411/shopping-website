import React, { useState, useEffect } from "react";
import axios from "axios";
import { SESSION } from "../../../libs/constant";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [searchQuery, setSearchQuery] = useState(""); 
    const [filteredOrders, setFilteredOrders] = useState([]); 
    const navigate = useNavigate();
    const api = import.meta.env.VITE_APP_URL;

    const simulatedOrders = [
        {
            _id: "1",
            createdAt: Date.now(),
            totalPrice: "1,000",
            status: "Pending",
            items: [
                { _id: "a1", name: "Product A", image: "link_to_image_A" },
                { _id: "a2", name: "Product B", image: "link_to_image_B" },
            ],
        },
        {
            _id: "2",
            createdAt: Date.now(),
            totalPrice: "2,000",
            status: "Confirmed",
            items: [
                { _id: "b1", name: "Product C", image: "link_to_image_C" },
            ],
        },
        {
            _id: "3",
            createdAt: Date.now(),
            totalPrice: "3,500",
            status: "Delivered",
            items: [
                { _id: "c1", name: "Product D", image: "link_to_image_D" },
                { _id: "c2", name: "Product E", image: "link_to_image_E" },
            ],
        },
        {
            _id: "4",
            createdAt: Date.now(),
            totalPrice: "1,500",
            status: "Cancelled",
            items: [
                { _id: "d1", name: "Product F", image: "link_to_image_F" },
            ],
        },
    ];

    useEffect(() => {
        setTimeout(() => {
            setOrders(simulatedOrders);
            setLoading(false);
            setFilteredOrders(simulatedOrders); 
        }, 1000); 
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    const handleSearch = () => {
        const filtered = orders.filter((order) =>
            order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.items.some((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        setFilteredOrders(filtered);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "Pending":
                return "text-yellow-500";
            case "Confirmed":
            case "Shipping":
                return "text-green-500";
            case "Delivered":
                return "text-blue-500";
            case "Cancelled":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    };

    const handleReview = (orderId) => {
        navigate(`/review/${orderId}`);
    };

    const handleBuyAgain = () => {
        navigate(`/checkout`);
    };

    return (
        <div className="py-20 font-sans min-h-screen">
            <h2 className="text-center text-3xl font-semibold mb-8 text-orange-500">
                Order History
            </h2>

            <div className="flex mb-6 max-w-7xl mx-auto">
                <div className="flex w-full max-w-xs">
                    <input
                        type="text"
                        placeholder="Search by Order ID or Product Name"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                    />
                </div>
                <button
                    onClick={handleSearch}
                    className="ml-2 py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition-colors"
                >
                    Search
                </button>
            </div>

            {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : filteredOrders.length === 0 ? (
                <p className="text-center text-gray-600">No orders found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 max-w-7xl mx-auto">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-4 border border-gray-300 text-center text-lg">
                                    Order ID
                                </th>
                                <th className="p-4 border border-gray-300 text-center text-lg">
                                    Products
                                </th>
                                <th className="p-4 border border-gray-300 text-center text-lg">
                                    Date
                                </th>
                                <th className="p-4 border border-gray-300 text-center text-lg">
                                    Total
                                </th>
                                <th className="p-4 border border-gray-300 text-center text-lg">
                                    Status
                                </th>
                                <th className="p-4 border border-gray-300 text-center text-lg" colSpan={2}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order, index) => (
                                <tr
                                    key={order._id || index}
                                    className="bg-gray-100 even:bg-white"
                                >
                                    <td className="p-4 border border-gray-300 text-center">
                                        {order._id}
                                    </td>
                                    <td className="p-4 border border-gray-300 text-center">
                                        {/* Hiển thị tên sản phẩm */}
                                        {order.items?.map((item) => (
                                            <div key={item._id} className="flex items-center mb-2">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-12 h-12 mr-2"
                                                />
                                                {item.name}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="p-4 border border-gray-300 text-center">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 border border-gray-300 text-center">
                                        {order.totalPrice}
                                    </td>
                                    <td
                                        className={`p-4 border border-gray-300 text-center font-semibold ${getStatusClass(
                                            order.status
                                        )}`}
                                    >
                                        {order.status}
                                    </td>
                                    {/* Cột Review */}
                                    <td className="p-4 border border-gray-300 text-center">
                                        {order.status === "Delivered" && (
                                            <button
                                                className="py-2 px-4 bg-yellow-600 text-white rounded-md hover:bg-yellow-800 transition-colors"
                                                onClick={() => handleReview(order._id)}
                                            >
                                                Review
                                            </button>
                                        )}
                                    </td>
                                    {/* Cột Buy Again */}
                                    <td className="p-4 border border-gray-300 text-center">
                                        <button
                                            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition-colors"
                                            onClick={() => handleBuyAgain(order._id)}
                                        >
                                            Buy Again
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <button
                className="block w-48 mx-auto mt-10 py-3 px-6 text-white bg-blue-600 hover:bg-blue-800 rounded-md transition-colors text-lg"
                onClick={handleBack}
            >
                Back
            </button>
        </div>
    );
};

export default OrderHistory;
