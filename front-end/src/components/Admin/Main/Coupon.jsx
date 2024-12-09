import React, { useEffect, useState } from "react";

const Coupon = () => {
	const [coupons, setCoupons] = useState([]); // Dữ liệu coupon
	const [page, setPage] = useState(1); // Trang hiện tại
	const [totalPage, setTotalPage] = useState(1); // Tổng số trang
	const api = import.meta.env.VITE_APP_URL;

	// Gọi API để lấy danh sách coupon
	useEffect(() => {
		const fetchCoupons = async () => {
			try {
				const response = await fetch(`${api}/coupon/coupons?page=${page}&limit=8`);
				const data = await response.json();

				// Cập nhật dữ liệu và tổng số trang
				setCoupons(data.coupons);
				setTotalPage(data.totalPages);
			} catch (error) {
				console.error("Error fetching coupons:", error);
			}
		};

		fetchCoupons();
	}, [page, api]); // Mỗi khi `page` thay đổi, sẽ gọi lại API

	// Chuyển sang trang tiếp theo
	const nextPage = () => {
		if (page < totalPage) {
			setPage(page + 1);
		}
	};

	// Chuyển sang trang trước đó
	const prevPage = () => {
		if (page > 1) {
			setPage(page - 1);
		}
	};

	return (
		<div>
			<h1>Coupon List</h1>

			{/* Hiển thị danh sách coupon */}
			<table>
				<thead>
					<tr>
						<th>Coupon Code</th>
						<th>Name</th>
						<th>Type</th>
						<th>Value</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{coupons.map((coupon) => (
						<tr key={coupon.code}>
							<td>{coupon.code}</td>
							<td>{coupon.name}</td>
							<td>{coupon.type}</td>
							<td>{coupon.value}</td>
							<td>{coupon.status}</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* Điều hướng phân trang */}
			<div>
				<button onClick={prevPage} disabled={page <= 1}>
					Previous
				</button>
				<span>
					Page {page} of {totalPage}
				</span>
				<button onClick={nextPage} disabled={page >= totalPage}>
					Next
				</button>
			</div>
		</div>
	);
};

export default Coupon;
