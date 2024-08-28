const mongoose = require('mongoose')

const TodolistSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    note:{
        type:String
    }
})

const TodoList = mongoose.model('Todolist' , TodolistSchema)
module.exports = TodoList;