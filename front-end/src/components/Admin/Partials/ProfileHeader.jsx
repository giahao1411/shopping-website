import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import TaskModal from "../Modals/TaskModal";

const ProfileHeader = ({ createTask }) => {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    const toggleTaskModal = () => {
        setIsTaskModalOpen((prevState) => !prevState);
    };

    return (
        <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold text-gray-800">Profile</h2>
            <div className="flex items-center">
                <div className="bg-gray-200 p-3 rounded-lg text-gray-500 flex items-center -mt-6">
                    <BiEdit
                        className="text-xl transition-transform duration-200 ease-in-out hover:scale-110"
                        onClick={toggleTaskModal}
                    />
                </div>
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
