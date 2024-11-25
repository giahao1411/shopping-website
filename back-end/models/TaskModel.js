const { Schema, model } = require("mongoose");

const TaskSchema = new Schema({
    taskName: { type: String, require: true },
    importance: {
        type: String,
        enum: ["Low", "Medium", "High"],
        require: true,
    },
});

module.exports = model("Task", TaskSchema);
