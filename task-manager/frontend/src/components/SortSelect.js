export default function SortSelect({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="date_desc">Newest</option>
      <option value="date_asc">Oldest</option>
      <option value="prio">Priority</option>
      <option value="title">Title</option>
    </select>
  );
}
