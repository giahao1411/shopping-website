import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateCoupon = () => {
	const [couponData, setCouponData] = useState({
		name: "",
		type: "percent", // Default type is Percentage
		value: 0,
		maxUses: 0, // Usage limit updated to maxUses
	});

	const navigate = useNavigate();
	const api = import.meta.env.VITE_APP_URL;

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setCouponData((prevState) => {
			// Nếu giá trị là "value" hoặc "maxUses", chuyển đổi sang số nguyên
			const newValue = name === "value" || name === "maxUses" ? parseInt(value, 10) || "" : value;

			// Nếu loại là "freeship", luôn đặt value = 0
			if (name === "type" && value === "freeship") {
				return {
					...prevState,
					type: value,
					value: 0, // Đặt value = 0 khi loại là freeship
				};
			}

			return {
				...prevState,
				[name]: newValue,
			};
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate required fields
		if (!couponData.name || !couponData.type || couponData.maxUses <= 0) {
			Swal.fire({
				icon: "error",
				title: "Please fill in all required fields!",
				showConfirmButton: false,
				timer: 1500,
			});
			return;
		}

		// Validate value field
		if (couponData.type !== "freeship" && couponData.value <= 0) {
			Swal.fire({
				icon: "error",
				title: "Please provide a valid value for the coupon!",
				showConfirmButton: false,
				timer: 1500,
			});
			return;
		}

		// Prepare data for submission
		const dataToSubmit = { ...couponData };
		if (couponData.type === "freeship") {
			dataToSubmit.value = 0; // Ensure value is 0 for Freeship type
		}

		try {
			const response = await axios.post(`${api}/api/coupon/coupons`, dataToSubmit);

			if (response.status === 201) {
				Swal.fire({
					icon: "success",
					title: response.data.message || "Coupon created successfully!",
					showConfirmButton: false,
					timer: 1500,
				});
				navigate("/admin/coupon");
			}
		} catch (error) {
			// Handle API errors
			if (error.response) {
				Swal.fire({
					icon: "error",
					title: error.response.data.message || "Failed to create coupon.",
					showConfirmButton: false,
					timer: 1500,
				});
			} else {
				console.error("Error creating coupon:", error);
			}
		}
	};

	return (
		<div className="max-w-lg mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-lg">
			<h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create New Coupon</h1>

			<form className="space-y-6" onSubmit={handleSubmit}>
				<label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
					Coupon Name:
				</label>
				<input
					id="name"
					type="text"
					name="name"
					value={couponData.name}
					onChange={handleInputChange}
					required
					className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
				/>

				<label htmlFor="type" className="block text-gray-700 font-semibold mb-2">
					Coupon Type:
				</label>
				<select
					id="type"
					name="type"
					value={couponData.type}
					onChange={handleInputChange}
					required
					className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
				>
					<option value="percent">Percentage</option>
					<option value="fixed">Fixed Amount</option>
					<option value="freeship">Freeship</option>
				</select>

				<label htmlFor="value" className="block text-gray-700 font-semibold mb-2">
					Value:
				</label>
				<input
					id="value"
					type="number"
					name="value"
					value={couponData.value}
					onChange={handleInputChange}
					required={couponData.type !== "freeship"}
					disabled={couponData.type === "freeship"} // Disable when type is Freeship
					placeholder={couponData.type === "freeship" ? "Value not required for Freeship" : "Enter value"}
					className={`w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring ${
						couponData.type === "freeship" ? "bg-gray-200 cursor-not-allowed" : "focus:ring-blue-200"
					}`}
				/>

				<label htmlFor="maxUses" className="block text-gray-700 font-semibold mb-2">
					Usage Limit:
				</label>
				<input
					id="maxUses"
					type="number"
					name="maxUses"
					value={couponData.maxUses}
					onChange={handleInputChange}
					required
					className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
				/>

				<button type="submit" className="w-full py-3 text-white font-semibold rounded bg-blue-600 hover:bg-blue-700">
					Create Coupon
				</button>
			</form>

			<Link to="/admin/coupon" className="block mt-6 text-center text-blue-600 hover:underline">
				Back to Coupon List
			</Link>
		</div>
	);
};

export default CreateCoupon;
