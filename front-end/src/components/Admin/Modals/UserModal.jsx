import React, { useEffect, useState } from "react";
import "../../../styles/Admin/Modals/UserModal.css";

const validatePhone = (phone) => {
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phone);
};

const UserModal = ({ isUserOpen, onClose, user, updateUser }) => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    // ESC key activate
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    useEffect(() => {
        if (user) {
            setUserName(user.username || "");
            setEmail(user.email || "");
            setPhone(user.phone || "");
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validatePhone(phone)) {
            alert("Phone contains 0 and 9 numbers come after");
            return;
        }
        updateUser({ username, email, phone }); // pass data back to parent component
    };

    return (
        isUserOpen && (
            <div className="user-modal-overlay" onClick={onClose}>
                <div
                    className="user-modal-content"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2>User details</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            value={username}
                            id="username"
                            onChange={(e) => setUserName(e.target.value)}
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            value={email}
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label htmlFor="phone">Phone</label>
                        <input
                            type="number"
                            value={phone}
                            id="phone"
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        <div className="user-action">
                            <button type="submit" className="user-update-btn">
                                Update
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="user-close-btn"
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default UserModal;
