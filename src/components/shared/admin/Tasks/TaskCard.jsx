import { useState, useRef, useEffect, useCallback, memo } from 'react'
import { createPortal } from 'react-dom'

const AV_COLORS = [
  { bg: 'bg-tt-av1-bg', text: 'text-tt-av1-text' },
  { bg: 'bg-tt-av2-bg', text: 'text-tt-av2-text' },
  { bg: 'bg-tt-av3-bg', text: 'text-tt-av3-text' },
  { bg: 'bg-tt-av4-bg', text: 'text-tt-av4-text' },
  { bg: 'bg-tt-av5-bg', text: 'text-tt-av5-text' },
]

function getAvatarClass(index) {
  if (index < 0) return 'bg-tt-primary-light text-tt-primary'
  const av = AV_COLORS[index % AV_COLORS.length]
  return `${av.bg} ${av.text}`
}

// ── Portalled assign dropdown ─────────────────────────────────────────────
function AssignDropdown({ pos, employeeUsers, onSelect, onClose }) {
  const [query,  setQuery]  = useState('')
  const ref                 = useRef(null)
  const inputRef            = useRef(null)

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 0) }, [])

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handler, true)
    return () => document.removeEventListener('mousedown', handler, true)
  }, [onClose])

  const filtered = employeeUsers.filter(u =>
    u.email.toLowerCase().includes(query.toLowerCase())
  )

  return createPortal(
    <div
      ref={ref}
      style={{ position: 'absolute', top: pos.top, right: pos.right, zIndex: 9999, width: 200, boxShadow: 'var(--tt-shadow-md)' }}
      className='rounded-xl py-1 bg-tt-bg-card border border-tt-border'
    >
      <div className='px-2 pt-1 pb-1.5 border-b border-tt-border'>
        <div className='relative'>
          <svg className='absolute left-2 top-1/2 -translate-y-1/2 text-tt-text-muted' width="10" height="10" viewBox="0 0 16 16" fill="none">
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            type='text'
            placeholder='Search…'
            value={query}
            onChange={e => setQuery(e.target.value)}
            className='w-full text-xs pl-6 pr-2 py-1 rounded-lg outline-none bg-tt-bg-muted border border-tt-border text-tt-text'
          />
        </div>
      </div>

      <div className='max-h-[180px] overflow-y-auto h-30'>
        {employeeUsers.length === 0 ? (
          <p className='text-xs px-3 py-2 text-center text-tt-text-hint'>No employees found</p>
        ) : filtered.length === 0 ? (
          <p className='text-xs px-3 py-2 text-center text-tt-text-hint'>No match</p>
        ) : (
          filtered.map((user, i) => {
            const av = AV_COLORS[i % AV_COLORS.length]
            return (
              <div
                key={user.uid}
                onMouseDown={(e) => { e.stopPropagation(); onSelect(user.uid) }}
                className='px-3 py-1.5 text-xs cursor-pointer flex items-center gap-2 hover:opacity-80 text-tt-text'
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center font-medium flex-shrink-0 ${av.bg} ${av.text}`}>
                  {user.email[0].toUpperCase()}
                </div>
                <span className='truncate'>{user.email.split('@')[0]}</span>
              </div>
            )
          })
        )}
      </div>
    </div>,
    document.body
  )
}



// ── TaskCard ──────────────────────────────────────────────────────────────
const TaskCard = memo(function TaskCard({ task, users, onSelectUser, onAssign }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [dropdownPos,  setDropdownPos]  = useState({ top: 0, right: 0 })
  const avatarRef = useRef(null)

  const handleAvatarClick = useCallback(() => {
    if (!showDropdown && avatarRef.current) {
      const rect = avatarRef.current.getBoundingClientRect()
      setDropdownPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right })
    }
    setShowDropdown(prev => !prev)
  }, [showDropdown])

  const handleSelect = useCallback((userId) => {
    onSelectUser(task.id, userId)
    onAssign(task.id, userId)
    setShowDropdown(false)
  }, [task.id, onSelectUser, onAssign])

  const handleClose = useCallback(() => setShowDropdown(false), [])

  const assignedIndex  = users.findIndex(u => u.email === task.assignedEmail)
  const employeeUsers  = users.filter(u => u.role === 'employee')

  return (
    <div
      style={{ boxShadow: 'var(--tt-shadow-sm)' }}
      className='bg-tt-bg-card border border-tt-border rounded-lg p-2.5 mb-1.5 hover:opacity-90 transition-opacity overflow-visible cursor-default'
    >
      {/* Title + description */}
      <div className='mb-1.5'>
        <h3 className='text-xs font-semibold truncate text-tt-text'>
          {task.title}
        </h3>
        {task.description && (
          <p className='text-xs mt-0.5 line-clamp-2 text-tt-text-muted'>
            {task.description}
          </p>
        )}
      </div>

      {/* Footer: assignee name + avatar */}
      <div className='relative'>
        <div className='flex items-center justify-between pt-1.5 border-t border-tt-border'>
          <p className='text-xs truncate flex-1 text-tt-text-hint'>
            {task.assignedEmail ? task.assignedEmail.split('@')[0] : 'Unassigned'}
          </p>
          <div
            ref={avatarRef}
            onClick={handleAvatarClick}
            className={`w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center cursor-pointer flex-shrink-0 hover:opacity-80 transition-opacity ${getAvatarClass(assignedIndex)}`}
          >
            {task.assignedEmail ? task.assignedEmail[0].toUpperCase() : '+'}
          </div>
        </div>

        {showDropdown && (
          <AssignDropdown
            pos={dropdownPos}
            employeeUsers={employeeUsers}
            onSelect={handleSelect}
            onClose={handleClose}
          />
        )}
        </div>
    </div>
  )
})

export default TaskCard