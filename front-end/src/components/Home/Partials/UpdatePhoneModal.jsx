import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UpdatePhoneModal = ({
    isOpen,
    onClose,
    userId,
    oldPhone,
    onUpdatePhone,
}) => {
    const [updatedPhone, setUpdatedPhone] = useState(oldPhone);
    const api = import.meta.env.VITE_APP_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedPhone = updatedPhone.trim();
        if (!trimmedPhone) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.patch(
                `${api}/api/user/users/${userId}/update-phone`,
                {
                    oldPhone: oldPhone,
                    newPhone: trimmedPhone,
                }
            );

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                onUpdatePhone(oldPhone, trimmedPhone);
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
                        Update Phone Number
                    </h3>

                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="mb-4">
                            <label
                                htmlFor="phone"
                                className="block mb-2 text-sm font-medium text-black"
                            >
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="phone"
                                value={updatedPhone}
                                onChange={(e) =>
                                    setUpdatedPhone(e.target.value)
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

export default UpdatePhoneModal;
