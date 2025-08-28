import './CreateGroupModal.css'
import { useEffect, useRef, useState } from 'react'

const COLORS = [
  '#0A5BFF', // blue
  '#B197FF', // lavender
  '#FF6FE6', // pink
  '#37E6F4', // cyan
  '#F49B7A', // peach
  '#7AA0FF', // light blue
]

export default function CreateGroupModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState('')
  const [color, setColor] = useState(COLORS[0])
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setName('')          // 🔥 reset input on open
      setColor(COLORS[0])  // optional: reset to first color
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])


  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modal-title">Create New group</h2>

        <label className="modal-label" htmlFor="group-name">Group Name</label>
        <input
          id="group-name"
          ref={inputRef}
          className="modal-input"
          placeholder="Enter group name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="modal-row">
          <span className="modal-label" style={{ margin: 0 }}>Choose colour</span>
          <div className="color-list">
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                className={`color-dot ${c === color ? 'is-selected' : ''}`}
                style={{ backgroundColor: c }}
                aria-label={`Choose ${c}`}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </div>

        <div className="modal-actions">
          <button
            className="btn-primary"
            onClick={() => onSubmit?.({ name: name.trim(), color })}
            disabled={!name.trim()}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}
