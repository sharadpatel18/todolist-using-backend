const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const Todolist = require('./model/todolist')
const app = express();


mongoose.connect("mongodb://127.0.0.1/todolist")
.then(()=>{
    console.log("database is connected to the server");
})
.catch((err)=>{
    console.log("error: ",err);
})



require('dotenv').config(); 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/todolist' , async (req,res)=> {
    const list = await Todolist.create(req.body);
    res.send(req.body)
    console.log(req.body);
})


app.get('/todolist/api', async (req, res) => {
    const List = await Todolist.find({})
    res.send(List)
})

app.put('/todolist/:id' , async (req,res)=>{
    const {id} = req.params; 
    const task = req.body; 
    const list = await Todolist.findByIdAndUpdate(id , task)
    .then(()=>{
        res.send('value is updated')
    })
    .catch((err)=>{
        console.log(err);
        res.send({error:err , message:"error this is not updated"})
    })
    
})

app.delete('/todolist/:id', async (req,res)=>{
    const {id} = req.params;
    const list = await Todolist.findByIdAndDelete(id)
    .then(()=>{
        res.send("value is deleted")
    })
    .catch((err)=>{
        console.log(err);
        res.send({error:err , message:"error this is not deleted"})
    })
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})