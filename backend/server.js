const express = require('express');
const cors = require('cors');
const TodoModel = require("./models/Todomodels")
const mongoose = require('mongoose')

// const dbURI= "mongodb+srv://nanasark:realhavenn@cluster0.ecaeoeq.mongodb.net/todoapp?retryWrites=true&w=majority"

mongoose.connect("mongodb://127.0.0.1:27017/todoapp").then(() => {
    console.log('connection sucessful');
  })
  .catch(err => {
    console.error('Connection error', err);
  });

const app = express();

app.use(cors());
app.use(express.json());

app.post("/createTask", (req, res) => {
  TodoModel.create(req.body)
    .then(todos => res.json(todos))
    .catch(err => res.json(err));
})

app.get('/', (req, res) => {
  TodoModel.find({})
  .then(todos => res.json(todos))
  .catch(err => res.json(err));
})

app.patch('/updateTodo/:id', (req, res) => {
  const id = req.params.id;
  TodoModel.findByIdAndUpdate(id, req.body, { new: true })
  .then(todos => res.json(todos))
  .catch(err => res.json(err));
});

app.delete('/deleteTodo/:id',(req,res) =>{
  const id = req.params.id;
  TodoModel.findByIdAndDelete(id, req.body)
  .then(todos => res.json(todos))
  .catch(err => res.json(err));
})


//THE COMMENTED CODE ALLOWS ME TO LOCK THE DONE STATUS AFTER SELECTING IT. A USER CANNOT CHANGE IT BACK TO DONE FALSE

// app.patch('/updateTodo/:id', (req, res) => {
//   const id = req.params.id;
//   let query = {$set: {}};

//   for (let key in req.body) {
//       if (req.body[key]) { // if the field we have in req.body exists, we're going to update it
//           query.$set[key] = req.body[key];
//       }
//   }

//   TodoModel.findByIdAndUpdate(id, query, { new: true })
//       .then(todo => res.json(todo))
//       .catch(err => res.json(err));
// })
// app.patch()

app.listen(3001, () =>{
    console.log("server is running")
})