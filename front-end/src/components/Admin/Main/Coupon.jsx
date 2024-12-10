import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom"; // Ensure this is imported
import Swal from "sweetalert2";

const Coupon = () => {
	const [coupons, setCoupons] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);

	const api = import.meta.env.VITE_APP_URL;

	const fetchCoupons = async () => {
		try {
			const response = await axios.get(`${api}/api/coupon/coupons?page=${page}&limit=8`);
			if (response.status === 200) {
				setCoupons(response.data.coupons);
				setTotalPage(response.data.totalPages);
			}
		} catch (error) {
			console.error("Error fetching coupons:", error);
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

	const deleteCoupon = async (code) => {
		const confirmation = await Swal.fire({
			title: "Are you sure?",
			text: "This action cannot be undone!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "Cancel",
		});

		if (confirmation.isConfirmed) {
			try {
				const response = await axios.delete(`${api}/api/coupon/coupons/delete/${code}`);
				if (response.status === 200) {
					Swal.fire({
						icon: "success",
						title: response.data.message,
						showConfirmButton: false,
						timer: 1500,
					});
					fetchCoupons(); // Refresh coupon list
				}
			} catch (error) {
				console.error("Error deleting coupon:", error);
				Swal.fire({
					icon: "error",
					title: "Failed to delete coupon",
					showConfirmButton: false,
					timer: 1500,
				});
			}
		}
	};

	const updateStatus = async (code, status) => {
		try {
			const response = await axios.patch(`${api}/api/coupon/coupons/edit/${code}`, { status });
			if (response.status === 200) {
				Swal.fire({
					icon: "success",
					title: "Coupon status updated successfully",
					showConfirmButton: false,
					timer: 1500,
				});
				fetchCoupons(); // Refresh coupon list
			}
		} catch (error) {
			console.error("Error updating coupon status:", error);
			Swal.fire({
				icon: "error",
				title: "Failed to update coupon status",
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "disabled":
				return "text-red-500";
			case "enabled":
				return "text-green-500";
			default:
				return "text-gray-500";
		}
	};

	useEffect(() => {
		fetchCoupons();
	}, [page]);

	return (
		<div className="w-full">
			<h1 className="text-3xl font-bold mb-4 text-gray-700">Coupon Management</h1>
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-semibold">Coupon List</h2>
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

			<div className="my-5">
				<Link to="/admin/coupon/create" className="text-left text-blue-600 hover:text-blue-700 hover:underline">
					Add new Coupon
				</Link>
			</div>

			<div>
				<table className="w-full border-collapse border border-gray-200">
					<thead>
						<tr className="bg-gray-100">
							<th className="px-4 py-2 border border-gray-200 text-center">Code</th>
							<th className="px-4 py-2 border border-gray-200 text-center">Name</th>
							<th className="px-4 py-2 border border-gray-200 text-center">Type</th>
							<th className="px-4 py-2 border border-gray-200 text-center">Value</th>
							<th className="px-4 py-2 border border-gray-200 text-center">Status</th>
							<th className="px-4 py-2 border border-gray-200 text-center">Action</th>
						</tr>
					</thead>
					<tbody>
						{coupons.map((coupon, index) => (
							<tr key={coupon.code || index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
								<td className="px-4 py-3 border border-gray-200 text-center">{coupon.code}</td>
								<td className="px-4 py-3 border border-gray-200 text-center">{coupon.name}</td>
								<td className="px-4 py-3 border border-gray-200 text-center">{coupon.type}</td>
								<td className="px-4 py-3 border border-gray-200 text-center">{coupon.value}</td>
								<td className="px-4 py-3 border border-gray-200 text-center">
									<select
										value={coupon.status}
										onChange={(e) => updateStatus(coupon.code, e.target.value)}
										className={`border-none bg-inherit font-semibold rounded p-1 ${getStatusColor(coupon.status)}`}
									>
										<option value="enabled" className="text-green-500">
											Enabled
										</option>
										<option value="disabled" className="text-red-500">
											Disabled
										</option>
									</select>
								</td>
								<td className="px-4 py-3 border border-gray-200 text-center">
									<div className="flex justify-center items-center">
										<FaRegTrashAlt
											className="text-xl cursor-pointer hover:text-blue-500"
											onClick={() => deleteCoupon(coupon.code)}
										/>
									</div>
								</td>
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

export default Coupon;
