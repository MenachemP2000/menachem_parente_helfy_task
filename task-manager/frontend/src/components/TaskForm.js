import React, { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("low");

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), description: desc.trim(), priority });
    setTitle("");
    setDesc("");
    setPriority("low");
  };

  return (
    <form className="card form" onSubmit={submit}>
      <input
        placeholder="Task title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>low</option>
        <option>medium</option>
        <option>high</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}
