import { useState, useRef, useEffect } from 'react'

const AV_COLORS = [
  { bg: 'var(--tt-av1-bg)', text: 'var(--tt-av1-text)' },
  { bg: 'var(--tt-av2-bg)', text: 'var(--tt-av2-text)' },
  { bg: 'var(--tt-av3-bg)', text: 'var(--tt-av3-text)' },
  { bg: 'var(--tt-av4-bg)', text: 'var(--tt-av4-text)' },
  { bg: 'var(--tt-av5-bg)', text: 'var(--tt-av5-text)' },
]

export default function TaskCard({ task, users, selectedUser, onSelectUser, onAssign }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });
  const avatarRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        avatarRef.current && !avatarRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  const handleAvatarClick = () => {
    if (!showDropdown) {
      const rect = avatarRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 4,
        right: window.innerWidth - rect.right,
      });
    }
    setShowDropdown(!showDropdown);
  }
  const handleSelectUser = (userId) => {
    onSelectUser(task.id, userId);
    onAssign(task.id, userId);
    setShowDropdown(false);
  }
  const assignedIndex = users.findIndex(u => u.email === task.assignedEmail);
  const statusStyle = {
    done: { background: 'var(--tt-done-bg)', color: 'var(--tt-done-text)' },
    in_progress: { background: 'var(--tt-progress-bg)', color: 'var(--tt-progress-text)' },
    backlog: { background: 'var(--tt-backlog-bg)', color: 'var(--tt-backlog-text)' },
  }

  return (
    <div
      style={{
        background: 'var(--tt-bg-card)',
        border: '0.5px solid var(--tt-border)',
        cursor: 'grab',
      }}
      className='rounded-lg p-2.5 mb-1.5 hover:opacity-90 transition-opacity overflow-visible'>

      <div className='flex justify-between items-start gap-2 mb-1.5'>
        <div className='flex-1 min-w-0'>
          <h3 style={{ color: 'var(--tt-text)' }} className='text-xs font-medium truncate'>
            {task.title}
          </h3>
          <p style={{ color: 'var(--tt-text-muted)' }} className='text-xs mt-0.5 truncate'>
            {task.description}
          </p>
        </div>
        <span style={statusStyle[task.status] || statusStyle.backlog}
          className='text-xs px-1.5 py-0.5 rounded-md font-medium flex-shrink-0'>
          {task.status === 'in_progress' ? 'Active' :
           task.status === 'done' ? 'Done' : 'Todo'}
        </span>
      </div>

      <div style={{ borderTop: '0.5px solid var(--tt-border)' }}
        className='flex items-center justify-between pt-1.5'>
        <p style={{ color: 'var(--tt-text-hint)' }} className='text-xs truncate flex-1'>
          {task.assignedEmail ? task.assignedEmail.split('@')[0] : 'Unassigned'}
        </p>

        {/* Avatar trigger */}
        <div
          ref={avatarRef}
          onClick={handleAvatarClick}
          style={assignedIndex >= 0 ? {
            background: AV_COLORS[assignedIndex % AV_COLORS.length].bg,
            color: AV_COLORS[assignedIndex % AV_COLORS.length].text,
          } : {
            background: 'var(--tt-primary-light)',
            color: 'var(--tt-primary)',
          }}
          className='w-6 h-6 rounded-full text-xs font-medium flex items-center justify-center cursor-pointer flex-shrink-0'>
          {task.assignedEmail ? task.assignedEmail[0].toUpperCase() : '+'}
        </div>
      </div>

      {/* Dropdown rendered via fixed positioning — escapes all overflow/z-index traps */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          style={{
            background: 'var(--tt-bg-card)',
            border: '0.5px solid var(--tt-border)',
            position: 'fixed',
            top: dropdownPos.top,
            right: dropdownPos.right,
            zIndex: 9999,
          }}
          className='rounded-lg w-44 py-1 shadow-sm'>
          <p style={{ color: 'var(--tt-text-muted)', borderBottom: '0.5px solid var(--tt-border)' }}
            className='text-xs px-3 py-1.5'>Assign to</p>

          {users.filter(user => user.role === 'employee').length === 0 && (
            <p style={{ color: 'var(--tt-text-hint)' }} className='text-xs px-3 py-2'>
              No employees found
            </p>
          )}

          {users
            .filter(user => user.role === 'employee')
            .map((user, i) => (
              <div key={user.uid} onClick={() => handleSelectUser(user.uid)}
                className='px-3 py-1.5 text-xs cursor-pointer flex items-center gap-2 transition-colors hover:opacity-80'
                style={{ color: 'var(--tt-text)' }}
              >
                <div style={{
                  background: AV_COLORS[i % AV_COLORS.length].bg,
                  color: AV_COLORS[i % AV_COLORS.length].text,
                }}
                  className='w-5 h-5 rounded-full flex items-center justify-center font-medium text-xs flex-shrink-0'>
                  {user.email[0].toUpperCase()}
                </div>
                <span className='truncate'>{user.email.split('@')[0]}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}