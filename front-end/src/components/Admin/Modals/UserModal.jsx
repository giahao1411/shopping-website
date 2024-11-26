import React, { useEffect } from "react";
import "../../../styles/Admin/Modals/UserModal.css";

const UserModal = ({ isUserOpen, onClose, user }) => {
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
        isUserOpen && (
            <div className="user-modal-overlay">
                <div className="user-modal-content">
                    <h2>User details</h2>
                    <label htmlFor="username">Username</label>
                    <input type="text" value={user.username} id="username" />

                    <label htmlFor="email">Email</label>
                    <input type="text" value={user.email} id="email" />

                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        value={user.phone == null ? "null" : user.phone}
                        id="phone"
                    />

                    <div className="user-action">
                        <button className="user-update-btn">Update</button>
                        <button onClick={onClose} className="user-close-btn">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default UserModal;
