/* eslint-disable no-undef */
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title:{
        type: String,
        unique: true,
        required: true,
    },

    desc:{
        type: String,
    },

    ddate:{
        type:String,
    },

    done:{
        type:Boolean,
    }
})

const TodoModel = mongoose.model("todos", todoSchema)

module.exports = TodoModel