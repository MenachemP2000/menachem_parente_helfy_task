export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button type="button" onClick={onToggle}>
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
}
