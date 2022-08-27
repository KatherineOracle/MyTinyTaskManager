const express = require('express');
const router = express.Router();

const  { 
    postTask,
    readAllTasks,
    readTask,
    updateTask, 
    updateManyTasks,    
    deleteTask
} = require('./controllers/api.js')

router.route('/')
    .get(readAllTasks)
    .post(postTask) 
    .put(updateManyTasks)    

router.route('/:id')
    .get(readTask)
    .put(updateTask)
    .delete(deleteTask)

module.exports = router
