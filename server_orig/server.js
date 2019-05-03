const express = require("express");
const Todo = require("./todo.model");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.unsubscribe(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://z:z@cluster0-bltnv.mongodb.net/test?retryWrites=true",
  { useNewUrlParser: true }
);

// Test MongoDB connection
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.get("/", (req, res) => {
    res.status(200).send("Connected to server.");
});

// Get all Todos
app.get("/todos", (req, res) => {
    Todo.find((err, todos) => {
        if (err)
            res.status(400).send("Error: Could not fetch todos.");
        else
            res.status(200).json(todos);
    });
});

// Get one todo by id
app.get("/todos/:id", (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
      if (err)
        res.status(400).send("Error: Could not fetch todo.");
      else
        res.status(200).json(todo);
    });
});

// add new todo
app.post("/todos", (req, res) => {
    let { task, completed } = req.body;
    let todo = {
      task: task ? task : "New Task",
      completed: completed && typeof completed == "boolean" ?
                completed : false
    }
    Todo.create(todo, (todo, err) => {
        if (err)
            res.status(400).send(err);
        else
            res.status(200).json(todo);
    });
});

// update one todo by id
app.put("/todos/:id", (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (!todo)
            res.status(404).send("Error: Could not find todo");
        else {
            let { task, completed } = req.body;
            todo.task = task || todo.task;
            todo.completed = completed || todo.completed;
            todo.save()
                .then(todo => res.status(200).json("Todo updated"))
                .catch(err => res.status(400).send("Error: Update not possible"));
        }
    });
});

// delete all todos
app.delete("/todos", (req, res) => {
  Todo.deleteMany({}, (err, todos) => {
    if (err)
      res.status(400).send("Error: Wasn't able to clear all todos");
    else
      res.status(200).json(todos);
  });
});

// delete one todo by id
app.delete("/todos/:id", (req, res) => {
    const { id } = req.params;
    Todo.deleteOne({ _id: id }, err => {
        if (err)
            return res.status(404).send("Todo not found");
        else
            return res.status(200).send("Todo deleted");
    });
});

// Run server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
