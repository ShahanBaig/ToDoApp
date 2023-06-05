const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

// Connect to database
mongoose.connect('mongodb://127.0.0.1:27017/mern-todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error)

// Import database model
const Todo = require('./models/Todo')

// Get all Todos
app.get("/todos", async (req, res) => {
    const todos = await Todo.find()

    res.json(todos)
})

// Post a new Todo
app.post("/todo/new", async (req, res) => {
    const todo = new Todo({
        text: req.body.text
      });

    todo.save()

    res.json(todo)
})

// Delete a Todo
app.delete("/todo/delete/:id", async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id)

    res.json(result)
})

// Mark Todo as complete
app.put("/todo/complete/:id", async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    todo.complete = !todo.complete

    todo.save()

    res.json(todo)
})

// Start server
app.listen(3001, () => console.log("Server started on port 3001"))
