const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    deadline : {
        type : String,
        required : false
    },
    isCompleted : {
        type : Boolean,
        default : false
    },
    creationDate : {
        type : Date,
        default: Date.now
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId, ref : 'User'
    }
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;