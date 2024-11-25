import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/Admin/User.css";
import {
    BiInfoCircle,
    BiSolidChevronLeft,
    BiSolidChevronRight,
} from "react-icons/bi";
import UserModal from "../Modals/UserModal";

const User = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/user/users?page=${page}&limit=5`
            );

            if (response.status === 200) {
                setUsers(response.data.users);
                setTotalPage(response.data.totalPages);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleBackward = () => {
        // make sure not down below 1
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleForward = () => {
        setPage((prevPage) =>
            prevPage < totalPages ? prevPage + 1 : prevPage
        );
    };

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

    const getUserDetail = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchUsers();
    }, [page]);

    return (
        <div className="user-list">
            <div className="list-header">
                <h2>Users</h2>
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
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={user._id || index}
                                onClick={() => getUserDetail(user)}
                            >
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.phone == null ? "null" : user.phone}
                                </td>
                                <td>{<BiInfoCircle className="info" />}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <UserModal
                isOpen={isModalOpen}
                onClose={closeModal}
                user={selectedUser}
            />
        </div>
    );
};

export default User;
