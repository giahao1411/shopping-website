import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/Admin/Profile.css";
import userImage from "../../../assets/image.jpg";
import { BiBook } from "react-icons/bi";
import ProfileHeader from "./ProfileHeader";

const Profile = () => {
    const [tasks, setTasks] = useState([]);

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

    const deleteTask = async (taskID) => {
        try {
            const response = await axios.delete(
                `http://localhost:8080/api/task/delete/${taskID}`
            );

            if (response.status === 200) {
                alert(response.data.message);
                setTasks((prevTask) =>
                    prevTask.filter((t) => t._id !== taskID)
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="profile">
            <ProfileHeader />

            <div className="user-profile">
                <div className="user-detail">
                    <img src={userImage} alt="" />
                    <h3 className="username">Admin</h3>
                    <span className="profession">Administrator</span>
                </div>

                <div className="admin-tasks">
                    {tasks.map((task, index) => (
                        <div
                            className="task"
                            key={task._id || index}
                            onClick={() => deleteTask(task._id)}
                        >
                            <div className="task-detail">
                                <div className="task-cover">
                                    <BiBook />
                                </div>
                                <div className="task-name">
                                    <h5 className="title">{task.taskName}</h5>
                                    <span className="importance">
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
