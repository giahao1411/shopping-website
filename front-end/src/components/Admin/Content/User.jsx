import React, { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import axios from "axios";
import "../../../styles/Admin/User.css";

const User = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/user/users"
            );

            console.log(response.data);

            if (response.status === 200) {
                setUsers(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="user-list">
            <div className="list-header">
                <h2>Users</h2>
                <select>
                    <option value="ascending">A - Z</option>
                    <option value="descending">Z - A</option>
                </select>
            </div>

            <div className="list-container">
                <table class="user-table">
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Detail</th>
                    </tr>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
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
        </div>
    );
};

export default User;
