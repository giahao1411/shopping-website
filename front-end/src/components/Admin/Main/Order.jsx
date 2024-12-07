import React, { useState, useEffect } from "react";
import { BiSolidChevronRight, BiSolidChevronLeft } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { formatMoney } from "../../../libs/utilities"; // Giữ formatMoney để định dạng tiền

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/order/orders?page=${page}&limit=8`
            );
            console.log(response.data); // Kiểm tra dữ liệu trả về
            if (response.status === 200) {
                setOrders(response.data.orders);
                setTotalPage(response.data.totalPages);
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                console.error("Error fetching orders", error);
            }
        }
    };



    const handleBackward = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleForward = () => {
        setPage((prevPage) => (prevPage < totalPage ? prevPage + 1 : prevPage));
    };

    const handleInputChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (value > 0 && value <= totalPage) {
            setPage(value);
        } else if (value > totalPage) {
            setPage(totalPage);
        } else {
            setPage(1);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [page]);

    // Hàm để định dạng ngày
    const formatDate = (date) => {
        if (!date) return "N/A";
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(date).toLocaleDateString("en-US", options);
    };

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-4 text-gray-700">Order Management</h1>
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Order List</h2>
                <div className="flex items-center space-x-2">
                    <BiSolidChevronLeft
                        className="text-xl cursor-pointer hover:text-blue-500"
                        onClick={handleBackward}
                    />
                    <input
                        type="number"
                        min="1"
                        max={totalPage}
                        value={page}
                        onChange={handleInputChange}
                        className="w-14 p-1 border border-gray-300 rounded-md text-center outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <BiSolidChevronRight
                        className="text-xl cursor-pointer hover:text-blue-500"
                        onClick={handleForward}
                    />
                </div>
            </div>

            <div>
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border border-gray-200 text-center">Order ID</th>
                            <th className="px-4 py-2 border border-gray-200 text-center">Username</th>
                            <th className="px-4 py-2 border border-gray-200 text-center">Email</th>
                            <th className="px-4 py-2 border border-gray-200 text-center">Phone</th>
                            <th className="px-4 py-2 border border-gray-200 text-center">Total Price</th>
                            <th className="px-4 py-2 border border-gray-200 text-center">Created At</th>
                            <th className="px-4 py-2 border border-gray-200 text-center">Delivery Date</th>
                            <th className="px-4 py-2 border border-gray-200 text-center">Estimated Delivery</th>
                            <th className="px-4 py-2 border border-gray-200 text-center">Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr
                                key={order._id || index}
                                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                            >
                                <td className="px-4 py-3 border border-gray-200 text-center">{order._id}</td>
                                <td className="px-4 py-3 border border-gray-200 text-center">{order.username}</td>
                                <td className="px-4 py-3 border border-gray-200 text-center">{order.email}</td>
                                <td className="px-4 py-3 border border-gray-200 text-center">{order.phone}</td>
                                <td className="px-4 py-3 border border-gray-200 text-center">{formatMoney(order.totalPrice)}</td>
                                <td className="px-4 py-3 border border-gray-200 text-center">
                                    {formatDate(order.createdAt)}
                                </td>
                                <td className="px-4 py-3 border border-gray-200 text-center">
                                    {formatDate(order.deliveryDate)}
                                </td>
                                <td className="px-4 py-3 border border-gray-200 text-center">
                                    {formatDate(order.estimatedDeliveryDate)}
                                </td>
                                <td className="px-4 py-3 border border-gray-200 text-center">{order.orderstatus}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                <p className="px-4 pt-10 text-center font-semibold text-gray-700">
                    Page {page} / {totalPage}
                </p>
            </div>
        </div>
    );
};

export default Order;
