import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar.jsx'
import EmptyState from './components/EmptyState.jsx'
import CreateGroupModal from './components/CreateGroupModal.jsx'
import NotesPanel from './components/NotesPanel.jsx'

const LS_KEY = 'pocket-notes-v1'
const genId = () => crypto.randomUUID()

const initialsFromName = (name = '') => {
  const parts = String(name).trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

export default function App() {
  const [groups, setGroups] = useState([])
  const [messages, setMessages] = useState({})
  const [selectedId, setSelectedId] = useState(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) {
        const data = JSON.parse(raw)
        setGroups(data.groups || [])
        setMessages(data.messages || {})
        setSelectedId(data.selectedId || null)
      }
    } catch { }
  }, [])

  useEffect(() => {
    const payload = { groups, messages, selectedId }
    localStorage.setItem(LS_KEY, JSON.stringify(payload))
  }, [groups, messages, selectedId])

  const selectedGroup = useMemo(
    () => groups.find(g => g.id === selectedId) || null,
    [groups, selectedId]
  )
  const selectedMessages = messages[selectedId] || []

  const handleCreateGroup = ({ name, color }) => {
    const id = genId()
    const group = {
      id,
      name: name.trim(),
      color,
      initials: initialsFromName(name),
      createdAt: Date.now(),
    }
    setGroups(prev => [group, ...prev])
    setMessages(prev => ({ ...prev, [id]: [] }))
    setSelectedId(id)
  }

  const handleSend = (text) => {
    if (!selectedId) return
    const entry = { id: genId(), text: text.trim(), ts: Date.now() }
    setMessages(prev => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), entry],
    }))
  }

  return (
    <>
      {/* data-has-detail enables CSS to switch panes on mobile */}
      <div className="app-shell" data-has-detail={!!selectedGroup}>
        <Sidebar
          groups={groups}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onCreateNewGroup={() => setIsCreateOpen(true)}
        />

        {selectedGroup ? (
          <NotesPanel
            group={selectedGroup}
            messages={selectedMessages}
            onSend={handleSend}
            onBack={() => setSelectedId(null)}
          />
        ) : (
          // show EmptyState only on wider screens
          <div className="empty-wrap">
            <EmptyState />
          </div>
        )}
      </div>

      <CreateGroupModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={(payload) => {
          handleCreateGroup(payload)
          setIsCreateOpen(false)
        }}
      />
    </>
  )
}
