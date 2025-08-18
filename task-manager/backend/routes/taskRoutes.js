const express = require('express');
const cors = require("cors");
const router = express.Router();

let tasks = [];
let id = 1;

// Get all tasks
router.get('/', (req, res) => res.json(tasks));

// Create a new task
router.post('/', (req, res) => {
  const title = (req.body.title || "").trim();
  if (!title) return res.status(400).json({ error: "title required" });
  const allowed = new Set(["low", "medium", "high"]);
  const priority = (req.body.priority || "low").toLowerCase();
  if (!allowed.has(priority)) return res.status(400).json({ error: "invalid priority" });

  const t = {
    id: id++,
    title,
    description: req.body.description || "",
    completed: false,
    createdAt: new Date(),
    priority: priority
  };
  tasks.push(t);
  res.status(201).json(t);
});

// Update a task
router.put('/:id', (req, res) => {
  const t = tasks.find(x => x.id == req.params.id);
  if (!t) return res.status(404).end();
  Object.assign(t, req.body);
  res.json(t);
});

// Delete a task
router.delete('/:id', (req, res) => {
  const before = tasks.length;
  tasks = tasks.filter(x => x.id != req.params.id);
  if (tasks.length === before) return res.status(404).end();
  res.status(204).end();
});

// Toggle task completion status
router.patch('/:id/toggle', (req, res) => {
  const t = tasks.find(x => x.id == req.params.id);
  if (!t) return res.status(404).end();
  t.completed = !t.completed;
  res.json(t);
});

module.exports = router;
