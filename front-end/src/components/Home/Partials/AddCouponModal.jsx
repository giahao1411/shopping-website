import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const AddCouponModal = ({ isOpen, onClose, userId, onAddCoupon }) => {
	const [couponCode, setCouponCode] = useState("");

	const api = import.meta.env.VITE_APP_URL;

	const handleSubmit = async (e) => {
		e.preventDefault();

		const trimmedCouponCode = couponCode.trim();
		if (!trimmedCouponCode) {
			alert("Vui lòng nhập mã coupon.");
			return;
		}

		console.log("Đang gửi mã coupon:", trimmedCouponCode);

		try {
			const response = await axios.post(`${api}/api/user/users/${userId}/add-coupon`, {
				couponCode: trimmedCouponCode,
			});

			// Log the entire response to debug
			console.log("API Response:", response);

			if (response.status === 200 || response.status === 201) {
				// Cập nhật để chấp nhận nhiều status code hơn
				Swal.fire({
					icon: "success",
					title: response.data.message || "Coupon added successfully.",
					showConfirmButton: false,
					timer: 1500,
				});
				onAddCoupon(trimmedCouponCode);
				setCouponCode(""); // Xóa input sau khi thêm thành công
				onClose(); // Đóng modal
			} else {
				Swal.fire({
					icon: "error",
					title: response.data.message || "Mã coupon không hợp lệ hoặc đã bị vô hiệu hóa.",
					showConfirmButton: true,
				});
			}
		} catch (error) {
			// Log the error details for debugging
			console.error("Lỗi từ API:", error);

			if (error.response) {
				// Lỗi từ server
				Swal.fire({
					icon: "error",
					title: error.response.data.message || "Đã xảy ra lỗi trên máy chủ.",
					showConfirmButton: true,
				});
			} else if (error.request) {
				// Lỗi không nhận được phản hồi từ server
				Swal.fire({
					icon: "error",
					title: "Không nhận được phản hồi từ máy chủ.",
					showConfirmButton: true,
				});
			} else {
				// Lỗi không xác định
				Swal.fire({
					icon: "error",
					title: "Đã xảy ra lỗi không xác định.",
					showConfirmButton: true,
				});
			}
		}
	};

	return (
		isOpen && (
			<div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-30" onClick={onClose}>
				<div
					className="p-6 w-full max-w-md bg-white border border-black rounded-lg shadow-lg relative"
					onClick={(e) => e.stopPropagation()}
				>
					<button
						type="button"
						className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 focus:outline-none"
						onClick={onClose}
					>
						<svg
							className="w-6 h-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="2"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>

					<h3 className="text-xl font-semibold text-center">Add a New Coupon</h3>

					<form onSubmit={handleSubmit} className="mt-4">
						<div className="mb-4">
							<label htmlFor="couponCode" className="block mb-2 text-sm font-medium text-black">
								Coupon Code
							</label>
							<input
								type="text"
								id="couponCode"
								value={couponCode}
								onChange={(e) => setCouponCode(e.target.value)}
								placeholder="Enter coupon code"
								className="bg-white border border-black-500/75 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
							/>
						</div>

						<div className="flex justify-center space-x-4">
							<button
								type="button"
								className="text-white bg-red-600 hover:bg-red-700 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5"
								onClick={onClose}
							>
								Cancel
							</button>
							<button
								type="submit"
								className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		)
	);
};

export default AddCouponModal;
