import React, { useEffect } from "react";
import "../../../styles/Admin/Modals/UserModal.css";

const UserModal = ({ isOpen, onClose, user }) => {
    if (!isOpen) return null;

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

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>User details</h2>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    value={user.username}
                    id="username"
                    disabled="true"
                />

                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    value={user.email}
                    id="email"
                    disabled="true"
                />

                <label htmlFor="phone">Phone</label>
                <input
                    type="text"
                    value={user.phone == null ? "null" : user.phone}
                    id="phone"
                    disabled="true"
                />

                <button onClick={onClose} className="close-btn">
                    Close
                </button>
            </div>
        </div>
    );
};

export default UserModal;
