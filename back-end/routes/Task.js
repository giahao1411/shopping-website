const express = require("express");
const router = express.Router();

const Task = require("../models/TaskModel");

// get all tasks (5 tasks existed a time)
router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// create task
router.post("/tasks", async (req, res) => {
    try {
        const taskCount = await Task.countDocuments();
        if (taskCount >= 5) {
            return res
                .status(400)
                .json({ message: "Only 5 tasks are allowed at a time." });
        }

        const { taskName, importance } = req.body;
        const newTask = new Task({ taskName, importance });
        await newTask.save();

        return res
            .status(200)
            .json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// delete task
router.delete("/delete/:id", async (req, res) => {
    const taskID = req.params.id;

    try {
        const deleteTask = await Task.findByIdAndDelete(taskID);
        if (!deleteTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res
            .status(200)
            .json({ message: "Task deleted successfully", task: deleteTask });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
