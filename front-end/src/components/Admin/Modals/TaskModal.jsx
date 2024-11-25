import React, { useState, useEffect } from "react";
import "../../../styles/Admin/Modals/TaskModal.css";

const TaskModal = ({ isOpen, onClose, onSubmit }) => {
    const [taskName, setTaskName] = useState("");
    const [importance, setImportance] = useState("Low");

    if (!isOpen) return null;

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!taskName.trim()) {
            alert("Task name is required");
            return;
        }

        const newTask = { taskName, importance };

        onSubmit(newTask);

        setTaskName("");
        setImportance("Low");
        onClose();
    };

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
                <h2>Create Task</h2>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="task-name">Task Name</label>
                    <input
                        type="text"
                        id="task-name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />

                    <label htmlFor="task-importance">Task Importance</label>
                    <select
                        id="task-importance"
                        value={importance}
                        onChange={(e) => setImportance(e.target.value)}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>

                    <button type="submit" className="create-btn">
                        Create
                    </button>
                    <button
                        type="button"
                        className="close-btn"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
