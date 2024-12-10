const CouponModal = ({ isOpen, onClose, userCoupons }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white p-6 rounded shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
				<h2 className="font-bold text-2xl mb-6 text-center text-gray-800">Your Coupons</h2>
				{userCoupons && userCoupons.length > 0 ? (
					<ul className="divide-y divide-gray-300">
						{userCoupons.map((coupon, index) => (
							<li
								key={index}
								className="flex justify-between items-center py-3 px-4 hover:bg-gray-100 rounded transition"
							>
								{/* Coupon Code */}
								<div className="flex-1">
									<p className="font-medium text-gray-700">
										<span className="text-gray-500 mr-1">Code:</span>
										{coupon.code || "N/A"} {/* Show coupon code */}
									</p>
								</div>

								{/* Coupon Type */}
								<div className="flex-1 text-center">
									<p
										className={`font-medium
    ${
			coupon.type === "freeship"
				? "text-blue-600"
				: coupon.type === "percent"
				? "text-yellow-500"
				: coupon.type === "fixed"
				? "text-red-600"
				: "text-gray-600"
		}`}
									>
										<span className="text-gray-500 mr-1">Type:</span>
										{coupon.type || "N/A"} {/* Show coupon type */}
									</p>
								</div>

								{/* Coupon Quantity */}
								<div className="flex-1 text-right">
									<p className="text-green-600 font-semibold">
										<span className="text-gray-500 mr-1">Quantity:</span>
										{coupon.quantity || "N/A"} {/* Show coupon quantity */}
									</p>
								</div>
							</li>
						))}
					</ul>
				) : (
					<p className="text-center text-gray-600 mt-4">No coupons available.</p>
				)}
				<button
					className="mt-6 bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
					onClick={onClose}
				>
					Close
				</button>
			</div>
		</div>
	);
};

export default CouponModal;
