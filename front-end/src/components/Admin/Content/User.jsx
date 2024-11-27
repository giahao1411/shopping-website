import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/Admin/User.css";
import {
    BiInfoCircle,
    BiSolidChevronLeft,
    BiSolidChevronRight,
    BiLockAlt,
    BiLockOpenAlt,
} from "react-icons/bi";
import UserModal from "../Modals/UserModal";

const User = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    // get users by page
    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/user/users?page=${page}&limit=7`
            );

            if (response.status === 200) {
                setUsers(response.data.users);
                setTotalPage(response.data.totalPages);
            }
        } catch (error) {
            console.error(error);
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

    // get user detail and open user modal
    const getUserDetail = (user) => {
        setSelectedUser(user);
        setIsUserModalOpen(true);
    };

    // on close modal and reset selectedUser state
    const closeModal = () => {
        setSelectedUser(null);
        setIsUserModalOpen(false);
    };

    // update user information
    const updateUser = async (updatedUser) => {
        try {
            const response = await axios.patch(
                `http://localhost:8080/api/user/users/${selectedUser._id}`,
                updatedUser
            );

            if (response.status === 200) {
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user._id === selectedUser._id
                            ? { ...user, ...updatedUser }
                            : user
                    )
                );
                closeModal();
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                console.error(error);
            }
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
            console.error(error);
        }
    };

    // states on change
    useEffect(() => {
        fetchUsers();
    }, [page, users]);

    return (
        <div className="user-list">
            <h1>User Management</h1>
            <div className="list-header">
                <h2>User List</h2>
                <div className="pagination">
                    <BiSolidChevronLeft
                        onClick={handleBackward}
                        className="page-move"
                    />
                    <input
                        type="number"
                        min="1"
                        max={totalPages}
                        value={page}
                        onChange={handleInputChange}
                    />
                    <BiSolidChevronRight
                        onClick={handleForward}
                        className="page-move"
                    />
                </div>
            </div>
            <div className="list-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id || index}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.phone == null ? "null" : user.phone}
                                </td>
                                <td className={`user-status-${user.status}`}>
                                    {user.status}
                                </td>
                                <td>
                                    {user.email !== "admin@gmail.com" && (
                                        <>
                                            <BiInfoCircle
                                                className="action"
                                                onClick={() =>
                                                    getUserDetail(user)
                                                }
                                            />
                                            {user.status === "active" ? (
                                                <BiLockAlt
                                                    className="action"
                                                    onClick={() =>
                                                        changeUserStatus(
                                                            user._id
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <BiLockOpenAlt
                                                    className="action"
                                                    onClick={() =>
                                                        changeUserStatus(
                                                            user._id
                                                        )
                                                    }
                                                />
                                            )}
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="table-footer">
                    Page {page} / {totalPages}
                </p>
            </div>

            <UserModal
                isUserOpen={isUserModalOpen}
                onClose={closeModal}
                user={selectedUser}
                updateUser={updateUser}
            />
        </div>
    );
};

export default User;
