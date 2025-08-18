const express = require("express");
const app = express();
app.use(express.json());

let tasks = [];
let id = 1;

app.get("/api/tasks", (req, res) => res.json(tasks));

app.post("/api/tasks", (req, res) => {
  const title = (req.body.title || "").trim();
  if (!title) return res.status(400).json({ error: "title required" });
  const t = { id: id++, title, done: false };
  tasks.push(t);
  res.json(t);
});

app.patch("/api/tasks/:id", (req, res) => {
  const t = tasks.find(x => x.id == req.params.id);
  if (!t) return res.status(404).end();
  if (req.body.title) t.title = req.body.title;
  if (typeof req.body.done === "boolean") t.done = req.body.done;
  res.json(t);
});

app.delete("/api/tasks/:id", (req, res) => {
  tasks = tasks.filter(x => x.id != req.params.id);
  res.status(204).end();
});

app.listen(4000, () => console.log("API on http://localhost:4000"));
