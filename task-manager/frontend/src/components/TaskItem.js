import { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onSave, onPause, onResume }) {
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [desc, setDesc] = useState(task.description || "");
    const [priority, setPriority] = useState(task.priority || "low");

    const save = () => {
        onSave({ title: title.trim() || task.title, description: desc.trim(), priority });
        setEdit(false);
        onResume?.();
    };

    return (
        <div className={`card task ${task.completed ? "done" : ""} ${edit ? "editing" : ""}`}>



            {edit ? (
                <>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input value={desc} onChange={(e) => setDesc(e.target.value)} />
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option>low</option>
                        <option>medium</option>
                        <option>high</option>
                    </select>

                </>
            ) : (
                <>
                    <h3>{task.title}</h3>
                    {(task.priority == "low") && <p className="low">{task.priority}</p>}
                    {(task.priority == "medium") && <p className="med">{task.priority}</p>}
                    {(task.priority == "high") && <p className="high">{task.priority}</p>}
                    {(task.description) && <p className="muted">{task.description}</p>}
                    {(!task.description) && <p className="muted">{"no description"}</p>}
                </>
            )}

            <div className="actions">
                {edit ? (
                    <>
                        <button onClick={save}>Save</button>
                        <button onClick={() => { setEdit(false); onResume?.(); }}>Cancel</button>
                    </>
                ) : (
                    <>
                        <button onClick={onToggle}>
                            {task.completed ? "Mark Pending" : "Mark Done"}
                        </button>

                        <button onClick={() => { setEdit(true); onPause?.(); }}>Edit</button>
                        <button className="danger" onClick={onDelete}>Delete</button>
                    </>

                )}

            </div>
        </div>
    );
}
