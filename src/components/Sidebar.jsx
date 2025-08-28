import './Sidebar.css'

export default function Sidebar({ groups = [], selectedId, onSelect, onCreateNewGroup }) {
  return (
    <aside className="sidebar">
      <div className="brand">Pocket Notes</div>

      <div className="group-list" role="listbox" aria-label="Groups">
        {groups.length === 0 && (
          <div style={{ color: '#6b7280', fontSize: 14, padding: '8px 6px' }}>
            Create your first group…
          </div>
        )}

        {groups.map(g => (
          <div
            key={g.id}
            role="option"
            aria-selected={g.id === selectedId}
            className={`group-item ${g.id === selectedId ? 'is-active' : ''}`}
            onClick={() => onSelect?.(g.id)}
            title={g.name}
          >
            <div className="group-avatar" style={{ background: g.color }}>
              {g.initials}
            </div>
            <div className="group-name">{g.name}</div>
          </div>
        ))}
      </div>

      <button
        className="fab"
        aria-label="Create new note group"
        onClick={onCreateNewGroup}
      >
        +
      </button>
    </aside>
  )
}
