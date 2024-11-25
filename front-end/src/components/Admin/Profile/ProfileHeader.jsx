import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import TaskModal from "../Modals/TaskModal";

const ProfileHeader = ({ onSubmitTask }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        console.log("change");
        setIsModalOpen((prevState) => !prevState);
    };

    return (
        <div className="profile-header">
            <h2 className="header-title">Profile</h2>
            <div className="edit">
                <BiEdit className="icon" onClick={toggleModal} />
            </div>

            <TaskModal
                isOpen={isModalOpen}
                onClose={toggleModal}
                onSubmit={onSubmitTask}
            />
        </div>
    );
};

export default ProfileHeader;
