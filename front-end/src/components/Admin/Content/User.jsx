import React from "react";
import { BiInfoCircle } from "react-icons/bi";
import "../../../styles/Admin/User.css";

const users = [
    { name: "Gia Hao Tran", email: "john@gmail.com", phone: "0123456789" },
    {
        name: "Nguyen Gia Huy Tong",
        email: "john@gmail.com",
        phone: "0123456789",
    },
    { name: "Nhat Hao Vo", email: "john@gmail.com", phone: "0123456789" },
];

const User = () => {
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
                        {users.map((user) => (
                            <tr>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
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
