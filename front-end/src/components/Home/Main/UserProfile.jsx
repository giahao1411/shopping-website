import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiPlus, BiSolidPencil, BiSolidUserCircle } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { SESSION } from "../../../libs/constant";
import AddCouponModal from "../Partials/AddCouponModal";
import CouponModal from "../Partials/CouponModal";
import CreateAddressModal from "../Partials/CreateAddressModal";
import CreatePhoneModal from "../Partials/CreatePhoneModal";
import ProfileModal from "../Partials/ProfileModal";
import UpdateAddressModal from "../Partials/UpdateAddressModal";
import UpdatePhoneModal from "../Partials/UpdatePhoneModal";

const UserProfile = () => {
	const storedUser = JSON.parse(localStorage.getItem(SESSION));
	if (!storedUser) {
		Swal.fire({
			icon: "error",
			title: "You need to login to view cart",
			showConfirmButton: false,
			timer: 1500,
		});
		return;
	}

	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [isUpdateOpen, setIsUpdateOpen] = useState(false);
	const [isCreatePhoneOpen, setIsCreatePhoneOpen] = useState(false);
	const [isUpdatePhoneOpen, setIsUpdatePhoneOpen] = useState(false);
	const [isCouponOpen, setIsAddCoupon] = useState(false);
	const [isViewCouponOpen, setIsViewCoupon] = useState(false);

	const [user, setUser] = useState("");

	const api = import.meta.env.VITE_APP_URL;

	const toggleProfileModal = () => {
		setIsProfileOpen((prevState) => !prevState);
	};

	const toggleCreateModal = () => {
		setIsCreateOpen((prevState) => !prevState);
	};

	const toggleUpdateModal = () => {
		setIsUpdateOpen((prevState) => !prevState);
	};

	const toggleCreatePhoneModal = () => {
		setIsCreatePhoneOpen((prevState) => !prevState);
	};

	const toggleUpdatePhoneModal = () => {
		setIsUpdatePhoneOpen((prevState) => !prevState);
	};

	const toggleAddCouponModal = () => {
		setIsAddCoupon((prevState) => !prevState);
	};

	const toggleCouponModal = () => {
		setIsViewCoupon((prevState) => !prevState);
	};

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get(`${api}/api/user/users/${storedUser.userId}`);
				const user = response.data.user;
				setUser(user);
			} catch (error) {
				if (error.response) {
					alert(error.response.data.message);
				} else {
					console.error(error);
				}
			}
		};

		fetchUserData();
	}, [storedUser.userId]);

	const onAddAddresses = async (newAddress) => {
		setUser((prevUser) => ({
			...prevUser,
			addresses: [...prevUser.addresses, newAddress],
		}));

		try {
			await axios.patch(`${api}/api/user/users/${storedUser.userId}/update-addresses`, {
				addresses: [...user.addresses, newAddress],
			});
		} catch (error) {
			if (error.response) {
				alert(error.response.data.message);
			} else {
				console.error(error);
			}
		}
	};

	const onUpdateAddress = (oldAddress, newAddress) => {
		setUser((prevUser) => ({
			...prevUser,
			addresses: prevUser.addresses.map((address) => (address === oldAddress ? newAddress : address)),
		}));
	};

	const deleteAddress = async (address) => {
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
				// set state before delete
				setUser((prevUser) => ({
					...prevUser,
					addresses: prevUser.addresses.filter((a) => a !== address),
				}));

				const response = await axios.delete(`${api}/api/user/users/${storedUser.userId}/delete-address/${address}`);

				if (response.status === 200) {
					Swal.fire({
						icon: "success",
						title: response.data.message,
						showConfirmButton: false,
						timer: 1500,
					});
				}
			} catch (error) {
				// restore if failed
				setUser((prevUser) => ({
					...prevUser,
					addresses: [...prevUser.addresses, address],
				}));

				if (error.response) {
					alert(error.response.data.message);
				} else {
					console.error(error);
				}
			}
		}
	};

	const onAddPhone = async (newPhone) => {
		setUser((prevUser) => ({
			...prevUser,
			phones: [...prevUser.phones, newPhone],
		}));

		try {
			await axios.patch(`${api}/api/user/users/${storedUser.userId}/update-phones`, {
				phones: [...user.phones, newPhone],
			});
		} catch (error) {
			if (error.response) {
				alert(error.response.data.message);
			} else {
				console.error(error);
			}
		}
	};

	const onUpdatePhone = (oldPhone, newPhone) => {
		setUser((prevUser) => ({
			...prevUser,
			phones: prevUser.phones.map((phone) => (phone === oldPhone ? newPhone : phone)),
		}));
	};

	const deletePhone = async (phone) => {
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
				setUser((prevUser) => ({
					...prevUser,
					phones: prevUser.phones.filter((p) => p !== phone),
				}));

				const response = await axios.delete(`${api}/api/user/users/${storedUser.userId}/delete-phone/${phone}`);

				if (response.status === 200) {
					Swal.fire({
						icon: "success",
						title: response.data.message,
						showConfirmButton: false,
						timer: 1500,
					});
				}
			} catch (error) {
				setUser((prevUser) => ({
					...prevUser,
					phones: [...prevUser.phones, phone],
				}));

				if (error.response) {
					alert(error.response.data.message);
				} else {
					console.error(error);
				}
			}
		}
	};

	const onAddCoupon = (couponCode) => {
		// Cập nhật coupons trong state trước khi gửi request tới API
		setUser((prevUser) => ({
			...prevUser,
			coupons: [...prevUser.coupons, couponCode],
		}));

		// Gửi request tới API để cập nhật coupon
		const addCouponToServer = async () => {
			try {
				const response = await axios.patch(`${api}/api/user/users/${storedUser.userId}/update-coupon`, {
					coupons: [...user.coupons, couponCode],
				});

				// Kiểm tra xem API có phản hồi thành công không
				if (response.status === 200) {
					Swal.fire({
						icon: "success",
						title: "Coupon added successfully!",
						showConfirmButton: false,
						timer: 1500,
					});
				} else {
					// Nếu thất bại, cần xóa coupon đã thêm từ state
					setUser((prevUser) => ({
						...prevUser,
						coupons: prevUser.coupons.filter((coupon) => coupon !== couponCode),
					}));
					Swal.fire({
						icon: "error",
						title: "Failed to add coupon",
						text: response.data.message || "An error occurred while adding the coupon.",
						showConfirmButton: true,
					});
				}
			} catch (error) {
				// Nếu có lỗi, cần xóa coupon đã thêm từ state
				setUser((prevUser) => ({
					...prevUser,
					coupons: prevUser.coupons.filter((coupon) => coupon !== couponCode),
				}));

				if (error.response) {
					Swal.fire({
						icon: "error",
						title: "Failed to add coupon",
						text: error.response.data.message || "An error occurred while adding the coupon.",
						showConfirmButton: true,
					});
				} else {
					Swal.fire({
						icon: "error",
						title: "Unexpected Error",
						text: error.message,
						showConfirmButton: true,
					});
				}
			}
		};

		// Gọi hàm gửi request
		window.location.reload(false);
	};

	return (
		<div className="min-h-screen flex justify-start pt-40 mx-40 pb-40">
			{/* Left card */}
			<div className="w-full h-auto max-w-sm max-h-dvh rounded overflow-hidden shadow">
				<div className="px-6 py-4">
					<div className="flex justify-between items-center">
						<div className="font-bold text-2xl text-center w-full">Personal</div>
						<BiSolidPencil className="text-2xl -mr-5 -mt-3 cursor-pointer" onClick={toggleProfileModal} />
					</div>
					<BiSolidUserCircle className="text-5xl size-4/6 m-auto" />
					<div className="text-center align-middle">
						<span className="font-semibold text-xl">{user.username}</span>
						<br />
						<span className="text-lg text-gray-400">{user.role}</span>
					</div>
					<div className="px-4 pt-4 pb-2 flex justify-center space-x-4">
						{/* Add Coupon Button */}
						<button
							className="place-items-center flex items-center bg-white hover:bg-gray-100 text-sky-600 font-semibold py-2 px-4 border border-blue-600 rounded "
							onClick={toggleAddCouponModal}
						>
							<BiPlus className="text-2xl mr-2" /> Add coupon
						</button>
						<AddCouponModal
							isOpen={isCouponOpen}
							onClose={toggleAddCouponModal}
							userId={storedUser.userId}
							onAddCoupon={onAddCoupon}
						/>

						{/* View Coupon Button */}
						<button
							className="place-items-center flex items-center bg-white hover:bg-gray-100 text-sky-600 font-semibold py-2 px-4 border border-blue-600 rounded "
							onClick={toggleCouponModal}
						>
							View
						</button>

						<CouponModal isOpen={isViewCouponOpen} onClose={toggleCouponModal} userCoupons={user.Usercoupons} />
					</div>
				</div>
			</div>

			{/* Right Card */}
			<div className="pl-10 max-w-4xl w-full">
				<p className="font-bold text-2xl">Location</p>

				{/* First Box - Projects */}
				<div className="max-w-90 max-h-80 rounded overflow-hidden shadow mt-1">
					<div className="px-6 py-4">
						<div className="flex justify-between items-center">
							<span className="font-bold text-xl text-left">Addresses</span>
							<BiPlus
								className="text-2xl text-blue-600 cursor-pointer hover:text-blue-700"
								onClick={toggleCreateModal}
							/>
						</div>
						<div className="max-w-90 max-h-80 text-gray-700 text-center text-black p-5">
							{user.addresses && user.addresses.length > 0 ? (
								<ul className="list-disc pl-5">
									{user.addresses.map((address, index) => (
										<li key={index} className="mb-2">
											<div className="flex items-center justify-between">
												<div className="flex-1 text-left">{address}</div>
												<div className="flex space-x-2 ">
													<MdModeEditOutline
														className="text-xl cursor-pointer hover:text-blue-700"
														onClick={toggleUpdateModal}
													/>
													<FaTrash
														className="text-xl cursor-pointer hover:text-red-700"
														onClick={() => deleteAddress(address)}
													/>
												</div>
											</div>
											<UpdateAddressModal
												isOpen={isUpdateOpen}
												onClose={toggleUpdateModal}
												oldAddress={address}
												userId={storedUser.userId}
												onUpdateAddress={onUpdateAddress}
											/>
										</li>
									))}
								</ul>
							) : (
								<p className="text-center text-black p-5">No addresses added yet.</p>
							)}
						</div>
					</div>
				</div>

				{/* New Box Below Experience */}
				<p className="font-bold text-2xl mt-20">Contact</p>
				<div className="max-w-90 max-h-80 rounded overflow-hidden shadow mt-1">
					<div className="px-6 py-4">
						<div className="flex justify-between items-center">
							<span className="font-bold text-xl text-left">Phone Numbers</span>
							<BiPlus
								className="text-2xl text-blue-600 cursor-pointer hover:text-blue-700"
								onClick={toggleCreatePhoneModal}
							/>
						</div>
						<div className="max-w-90 max-h-80 text-gray-700 text-center text-black p-5">
							{user.phones && user.phones.length > 0 ? (
								<ul className="list-disc pl-5">
									{user.phones.map((phone, index) => (
										<li key={index} className="mb-2">
											<div className="flex items-center justify-between">
												<div className="flex-1 text-left">{phone}</div>
												<div className="flex space-x-2 ">
													<MdModeEditOutline
														className="text-xl cursor-pointer hover:text-blue-700"
														onClick={toggleUpdatePhoneModal}
													/>
													<FaTrash
														className="text-xl cursor-pointer hover:text-red-700"
														onClick={() => deletePhone(phone)}
													/>
												</div>
											</div>
											<UpdatePhoneModal
												isOpen={isUpdatePhoneOpen}
												onClose={toggleUpdatePhoneModal}
												userId={storedUser.userId}
												oldPhone={phone}
												onUpdatePhone={onUpdatePhone}
											/>
										</li>
									))}
								</ul>
							) : (
								<p className="text-center text-black p-5">No phone numbers added yet.</p>
							)}
						</div>
					</div>
				</div>
			</div>

			<ProfileModal isOpen={isProfileOpen} onClose={toggleProfileModal} user={user} setUser={setUser} />

			<CreateAddressModal
				isOpen={isCreateOpen}
				onClose={toggleCreateModal}
				userId={storedUser.userId}
				onAddAddress={onAddAddresses}
			/>

			<CreatePhoneModal
				isOpen={isCreatePhoneOpen}
				onClose={toggleCreatePhoneModal}
				userId={storedUser.userId}
				onAddPhone={onAddPhone}
			/>
		</div>
	);
};

export default UserProfile;
