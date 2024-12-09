import React, { useState, useEffect } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import Swal from "sweetalert2";
import axios from "axios";

const ProfileModal = ({ isOpen, onClose, user, setUser }) => {
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const api = import.meta.env.VITE_APP_URL;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleChangePassword = async () => {
        setIsChangePassword((prev) => !prev);
        if (isChangePassword) {
            try {
                const response = await axios.patch(
                    `${api}/account/change-password`,
                    {
                        email: user.email,
                        currentPassword: currentPassword,
                        newPassword: newPassword,
                    }
                );

                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    onClose();
                    setCurrentPassword("");
                    setNewPassword("");
                }
            } catch (error) {
                if (error.response) {
                    Swal.fire({
                        icon: "error",
                        title: error.response.data.message,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    console.error(error.message);
                }
            }
        }
    };

    const handleSave = async () => {
        const updatedUser = {
            username: user.username,
        };
        try {
            const response = await axios.patch(
                `${api}/api/user/users/update/${user._id}`,
                updatedUser
            );

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                onClose();
            }
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    icon: "error",
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                console.error(error.message);
            }
        }
    };

    return (
        <div
            id="default-modal"
            tabIndex="-1"
            aria-hidden={!isOpen}
            className={`fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-30 ${
                isOpen ? "" : "hidden"
            }`}
            onClick={onClose}
        >
            <div
                className="p-4 w-full max-w-md bg-white border border-black rounded-lg shadow-lg relative"
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
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Modal Header */}
                <div className="flex flex-col items-center p-4">
                    <h3 className="text-xl font-semibold text-black text-center">
                        Profile Details
                    </h3>
                </div>

                {/* Modal Body */}
                <div className="p-6 text-center">
                    <BiSolidUserCircle className="text-2xl size-2/3 ml-auto mr-auto -mt-10" />
                    <div className="mb-2">
                        <label
                            htmlFor="username"
                            className="block mb-2 text-sm font-medium text-black text-left "
                        >
                            Your username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={user.username}
                            onChange={handleInputChange}
                            placeholder="Enter your user name"
                            className="bg-white border border-black-500/75 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                        />
                    </div>

                    {isChangePassword && (
                        <>
                            <div className="mb-2">
                                <label
                                    htmlFor="currentPassword"
                                    className="block mb-2 text-sm font-medium text-black text-left "
                                >
                                    Your current password
                                </label>
                                <input
                                    type="text"
                                    name="currentPassword"
                                    id="currentPassword"
                                    value={currentPassword}
                                    onChange={(e) =>
                                        setCurrentPassword(e.target.value)
                                    }
                                    className="bg-white border border-black-500/75 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                                    placeholder="Enter your current password"
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="newPassword"
                                    className="block mb-2 text-sm font-medium text-black text-left "
                                >
                                    Your new password
                                </label>
                                <input
                                    type="text"
                                    name="newPassword"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    className="bg-white border border-black-500/75 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                                    placeholder="Enter your new password"
                                />
                            </div>
                        </>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="flex justify-center space-x-4">
                    {isChangePassword ? (
                        <button
                            type="button"
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-red-300 dark:focus:ring-red-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                            onClick={() => setIsChangePassword((prev) => !prev)}
                        >
                            Cancel
                        </button>
                    ) : (
                        ""
                    )}
                    <button
                        type="button"
                        className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-blue-300 dark:focus:ring-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                        onClick={handleChangePassword}
                    >
                        Change password
                    </button>
                    <button
                        type="button"
                        className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-green-300"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
