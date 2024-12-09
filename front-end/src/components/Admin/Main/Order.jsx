import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";
import { formatDate, formatMoney } from "../../../libs/utilities";

const Order = () => {
	const [orders, setOrders] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const api = import.meta.env.VITE_APP_URL;

	const getStatusColor = (status) => {
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

	// Fetch orders from the server
	const fetchOrders = async () => {
		try {
			const response = await axios.get(`${api}/api/order/orders?page=${page}&limit=8`);
			if (response.status === 200) {
				console.log("Fetched orders:", response.data.orders); // Log orders to see the fetched data
				setOrders(response.data.orders);
				setTotalPage(response.data.totalPages);
			}
		} catch (error) {
			console.error("Error fetching orders:", error);
		}
	};

	// Update order status
	const updateOrderStatus = async (id, newStatus) => {
		try {
			console.log("Updating status for order:", id);

			const response = await axios.patch(`${api}/api/order/orders/edit/${id}`, {
				orderstatus: newStatus, // Chỉ cần gửi trạng thái mới, backend sẽ xử lý `deliveredAt` khi trạng thái là "Delivered"
			});

			if (response.status === 200) {
				console.log("Updated order data:", response.data);
				fetchOrders(); // Lấy lại đơn hàng sau khi cập nhật
			}
		} catch (error) {
			console.error("Error updating order status:", error);
		}
	};

	// Pagination logic
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

	// Fetch orders when page changes
	useEffect(() => {
		fetchOrders();
	}, [page]);

	useEffect(() => {
		console.log(orders);
	}, [orders]);

	return (
		<div className="w-full">
			<h1 className="text-3xl font-bold mb-4 text-gray-700">Order Management</h1>
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-semibold">Order List</h2>
				<div className="flex items-center space-x-2">
					<BiSolidChevronLeft className="text-xl cursor-pointer hover:text-blue-500" onClick={handleBackward} />
					<input
						type="number"
						min="1"
						max={totalPage}
						value={page}
						onChange={handleInputChange}
						className="w-14 p-1 border border-gray-300 rounded-md text-center outline-none focus:ring-2 focus:ring-blue-400"
					/>
					<BiSolidChevronRight className="text-xl cursor-pointer hover:text-blue-500" onClick={handleForward} />
				</div>
			</div>

			<div className="pt-10">
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
						{orders.length > 0 ? (
							orders.map((order, index) => (
								<tr key={order._id || index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
									<td className="px-4 py-3 border border-gray-200 text-center">{order._id}</td>
									<td className="px-4 py-3 border border-gray-200 text-center">{order.username}</td>
									<td className="px-4 py-3 border border-gray-200 text-center">{order.email}</td>
									<td className="px-4 py-3 border border-gray-200 text-center">{order.phone}</td>
									<td className="px-4 py-3 border border-gray-200 text-center">{formatMoney(order.totalPrice)}</td>
									<td className="px-4 py-3 border border-gray-200 text-center">{formatDate(order.createdAt)}</td>
									<td className="px-4 py-3 border border-gray-200 text-center">{formatDate(order.deliveredAt)}</td>
									<td className="px-4 py-3 border border-gray-200 text-center">{formatDate(order.expectedAt)}</td>
									<td className="px-4 py-3 border border-gray-200 text-center">
										<select
											value={order.orderstatus}
											onChange={(e) => updateOrderStatus(order._id, e.target.value)}
											className={`p-2 bg-gray-50 border-none rounded-md outline-none font-semibold ${getStatusColor(
												order.orderstatus
											)}`}
										>
											<option value="Pending" className="text-yellow-500">
												Pending
											</option>
											<option value="Confirmed" className="text-green-500">
												Confirmed
											</option>
											<option value="Shipping" className="text-green-500">
												Shipping
											</option>
											<option value="Delivered" className="text-blue-500">
												Delivered
											</option>
											<option value="Cancelled" className="text-red-500">
												Cancelled
											</option>
										</select>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="9" className="text-center py-4">
									No orders available
								</td>
							</tr>
						)}
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
