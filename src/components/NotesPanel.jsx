import './NotesPanel.css'

const fmtParts = (ts) => {
    const d = new Date(ts)
    const date = d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
    const time = d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase()
    return { date, time }
}

export default function NotesPanel({ group, messages = [], onSend, onBack }) {
    const handleSubmit = (e) => {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        const text = String(fd.get('text') || '').trim()
        if (!text) return
        onSend?.(text)
        e.currentTarget.reset()
        const btn = e.currentTarget.querySelector('button[type=submit]')
        if (btn) btn.disabled = true
    }

    return (
        <main className="notes">
            <header className="notes-header">
                {/* Back button shows only on small screens via CSS */}
                <button className="back-btn" type="button" aria-label="Back" onClick={onBack}>
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.27495 10.85C6.47495 10.65 6.57095 10.4083 6.56295 10.125C6.55495 9.84167 6.45061 9.6 6.24995 9.4L3.42495 6.575H14.5749C14.8583 6.575 15.0959 6.479 15.2879 6.287C15.4799 6.095 15.5756 5.85767 15.5749 5.575C15.5749 5.29167 15.4789 5.054 15.2869 4.862C15.0949 4.67 14.8576 4.57433 14.5749 4.575H3.42495L6.27495 1.725C6.47495 1.525 6.57495 1.28733 6.57495 1.012C6.57495 0.736666 6.47495 0.499333 6.27495 0.3C6.07495 0.0999997 5.83728 0 5.56195 0C5.28661 0 5.04928 0.0999997 4.84995 0.3L0.274948 4.875C0.174948 4.975 0.103947 5.08333 0.0619469 5.2C0.0199471 5.31667 -0.000720024 5.44167 -5.34058e-05 5.575C-5.34058e-05 5.70833 0.0209484 5.83333 0.0629482 5.95C0.104948 6.06667 0.175614 6.175 0.274948 6.275L4.87495 10.875C5.05828 11.0583 5.28728 11.15 5.56195 11.15C5.83661 11.15 6.07428 11.05 6.27495 10.85Z" fill="white" />
                    </svg>
                </button>

                <div className="notes-avatar" style={{ background: group.color }}>
                    {group.initials}
                </div>
                <div className="notes-title">{group.name}</div>
            </header>

            <div className="notes-scroll">
                {messages.length === 0 ? (
                    <div style={{ color: '#6b7280' }}>No notes yet. Start typing below…</div>
                ) : (
                    messages.map(m => {
                        const { date, time } = fmtParts(m.ts)
                        return (
                            <div key={m.id} className="note-card">
                                <div>{m.text}</div>
                                <div className="note-time">
                                    <div className="note-time-inner">
                                        <span className="date">{date}</span>
                                        <span className="dot" aria-hidden>•</span>
                                        <strong className="time">{time}</strong>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>

            <form className="composer" onSubmit={handleSubmit}>
                <div className="composer-inner">
                    <div className="composer-input-wrap">
                        <textarea
                            name="text"
                            placeholder="Enter your text here…………"
                            onInput={(e) => {
                                const btn = e.currentTarget.form?.querySelector('button[type=submit]')
                                if (btn) btn.disabled = !e.currentTarget.value.trim()
                            }}
                        />
                        <button className="btn-send" type="submit" disabled aria-label="Send">
                            <svg width="28" height="22" viewBox="0 0 35 29" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M0 29V18.125L14.5 14.5L0 10.875V0L34.4375 14.5L0 29Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
        </main>
    )
}
