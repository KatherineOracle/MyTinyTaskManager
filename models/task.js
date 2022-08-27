// The Task model

const mongoose = require('mongoose')
   ,Schema = mongoose.Schema;

const taskSchema = new Schema({
    createdOn: {type: Date, default: Date.now},
    updatedOn: {type: Date},
    description: {type: String},
    location: {type: String},
    priority: {type: Number},
    status: {type: Number, default: 0},
    isArchived: {type: Boolean, default: false}
}, { collection: "Tasks" });

module.exports = mongoose.model('Task', taskSchema);

/*
STATUSES
0:Submitted
1:In progress
2:Complete

PRIORITIES
3:Low
2:Medium
1:High

*/