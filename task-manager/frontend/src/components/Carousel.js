export default function Carousel({ items, index, renderItem, onPrev, onNext }) {
  const view = [items[(index - 1 + items.length) % items.length], items[index], items[(index + 1) % items.length]];
  return (
    <div className="carousel">
      <button className="nav" onClick={onPrev} aria-label="Previous">
        ‹
      </button>
      <div className="track">
        {view.map((it, i) => (
          <div key={it ? `${it.id}-${i}` : `empty-${i}`} className="slide">
            {it ? renderItem(it) : <div className="muted">No task</div>}
          </div>
        ))}
      </div>

      <button className="nav" onClick={onNext} aria-label="Next">
        ›
      </button>
    </div>
  );
}