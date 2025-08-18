export default function EmptyState({ onQuickAdd }) {
  return (
    <div className="empty card">
      <p>No tasks yet.</p>
      <button onClick={onQuickAdd}>Add a sample task</button>
    </div>
  );
}
