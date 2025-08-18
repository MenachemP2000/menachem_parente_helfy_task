import TaskFilter from "./TaskFilter";
import SearchBar from "./SearchBar";
import SortSelect from "./SortSelect";
import ThemeToggle from "./ThemeToggle";

export default function Toolbar({
  filter, onFilterChange,
  query, onQueryChange,
  sort, onSortChange,
  theme, onToggleTheme,
}) {
  return (
    <div className="toolbar">
      <TaskFilter value={filter} onChange={onFilterChange} />
      <SearchBar value={query} onChange={onQueryChange} />
      <SortSelect value={sort} onChange={onSortChange} />
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </div>
  );
}
