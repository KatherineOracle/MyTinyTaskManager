const express = require('express');
const router = express.Router();
const path = require("path"); //for heroku

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


if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*',(req,res)=> {res.sendFile(path.resolve(__dirname,
    'client', 'build','index.html'));
    });
    }    
module.exports = router
