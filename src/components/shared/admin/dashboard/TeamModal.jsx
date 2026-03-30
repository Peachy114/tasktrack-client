import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const AV_COLORS = [
  { bg: 'bg-tt-av1-bg', text: 'text-tt-av1-text' },
  { bg: 'bg-tt-av2-bg', text: 'text-tt-av2-text' },
  { bg: 'bg-tt-av3-bg', text: 'text-tt-av3-text' },
  { bg: 'bg-tt-av4-bg', text: 'text-tt-av4-text' },
  { bg: 'bg-tt-av5-bg', text: 'text-tt-av5-text' },
]

const STATUS_BADGE = {
  done:        { label: 'Completed',   cls: 'bg-tt-done-bg text-tt-done-text'         },
  in_progress: { label: 'In Progress', cls: 'bg-tt-progress-bg text-tt-progress-text' },
  backlog:     { label: 'Pending',     cls: 'bg-tt-backlog-bg text-tt-backlog-text'    },
}

const STATUS_LEFT = {
  done:        '#7C3AED',
  in_progress: '#4F46E5',
  backlog:     '#94A3B8',
}

export default function TeamModal({ users, tasks, onClose }) {
  const [search,      setSearch]      = useState('')
  const [expandedUid, setExpandedUid] = useState(null)
  const backdropRef = useRef(null)

  // close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const filtered = users.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  return createPortal(
    <div
      ref={backdropRef}
      className='fixed inset-0 z-50 flex items-center justify-center'
      style={{ background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(4px)' }}
      onMouseDown={(e) => { if (e.target === backdropRef.current) onClose() }}
    >
      <div
        className='relative w-full max-w-lg max-h-[80vh] flex flex-col rounded-3xl overflow-hidden'
        style={{ background: 'white', boxShadow: '0 24px 64px rgba(15,23,42,0.22)' }}
      >
        {/* Header */}
        <div className='flex items-center justify-between px-6 pt-5 pb-4 border-b border-tt-border flex-shrink-0'>
          <div>
            <h2 className='text-sm font-bold text-tt-text'>Team Members</h2>
            <p className='text-xs text-tt-text-muted mt-0.5'>{users.length} member{users.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={onClose}
            className='w-8 h-8 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity bg-tt-bg-muted text-tt-text-muted border-none text-sm'
          >✕</button>
        </div>

        {/* Search */}
        <div className='px-6 py-3 border-b border-tt-border flex-shrink-0'>
          <div className='relative'>
            <svg className='absolute left-3 top-1/2 -translate-y-1/2 text-tt-text-hint' width="12" height="12" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type='text'
              placeholder='Search members…'
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoFocus
              className='w-full text-xs pl-8 pr-3 py-2 rounded-xl outline-none border border-tt-border bg-tt-bg text-tt-text focus:border-tt-primary'
            />
          </div>
        </div>

        {/* Member list */}
        <div className='overflow-y-auto flex-1 px-4 py-3 flex flex-col gap-2'>
          {filtered.length === 0 && (
            <p className='text-xs text-center py-10 text-tt-text-hint'>No members found</p>
          )}

          {filtered.map((user, i) => {
            const av          = AV_COLORS[i % AV_COLORS.length]
            const userTasks   = tasks.filter(t => t.assignedEmail === user.email)
            const doneTasks   = userTasks.filter(t => t.status === 'done').length
            const activeTasks = userTasks.filter(t => t.status === 'in_progress').length
            const pct         = userTasks.length > 0 ? Math.round((doneTasks / userTasks.length) * 100) : 0
            const isOpen      = expandedUid === user.uid

            return (
              <div
                key={user.uid}
                className='rounded-2xl overflow-hidden border border-tt-border transition-all duration-200'
                style={{ background: isOpen ? '#F8FAFC' : 'white' }}
              >
                {/* Member row — clickable */}
                <button
                  onClick={() => setExpandedUid(isOpen ? null : user.uid)}
                  className='w-full flex items-center gap-3 px-4 py-3 hover:opacity-80 transition-opacity bg-transparent border-none text-left'
                >
                  {/* Avatar */}
                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${av.bg} ${av.text}`}>
                    {user.email[0].toUpperCase()}
                  </div>

                  {/* Info */}
                  <div className='flex-1 min-w-0'>
                    <p className='text-xs font-semibold text-tt-text truncate'>{user.email.split('@')[0]}</p>
                    <p className='text-xs text-tt-text-hint mt-0.5 truncate'>{user.email}</p>
                  </div>

                  {/* Stats pills */}
                  <div className='flex items-center gap-1.5 flex-shrink-0'>
                    <span className='text-xs px-2 py-0.5 rounded-full font-medium bg-tt-progress-bg text-tt-progress-text'>
                      {activeTasks} active
                    </span>
                    <span className='text-xs px-2 py-0.5 rounded-full font-medium bg-tt-done-bg text-tt-done-text'>
                      {doneTasks} done
                    </span>
                  </div>

                  {/* Chevron */}
                  <svg
                    width="14" height="14" viewBox="0 0 16 16" fill="none"
                    className='flex-shrink-0 text-tt-text-hint transition-transform duration-200'
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* Expanded task list */}
                {isOpen && (
                  <div className='px-4 pb-3 flex flex-col gap-1.5 border-t border-tt-border'>

                    {/* Progress bar */}
                    <div className='flex items-center gap-2 py-2.5'>
                      <div className='flex-1 h-1.5 rounded-full overflow-hidden bg-tt-bg-muted'>
                        <div
                          className='h-full rounded-full bg-tt-primary transition-all duration-500'
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className='text-xs font-semibold text-tt-primary flex-shrink-0'>{pct}% done</span>
                    </div>

                    {userTasks.length === 0 ? (
                      <p className='text-xs text-center py-3 text-tt-text-hint'>No tasks assigned</p>
                    ) : (
                      userTasks.map(task => {
                        const badge = STATUS_BADGE[task.status] ?? STATUS_BADGE.backlog
                        return (
                          <div
                            key={task.id}
                            className='flex items-center gap-2.5 px-3 py-2 rounded-xl'
                            style={{
                              background: 'white',
                              borderLeft: `3px solid ${STATUS_LEFT[task.status] ?? STATUS_LEFT.backlog}`,
                              boxShadow: '0 1px 4px rgba(15,23,42,0.06)',
                            }}
                          >
                            <div className='flex-1 min-w-0'>
                              <p className='text-xs font-semibold text-tt-text truncate'>{task.title}</p>
                              {task.description && (
                                <p className='text-xs text-tt-text-hint mt-0.5 truncate'>{task.description}</p>
                              )}
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-medium ${badge.cls}`}>
                              {badge.label}
                            </span>
                          </div>
                        )
                      })
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className='px-6 py-3 border-t border-tt-border flex-shrink-0 flex items-center justify-between'>
          <p className='text-xs text-tt-text-hint'>
            {tasks.filter(t => !t.assignedEmail).length} unassigned task{tasks.filter(t => !t.assignedEmail).length !== 1 ? 's' : ''}
          </p>
          <button
            onClick={onClose}
            className='text-xs px-4 py-2 rounded-xl font-semibold bg-tt-primary text-white border-none hover:opacity-90 transition-opacity'
          >
            Done
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}