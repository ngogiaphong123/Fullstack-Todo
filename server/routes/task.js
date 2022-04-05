const express= require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Task = require('../models/task');
const { showFullTasks, createTask, deleteTask, toggleCompleted } = require('../controllers/task');
router.get('/',showFullTasks)
router.post('/',createTask)
router.delete('/:id',deleteTask)
router.put("/complete/:id", toggleCompleted)
module.exports = router;