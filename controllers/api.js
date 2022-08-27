/* The API controller
   Exports 6 methods:
   * postTask - Creates a new task
   * readTask - Returns a task
   * readAllTasks - Returns list of tasks
   * updateTask - Update single task
   * updateManyTasks - Bulk status update
   * deleteTask - Archives a task
*/
const mongoose = require("mongoose");
const TaskModel = require("../models/task.js");

const postTask = function (req, res) {
  TaskModel.create(
    {
      description: req.body.description,
      location: req.body.location,
      priority: req.body.priority
    },
    function (err, data) {
      if (err) {
        res
          .status(500)
          .send({ message: "Some error occurred while creating the task."});
      } else {
        console.log(data);
        res.status(200).send({ data: data });
      }
    }
  );
};

// locate a task by id.
const readTask = function (req, res) {
  TaskModel.findOne({ _id: req.params.id }, function (err, data) {
    if (err) {
      res
        .status(500)
        .send({ message: "An error occurred while searching for this task" });
    } else {
      res.status(200).send({ data: data });
    }
  });
};

// get all tasks.
const readAllTasks = function (req=null, res) {

  let queryobj = {"isArchived":false}; 
  
  if(req.query.status) queryobj = {...queryobj, "status": req.query.status}; 

  TaskModel.find(queryobj).sort({status: 1, createdOn: -1}).exec(  
  function (err, data) {
    if (err) {
      res
        .status(500)
        .send({ message: "An error occurred while fetching tasks" });
    } else {
      res.status(200).send({ data: data });
    }
  });
};

const updateTask = function (req, res) {
  TaskModel.findByIdAndUpdate(
    req.params.id, { ...req.body }, {new: true}, //NOTE: need to tell Mongo to send back modified doc else it will send original
    function (err, data) {
      if (err){
        res
        .status(500)
        .send({ message: "Could not update task" });
      }
      else{
        res.status(200).send({ data: data });
      }
  });
};

const updateManyTasks = function (req, res) {
  //Array of ids to be changed = req.body.ids;
  //data to change = req.body.data;

  TaskModel.updateMany(
    {
      _id: { $in: req.body._ids },
    },
    { $set: {"status": req.body.status} },
    function (err, data) {
      if (err) {
        res
          .status(500)
          .send({ message: "An error occurred while updating tasks" });
      } else {

        
        res.status(200).send({ data: data });
      }
    }
  );
};

const deleteTask = function (req, res) {
  TaskModel.updateOne({ _id: req.params.id },
    { $set: {"isArchived": true} },
    function (err, data) {
      if (err) {
        res
          .status(500)
          .send({ message: "Did not archive task" });
      } else {
        res.status(200).send({ archived: data.modifiedCount });
      }
    }  
  );
};

module.exports = {
  postTask,
  readTask,
  readAllTasks,
  updateTask,
  updateManyTasks,
  deleteTask,
};
