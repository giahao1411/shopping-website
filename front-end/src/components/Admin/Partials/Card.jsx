import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiBox } from "react-icons/bi";

const Card = () => {
	const [userCount, setUserCount] = useState(0);
	const [productCount, setProductCount] = useState(0);
	const [orderCount, setOrderCount] = useState(0);

	const api = import.meta.env.VITE_APP_URL;

	useEffect(() => {
		const fecthInfo = async () => {
			try {
				const response = await axios.get(`${api}/api/user-information/count/all`);

				if (response.status === 200) {
					setUserCount(response.data.users);
					setProductCount(response.data.products);
					setOrderCount(response.data.orders);
				}
			} catch (error) {
				if (error.response) {
					alert(error.response.data.message);
				} else {
					console.error("Error fetching information", error);
				}
			}
		};

		fecthInfo();
	}, []);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
			<div className="flex flex-col items-center bg-gray-200 p-5 rounded-lg">
				<div className="flex items-center justify-center text-4xl p-5 rounded-2xl text-gray-600">
					<BiBox />
				</div>
				<div className="w-full text-center py-2 text-gray-600 rounded-lg">
					<h2 className="text-xl font-bold">{userCount}</h2>
					<h1 className="text-2xl">Users</h1>
				</div>
			</div>

			<div className="flex flex-col items-center bg-gray-200 p-5 rounded-lg">
				<div className="flex items-center justify-center text-4xl p-5 rounded-2xl text-gray-600">
					<BiBox />
				</div>
				<div className="w-full text-center py-2 text-gray-600 rounded-lg">
					<h2 className="text-xl font-bold">{productCount}</h2>
					<h1 className="text-2xl">Products</h1>
				</div>
			</div>

			<div className="flex flex-col items-center bg-gray-200 p-5 rounded-lg">
				<div className="flex items-center justify-center text-4xl p-5 rounded-2xl text-gray-600">
					<BiBox />
				</div>
				<div className="w-full text-center py-2 text-gray-600 rounded-lg">
					<h2 className="text-xl font-bold">{orderCount}</h2>
					<h1 className="text-2xl">Orders</h1>
				</div>
			</div>
		</div>
	);
};

export default Card;
