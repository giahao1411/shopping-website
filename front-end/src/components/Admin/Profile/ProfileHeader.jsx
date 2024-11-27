import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import TaskModal from "../Modals/TaskModal";

const ProfileHeader = ({ createTask }) => {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    const toggleTaskModal = () => {
        setIsTaskModalOpen((prevState) => !prevState);
    };

    return (
        <div className="profile-header">
            <h2 className="header-title">Profile</h2>
            <div className="edit">
                <BiEdit className="icon" onClick={toggleTaskModal} />
            </div>

            <TaskModal
                isTaskOpen={isTaskModalOpen}
                taskClose={toggleTaskModal}
                createTask={createTask}
            />
        </div>
    );
};

export default ProfileHeader;
