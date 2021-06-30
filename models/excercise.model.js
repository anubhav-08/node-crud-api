const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./user.model');

const excerciseSchema = new Schema({
    description : {type:String, required:true},
    duration : {type:Number, required:true},
    date : {type:Date, required: true},
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
},
{
    timestamps:true,
});

const Excercise = mongoose.model('Excercise', excerciseSchema);

module.exports = Excercise;