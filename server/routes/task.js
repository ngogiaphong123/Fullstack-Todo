const express= require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Task = require('../models/task');
router.get('/',async(req,res) => {
    const tasks = await Task.find();
    res.json(tasks);
})
router.post('/',async(req,res) => {
    const task = new Task({
        text: req.body.text
    });
    await task.save();
    res.json(task);
})
router.delete('/:id',async(req,res) => {
    const {id} = req.params;
    const result = await Task.findByIdAndDelete(id);
    res.json(result);
})
router.put("/complete/:id", async (req, res) => {
    const { id } = req.params;
    const result = await Task.findById(id);
    result.completed = !result.completed;
    await result.save();
    res.json(result);
})
module.exports = router;