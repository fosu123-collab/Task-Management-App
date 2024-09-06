require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.set('strictQuery', true)
mongoose.connect("MONGO_URI=mongodb+srv://admin-Jones:Malachi456.@atlascluster.gps7jki.mongodb.net/ecommerceDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a task schema
const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

// Create a task model
const Task = mongoose.model('Task', taskSchema);

// API endpoints
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/tasks', async (req, res) => {
  const { title } = req.body;

  try {
    const newTask = new Task({
      title: title,
      completed: false,
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build", "index.html"));
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
