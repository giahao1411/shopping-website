import React, { useState } from "react";

const TaskModal = ({ isTaskOpen, taskClose, createTask }) => {
    const [taskName, setTaskName] = useState("");
    const [importance, setImportance] = useState("Low");

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
            <div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                onClick={taskClose}
            >
                <div
                    className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
                        Create Task
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <label
                            htmlFor="task-name"
                            className="block mb-2 text-sm font-semibold text-gray-600"
                        >
                            Task name
                        </label>
                        <input
                            type="text"
                            id="task-name"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        />

                        <label
                            htmlFor="importance"
                            className="block mb-2 text-sm font-semibold text-gray-600"
                        >
                            Importance
                        </label>
                        <select
                            id="importance"
                            value={importance}
                            onChange={(e) => setImportance(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>

                        <div className="flex justify-between mt-4">
                            <button
                                type="submit"
                                className="w-1/2 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                            >
                                Create
                            </button>
                            <button
                                type="button"
                                className="w-1/2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ml-2"
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
