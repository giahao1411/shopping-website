import React from "react";
import { BiSolidUserCircle } from "react-icons/bi";

const ProfileModal = ({ isOpen, onClose }) => {
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
                    <div className="pb-3">
                        <button
                            type="button"
                            className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                        >
                            Change photo
                        </button>
                        <button
                            type="button"
                            className="py-2.5 px-5 ms-3 text-blue-500 font-medium rounded-lg border border-blue-200 hover:bg-gray-100 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                        >
                            Remove photo
                        </button>
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-black text-left "
                        >
                            Your email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="bg-white border border-black-500/75 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="location"
                            className="block mb-2 text-sm font-medium text-black text-left"
                        >
                            Location
                        </label>
                        <div className="relative">
                            <select
                                name="location"
                                id="location"
                                className="bg-white border border-black-500/75 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 placeholder-gray-400"
                                required
                            >
                                <option value="">Select your location</option>
                                <option value="New York">New York</option>
                                <option value="Los Angeles">Los Angeles</option>
                                <option value="San Francisco">
                                    San Francisco
                                </option>
                                <option value="Chicago">Chicago</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="location"
                            className="block mb-2 text-sm font-medium text-black text-left"
                        >
                            Gender
                        </label>
                        <div className="relative">
                            <select
                                name="gender"
                                id="gender"
                                className="bg-white border border-black-500/75 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 placeholder-gray-400"
                                required
                            >
                                <option value="">Select your gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-center p-4">
                    <button
                        type="button"
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-blue-300"
                        onClick={onClose}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
