const mongoose = require("mongoose");
const {Schema} = mongoose;

const TaskSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type : Boolean,
        default: false
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;