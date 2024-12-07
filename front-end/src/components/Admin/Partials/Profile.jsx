import React, { useState, useEffect } from "react";
import axios from "axios";
import userImage from "../../../assets/image.jpg";
import { BiBook } from "react-icons/bi";
import ProfileHeader from "./ProfileHeader";

const Profile = () => {
    const [tasks, setTasks] = useState([]);

    // get tasks
    const fetchTasks = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/task/tasks"
            );

            if (response.status === 200) {
                setTasks(response.data);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // delete task on click
    const deleteTask = async (taskID) => {
        try {
            const response = await axios.delete(
                `http://localhost:8080/api/task/delete/${taskID}`
            );

            if (response.status === 200) {
                alert(response.data.message);
                // no need to useEffect on delete by reState the task
                setTasks((prevTask) =>
                    prevTask.filter((t) => t._id !== taskID)
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    const createTask = async (newTask) => {
        try {
            const response = await axios.post(
                "http://localhost:8080/api/task/tasks",
                newTask
            );

            if (response.status === 200) {
                setTasks((prevTask) => [...prevTask, response.data.task]);
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="flex-1">
            <ProfileHeader createTask={createTask} />

            <div className="lg:h-[90%] sm:h-[55%] mt-4 bg-gray-200 rounded-lg p-3 flex flex-col">
                <div className="mb-4 w-full h-[250px] flex flex-col items-center justify-center">
                    <img
                        src={userImage}
                        alt="Profile"
                        className="bg-white rounded-full w-[150px] my-2"
                    />
                    <h3 className="text-2xl text-gray-700 font-semibold">
                        Admin
                    </h3>
                    <span className="text-gray-500">Administrator</span>
                </div>

                <div className="bg-white flex-1 rounded-lg p-3 flex flex-col gap-2 max-w-full max-h-max">
                    {tasks.map((task, index) => (
                        <div
                            className="bg-gray-200 p-3 flex items-center justify-between rounded-lg shadow-md hover:bg-gray-300 cursor-pointer w-full"
                            key={task._id || index}
                            onClick={() => deleteTask(task._id)}
                        >
                            <div className="flex gap-5 items-center w-full">
                                <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full text-lg flex-shrink-0">
                                    <BiBook />
                                </div>
                                <div className="truncate w-[150px]">
                                    <h5 className="text-md font-semibold text-gray-700 truncate">
                                        {task.taskName}
                                    </h5>
                                    <span className="text-sm text-gray-500">
                                        {task.importance}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
