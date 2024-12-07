import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredOrders, setFilteredOrders] = useState([]);
    const navigate = useNavigate();

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
            status: "Shipping",
            items: [
                { _id: "c1", name: "Product D", image: "link_to_image_D" },
                { _id: "c2", name: "Product E", image: "link_to_image_E" },
            ],
        },
        {
            _id: "4",
            createdAt: Date.now(),
            totalPrice: "1,500",
            status: "Delivered",
            items: [
                { _id: "d1", name: "Product F", image: "link_to_image_F" },
            ],
        },
    ];

    useEffect(() => {
        // Mô phỏng gọi API
        setLoading(true);
        setTimeout(() => {
            setOrders(simulatedOrders);  // Dữ liệu giả lập
            setFilteredOrders(simulatedOrders);  // Hiển thị tất cả đơn hàng ban đầu
            setLoading(false);
        }, 1000);  // Mô phỏng thời gian chờ của API
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "Pending":
                return "text-yellow-500";
            case "Confirmed":
            case "Shipping":
                return "text-green-500";
            case "Delivered":
            case "Cancelled":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    };

    const handleSearch = () => {
        const result = orders.filter(order =>
            order._id.toLowerCase().includes(searchQuery) ||
            order.items.some(item => item.name.toLowerCase().includes(searchQuery))
        );
        setFilteredOrders(result);
    };

    return (
        <div className="py-20 font-sans min-h-screen">
            <h2 className="text-center font-bold text-3xl font-semibold mb-8 text-orange-500">
                Order Tracking
            </h2>

            <div className="flex mb-6 max-w-7xl mx-auto">
                <div className="flex w-full max-w-xs">
                    <input
                        type="text"
                        placeholder="Search by Order ID or Product Name"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
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
                                <th className="p-4 border border-gray-300 text-center text-lg">Order ID</th>
                                <th className="p-4 border border-gray-300 text-center text-lg">Product Name</th>
                                <th className="p-4 border border-gray-300 text-center text-lg">Date</th>
                                <th className="p-4 border border-gray-300 text-center text-lg">Total</th>
                                <th className="p-4 border border-gray-300 text-center text-lg">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order, index) => (
                                <tr key={order._id || index} className="bg-gray-100 even:bg-white">
                                    <td className="p-4 border border-gray-300 text-center">{order._id}</td>
                                    <td className="p-4 border border-gray-300 text-center">
                                        {order.items?.map(item => (
                                            <div key={item._id} className="flex items-center">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="inline-block w-12 h-12 mr-2"
                                                />
                                                {item.name}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="p-4 border border-gray-300 text-center">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 border border-gray-300 text-center">{order.totalPrice}</td>
                                    <td className={`p-4 border border-gray-300 text-center font-semibold ${getStatusClass(order.status)}`}>
                                        {order.status}
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
