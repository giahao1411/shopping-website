import axios from "axios";
import React, { useEffect, useState } from "react";

const api = import.meta.env.VITE_APP_URL; // Đảm bảo api là biến đúng

const RankingTable = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchTopUsers = async () => {
			try {
				const response = await axios.get(`${api}/api/user-information/top-user`);
				setUsers(response.data.topUsers);
			} catch (error) {
				if (error.response) {
					alert(error.response.data.message);
				} else {
					console.error("Error fetching top users", error);
				}
			}
		};

		fetchTopUsers();
	}, []);

	return (
		<div>
			<h2 className="text-3xl text-left font-semibold text-gray-700">Top 5 customers</h2>
			<div className="pt-10">
				<table className="table-auto w-full border-none">
					<thead>
						<tr>
							<th className="px-4 py-2 text-center border-none">#</th>
							<th className="px-4 py-2 text-center border-none">Customer's username</th>
							<th className="px-4 py-2 text-center border-none">Spent</th>
							<th className="px-4 py-2 text-center border-none">Items bought</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => (
							<tr className="hover:bg-gray-200 transition ease-in-out" key={index}>
								<td className="px-4 py-5 text-center border-none">{index + 1}</td>
								<td className="px-4 py-5 text-center border-none">{user.username}</td>
								<td className="px-4 py-5 text-center border-none">${user.totalSpent.toFixed(2)}</td>
								<td className="px-4 py-5 text-center border-none">{user.totalItems} products bought</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default RankingTable;
