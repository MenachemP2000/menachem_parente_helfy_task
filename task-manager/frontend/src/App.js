import { useEffect, useMemo, useRef, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import Carousel from "./components/Carousel";
import EmptyState from "./components/EmptyState";
import Toolbar from "./components/Toolbar";
import "./styles/App.css";

const API = "/api/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("date_desc");
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);

  // theme hook
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // fetch hook
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(API);
        setTasks(await res.json());
      } catch { setErr("Failed to load tasks"); }
      finally { setLoading(false); }
    })();
  }, []);

  const stopAuto = () => { if (timerRef.current) clearInterval(timerRef.current); };

  const byFilter = (t) =>
    filter === "completed" ? t.completed :
      filter === "pending" ? !t.completed : true;

  const byQuery = (t) => t.title.toLowerCase().includes(query.toLowerCase());

  const filtered = useMemo(() => tasks.filter((t) => byFilter(t) && byQuery(t)), [tasks, filter, query]);


  // sort tasks
  const sorted = useMemo(() => {
    const arr = [...filtered];
    const rank = { high: 0, medium: 1, low: 2 };
    arr.sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      if (sort === "prio") return rank[a.priority] - rank[b.priority];
      const da = +new Date(a.createdAt), db = +new Date(b.createdAt);
      return sort === "date_asc" ? da - db : db - da;
    });
    return arr;
  }, [filtered, sort]);

  // carousel infinte scrolling
  useEffect(() => {
    stopAuto();
    if (!sorted.length) return;
    timerRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % sorted.length);
    }, 2500);
    return stopAuto;
  }, [sorted]);

  const addTask = async (payload) => {
    setErr("");
    try {
      const res = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw 0;
      const t = await res.json();
      setTasks((p) => [...p, t]);
    } catch { setErr("Could not add task"); }
  };

  const updateTask = async (id, patch) => {
    setErr("");
    try {
      const res = await fetch(`${API}/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
      if (!res.ok) throw 0;
      const u = await res.json();
      setTasks((p) => p.map((t) => t.id === id ? u : t));
    } catch { setErr("Could not update task"); }
  };

  const toggleTask = async (id) => {
    setErr("");
    try {
      const res = await fetch(`${API}/${id}/toggle`, { method: "PATCH" });
      if (!res.ok) throw 0;
      const u = await res.json();
      setTasks((p) => p.map((t) => t.id === id ? u : t));
    } catch { setErr("Could not toggle task"); }
  };

  const deleteTask = async (id) => {
    setErr("");
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (res.status !== 204) throw 0;
      setTasks((p) => p.filter((t) => t.id !== id));
      setIdx(0);
    } catch { setErr("Could not delete task"); }
  };

  return (
    <div className="app">
      <h1>Task Manager</h1>

      <TaskForm onAdd={addTask} />

      <Toolbar
        filter={filter} onFilterChange={setFilter}
        query={query} onQueryChange={setQuery}
        sort={sort} onSortChange={setSort}
        theme={theme} onToggleTheme={() => setTheme(t => t === "dark" ? "light" : "dark")}
      />

      {err && <p className="error">{err}</p>}
      {loading ? (
        <p className="muted">Loading…</p>
      ) : sorted.length === 0 ? (
        <EmptyState onQuickAdd={() => addTask({ title: "My first task" })} />
      ) : (
        <Carousel
          items={sorted}
          index={idx}
          onPrev={() => { stopAuto(); setIdx((i) => (i - 1 + sorted.length) % sorted.length); }}
          onNext={() => { stopAuto(); setIdx((i) => (i + 1) % sorted.length); }}
          renderItem={(t) => (
            <TaskItem
              key={t.id}
              task={t}
              onToggle={() => toggleTask(t.id)}
              onDelete={() => deleteTask(t.id)}
              onSave={(patch) => updateTask(t.id, patch)}
              onPause={stopAuto}
              onResume={() => {
                stopAuto();
                timerRef.current = setInterval(() => {
                  setIdx((i) => (i + 1) % sorted.length);
                }, 2500);
              }}
            />
          )}
        />
      )}
    </div>
  );
}
