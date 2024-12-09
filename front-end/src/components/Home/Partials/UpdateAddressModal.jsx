import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateAddressModal = ({
    isOpen,
    onClose,
    userId,
    oldAddress,
    onUpdateAddress,
}) => {
    const [updatedAddress, setUpdatedAddress] = useState(oldAddress);

    const api = import.meta.env.VITE_APP_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedAddress = updatedAddress.trim();
        if (!trimmedAddress) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.patch(
                `${api}/api/user/users/${userId}/update-address`,
                {
                    oldAddress: oldAddress,
                    newAddress: trimmedAddress,
                }
            );

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                onUpdateAddress(oldAddress, trimmedAddress);
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
        isOpen && (
            <div
                className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-30"
                onClick={onClose}
            >
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
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <h3 className="text-xl font-semibold text-center">
                        Update Address
                    </h3>

                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="mb-4">
                            <label
                                htmlFor="address"
                                className="block mb-2 text-sm font-medium text-black"
                            >
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                value={updatedAddress}
                                onChange={(e) =>
                                    setUpdatedAddress(e.target.value)
                                }
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
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default UpdateAddressModal;
