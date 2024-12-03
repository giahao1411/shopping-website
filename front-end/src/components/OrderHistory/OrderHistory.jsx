import React, { useState, useEffect } from "react";
import axios from "axios";
import { SESSION } from "../../libs/constant";
import { useNavigate } from "react-router-dom";
import "../../styles/OrderHistory/OrderHistory.css";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            const storedUser = JSON.parse(localStorage.getItem(SESSION));
            if (!storedUser) {
                setError("You need to log in to view your order history.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:8080/api/orders/${storedUser._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${storedUser.token}`,
                        },
                    }
                );
                setOrders(response.data.orders); 
            } catch (err) {
                setError("Failed to load order history.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleBack = () => {
        navigate(-1); // Trở lại trang trước đó
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="order-history">
            <h2>Order History</h2>
            {orders.length === 0 ? (
                <p>You have no orders yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button className="back-button" onClick={handleBack}>Back</button>
        </div>
    );
};

export default OrderHistory;
