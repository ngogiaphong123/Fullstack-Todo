const Task = require('../models/task');
module.exports.showFullTasks = async(req,res) => {
    const tasks = await Task.find();
    res.json(tasks);
}
module.exports.createTask = async(req,res) => {
    const task = new Task({
        text: req.body.text
    });
    await task.save();
    res.json(task);
}
module.exports.deleteTask = async(req,res) => {
    const {id} = req.params;
    const result = await Task.findByIdAndDelete(id);
    res.json(result);
}
module.exports.toggleCompleted = async (req, res) => {
    const { id } = req.params;
    const result = await Task.findById(id);
    result.completed = !result.completed;
    await result.save();
    res.json(result);
}