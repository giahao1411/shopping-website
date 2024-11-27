import React, { useState, useEffect } from "react";
import "../../../styles/Admin/Modals/TaskModal.css";

const TaskModal = ({ isTaskOpen, taskClose, createTask }) => {
    const [taskName, setTaskName] = useState("");
    const [importance, setImportance] = useState("Low");

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                taskClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = { taskName, importance };
        createTask(newTask);
        taskClose();

        setTaskName("");
        setImportance("Low");
    };

    return (
        isTaskOpen && (
            <div className="task-modal-overlay" onClick={taskClose}>
                <div
                    className="task-modal-content"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2>Create Task</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="task-name">Task name</label>
                        <input
                            type="text"
                            id="task-name"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />

                        <label
                            htmlFor="importance"
                            value={importance}
                            onChange={(e) => setImportance(e.target.value)}
                        >
                            Importance
                        </label>
                        <select id="importance">
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>

                        <div className="task-action">
                            <button type="submit" className="task-create-btn">
                                Create
                            </button>
                            <button
                                type="button"
                                className="task-close-btn"
                                onClick={taskClose}
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

export default TaskModal;
