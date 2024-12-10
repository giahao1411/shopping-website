import React from "react";

const CouponModal = ({ isOpen, onClose, userCoupons }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white p-6 rounded shadow-lg w-96 max-h-[80vh] overflow-y-auto">
				<h2 className="font-bold text-2xl mb-4 text-center text-gray-800">Your Coupons</h2>
				{userCoupons && userCoupons.length > 0 ? (
					<ul className="divide-y divide-gray-200">
						{userCoupons.map((coupon, index) => (
							<li key={index} className="flex justify-between items-center p-2 hover:bg-gray-100 rounded">
								<div className="tooltip" data-tooltip="Coupon Code">
									<span className="font-medium text-gray-700">{coupon.code}</span>
								</div>
								<div className="tooltip" data-tooltip="Coupon Type">
									<span className="text-sm text-gray-500">{coupon.type}</span>
								</div>
								<div className="tooltip" data-tooltip="Coupon Value">
									<span className="text-sm text-green-600 font-bold">{coupon.value}</span>
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
