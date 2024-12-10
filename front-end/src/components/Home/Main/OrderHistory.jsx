import React, { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { formatDate, formatMoney } from "../../../libs/utilities";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const api = import.meta.env.VITE_APP_URL;
  const navigate = useNavigate();

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

  // Navigate to review page for a specific order
  const navigateToReview = (orderId, orderDetails) => {
    navigate(`/review/${orderId}`, { state: { orderDetails } });
  };

  // Fetch orders when component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen mt-20 w-full max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-orange-500 font-bold text-gray-800">
          Order History
        </h1>
        <Link to="/" className="text-sm text-blue-500 hover:text-blue-700">
          <BiInfoCircle className="inline mr-2" /> Back to Home
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-6 py-4 text-center border-b">Order ID</th>
              <th className="px-6 py-4 text-center border-b">Username</th>
              <th className="px-6 py-4 text-center border-b">Address</th>
              <th className="px-6 py-4 text-center border-b">Phone</th>
              <th className="px-6 py-4 text-center border-b">Total Price</th>
              <th className="px-6 py-4 text-center border-b">Created At</th>
              <th className="px-6 py-4 text-center border-b">Status</th>
              <th className="px-6 py-4 text-center border-b">Detail</th>
              <th className="px-6 py-4 text-center border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={order._id || index}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-6 py-4 text-center">{order._id}</td>
                  <td className="px-6 py-4 text-center">{order.username}</td>
                  <td className="px-6 py-4 text-center">{order.address}</td>
                  <td className="px-6 py-4 text-center">{order.phone}</td>
                  <td className="px-6 py-4 text-center">{formatMoney(order.totalPrice)}</td>
                  <td className="px-6 py-4 text-center">{formatDate(order.createdAt)}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-semibold ${getStatusColor(order.orderstatus)}`}>
                      {order.orderstatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link to={`/order-detail/${order._id}`} className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 mr-2">
                      Details
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    {order.orderstatus === "Delivered" && (
                      <button
                        onClick={() => navigateToReview(order._id, order)}
                        className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-700"
                      >
                        Review
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
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

export default OrderHistory;
