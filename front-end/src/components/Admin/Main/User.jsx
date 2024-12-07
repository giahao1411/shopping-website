import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    BiSolidChevronLeft,
    BiSolidChevronRight,
    BiLockAlt,
    BiLockOpenAlt,
} from "react-icons/bi";

const User = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPage] = useState(1);

    // get users by page
    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/user/users?page=${page}&limit=8`
            );

            if (response.status === 200) {
                setUsers(response.data.users);
                setTotalPage(response.data.totalPages);
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                console.error(error);
            }
        }
    };

    // move backward 1 page
    const handleBackward = () => {
        // make sure not down below 1
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    // move forward 1 page
    const handleForward = () => {
        setPage((prevPage) =>
            prevPage < totalPages ? prevPage + 1 : prevPage
        );
    };

    // page input field
    const handleInputChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (value > 0 && value <= totalPages) {
            setPage(value);
        } else if (value > totalPages) {
            setPage(totalPages);
        } else {
            setPage(1);
        }
    };

    // change user status handle
    const changeUserStatus = async (userID) => {
        try {
            const response = await axios.patch(
                `http://localhost:8080/api/user/users/status/${userID}`
            );

            if (response.status === 200) {
                return;
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                console.error(error);
            }
        }
    };

    // states on change
    useEffect(() => {
        fetchUsers();
    }, [page, users]);

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-4 text-gray-700">
                User Management
            </h1>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">User List</h2>
                <div className="flex items-center space-x-2">
                    <BiSolidChevronLeft
                        onClick={handleBackward}
                        className="text-xl cursor-pointer hover:text-blue-500"
                    />
                    <input
                        type="number"
                        min="1"
                        max={totalPages}
                        value={page}
                        onChange={handleInputChange}
                        className="w-14 p-1 border border-gray-300 rounded-md text-center outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <BiSolidChevronRight
                        onClick={handleForward}
                        className="text-xl cursor-pointer hover:text-blue-500"
                    />
                </div>
            </div>

            <div>
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border border-gray-200 text-center">
                                Username
                            </th>
                            <th className="px-4 py-2 border border-gray-200 text-center">
                                Email
                            </th>
                            <th className="px-4 py-2 border border-gray-200 text-center">
                                Phone
                            </th>
                            <th className="px-4 py-2 border border-gray-200 text-center">
                                Status
                            </th>
                            <th className="px-4 py-2 border border-gray-200 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={user._id || index}
                                className={
                                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                }
                            >
                                <td className="px-4 py-3 border border-gray-200 text-center">
                                    {user.username}
                                </td>
                                <td className="px-4 py-3 border border-gray-200 text-center">
                                    {user.email}
                                </td>
                                <td className="px-4 py-3 border border-gray-200 text-center">
                                    {user.phone == null ? "null" : user.phone}
                                </td>
                                <td
                                    className={`px-4 py-3 border border-gray-200 text-center ${
                                        user.status === "active"
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {user.status}
                                </td>
                                <td className="px-4 py-3 border border-gray-200">
                                    <div className="flex justify-center">
                                        {user.email !== "admin@gmail.com" && (
                                            <>
                                                {user.status === "active" ? (
                                                    <BiLockAlt
                                                        className="text-xl cursor-pointer hover:text-blue-500"
                                                        onClick={() =>
                                                            changeUserStatus(
                                                                user._id
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <BiLockOpenAlt
                                                        className="text-xl cursor-pointer hover:text-blue-500"
                                                        onClick={() =>
                                                            changeUserStatus(
                                                                user._id
                                                            )
                                                        }
                                                    />
                                                )}
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="px-4 pt-10 text-center font-semibold text-gray-700">
                    Page {page} / {totalPages}
                </p>
            </div>
        </div>
    );
};

export default User;
