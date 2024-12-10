import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { formatDate, formatMoney } from "../../../libs/utilities";

const OrderTracking = () => {
    const [orders, setOrders] = useState([]);
    const api = import.meta.env.VITE_APP_URL;

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "text-yellow-500";
            case "Confirmed":
            case "Delivering":
                return "text-green-500";
            case "Delivered":
                return "text-blue-500";
            case "Cancelled":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    };

    // Fetch orders from the server
    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${api}/api/order/orders?limit=8`);
            if (response.status === 200) {
                console.log("Fetched orders:", response.data.orders);
                setOrders(response.data.orders);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    // Cancel order
    const cancelOrder = async (id) => {
        try {
            const response = await axios.patch(
                `${api}/api/order/orders/edit/${id}`,
                {
                    orderstatus: "Cancelled", // Update status to "Cancelled"
                }
            );
            if (response.status === 200) {
                console.log("Cancelled order data:", response.data);
                fetchOrders(); // Fetch orders again after cancellation
            }
        } catch (error) {
            console.error("Error cancelling order:", error);
        }
    };

    // Fetch orders when component mounts
    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="min-h-screen mt-20 w-full max-w-screen-lg mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl text-orange-500 font-bold text-gray-800">
                    Order Tracking
                </h1>
                <Link
                    to="/"
                    className="text-sm text-blue-500 hover:text-blue-700"
                >
                    <BiInfoCircle className="inline mr-2" /> Back to Home
                </Link>
            </div>

            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="px-4 py-3 text-center border-b">
                                Username
                            </th>
                            <th className="px-4 py-3 text-center border-b">
                                Address
                            </th>
                            <th className="px-4 py-3 text-center border-b">
                                Phone
                            </th>
                            <th className="px-4 py-3 text-center border-b">
                                Total Price
                            </th>
                            <th className="px-4 py-3 text-center border-b">
                                Created At
                            </th>
                            <th className="px-4 py-3 text-center border-b">
                                Status
                            </th>
                            <th className="px-4 py-3 text-center border-b">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr
                                    key={order._id || index}
                                    className={`border-b ${
                                        index % 2 === 0
                                            ? "bg-gray-50"
                                            : "bg-white"
                                    }`}
                                >
                                    <td className="px-4 py-3 text-center">
                                        {order.username}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        {order.address}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        {order.phone}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        {formatMoney(order.totalPrice)}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        {formatDate(order.createdAt)}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span
                                            className={`font-semibold ${getStatusColor(
                                                order.orderstatus
                                            )}`}
                                        >
                                            {order.orderstatus}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            onClick={() =>
                                                cancelOrder(order._id)
                                            }
                                            className={`px-4 py-2 rounded-md focus:outline-none ${
                                                order.orderstatus ===
                                                    "Pending" ||
                                                order.orderstatus ===
                                                    "Confirmed"
                                                    ? "bg-red-500 text-white hover:bg-red-700" // Nút hiển thị bình thường
                                                    : "bg-gray-400 text-gray-700 cursor-not-allowed" // Nút mờ và không tương tác được
                                            }`}
                                            disabled={
                                                order.orderstatus !==
                                                    "Pending" &&
                                                order.orderstatus !==
                                                    "Confirmed"
                                            } // Vô hiệu hóa nút khi không phải Pending hoặc Confirmed
                                        >
                                            Cancel Order
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="text-center py-4 text-gray-500"
                                >
                                    No orders available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderTracking;
