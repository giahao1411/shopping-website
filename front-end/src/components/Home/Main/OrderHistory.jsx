import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { formatDate, formatMoney } from "../../../libs/utilities"; // Make sure you have utility functions

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const api = import.meta.env.VITE_APP_URL;
  const navigate = useNavigate();  // For navigating to the product detail page

  // Get status color for styling
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

  // Fetch orders from the API
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${api}/api/order/orders?limit=8`);
      if (response.status === 200) {
        const filteredOrders = response.data.orders.filter(order =>
          order.orderstatus === "Cancelled" || order.orderstatus === "Delivered"
        );
        setOrders(filteredOrders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Handle Review button click
  const handleReview = (orderId) => {
    navigate(`/review/${orderId}`);
  };

  // Handle order expansion
  const [expandedOrder, setExpandedOrder] = useState(null);

  const handleToggleDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Fetch orders when component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen mt-20 w-full max-w-screen-lg mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-orange-500 font-bold text-gray-800">Order History</h1>
        <Link to="/" className="text-sm text-blue-500 hover:text-blue-700">
          <BiInfoCircle className="inline mr-2" /> Back to Home
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-3 text-center border-b">Order ID</th>
              <th className="px-4 py-3 text-center border-b">Products</th>
              <th className="px-4 py-3 text-center border-b">Date</th>
              <th className="px-4 py-3 text-center border-b">Total</th>
              <th className="px-4 py-3 text-center border-b">Status</th>
              <th className="px-4 py-3 text-center border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <React.Fragment key={order._id || index}>
                  <tr
                    className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} cursor-pointer`}
                    onClick={() => handleToggleDetails(order._id)}
                  >
                    <td className="px-4 py-3 text-center">{order._id}</td>
                    <td className="px-4 py-3 text-center">
                      {order.items?.map((item) => (
                        <div key={item._id} className="flex items-center mb-2">
                          <Link to={`/product/${item._id}`} className="flex items-center">
                            <img
                              src={item.image} // Ensure this is the correct image path
                              alt={item.name}
                              className="w-12 h-12 mr-2"
                            />
                            <span className="text-blue-600 hover:underline">{item.name}</span>
                          </Link>
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-3 text-center">{formatDate(order.createdAt)}</td>
                    <td className="px-4 py-3 text-center">{formatMoney(order.totalPrice)}</td>
                    <td className={`px-4 py-3 text-center font-semibold ${getStatusColor(order.orderstatus)}`}>
                      {order.orderstatus}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {order.orderstatus === "Delivered" && (
                        <button
                          className="py-2 px-4 bg-yellow-600 text-white rounded-md hover:bg-yellow-800 transition-colors"
                          onClick={() => handleReview(order._id)}
                        >
                          Review
                        </button>
                      )}
                    </td>
                  </tr>

                  {/* Expanded Order Details */}
                  {expandedOrder === order._id && (
                    <tr className="bg-gray-200">
                      <td colSpan="6" className="p-4">
                        <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                        <ul>
                          {order.items?.map((item) => (
                            <li key={item._id} className="mb-2">
                              <div><strong>Name:</strong> {item.name}</div>
                              <div><strong>Price:</strong> {formatMoney(item.price)}</div>
                              <div><strong>Description:</strong> {item.description || "No description available."}</div>
                              <div><strong>Quantity:</strong> {item.quantity}</div>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">No orders available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
