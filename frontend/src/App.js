import './App.css';

import React, { useEffect, useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => { load(); }, []);
  const load = () => fetch("/api/tasks").then(r => r.json()).then(setTasks);

  const add = async e => {
    e.preventDefault();
    if (!title.trim()) return;
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    setTitle("");
    load();
  };

  const toggle = async t => {
    await fetch(`/api/tasks/${t.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !t.done })
    });
    load();
  };

  const remove = async id => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h1>Tasks</h1>
      <form onSubmit={add}>
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <button>Add</button>
      </form>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <label>
              <input type="checkbox" checked={t.done} onChange={() => toggle(t)} />
              {t.title}
            </label>
            <button onClick={() => remove(t.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
