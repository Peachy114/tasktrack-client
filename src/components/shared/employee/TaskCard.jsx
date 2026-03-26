import { useState, useCallback, memo } from 'react'
import { getToken } from '@/utils/getToken'

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:5000'

const STATUS_STYLE = {
  done:        { background: 'var(--tt-done-bg)',     color: 'var(--tt-done-text)'     },
  in_progress: { background: 'var(--tt-progress-bg)', color: 'var(--tt-progress-text)' },
  backlog:     { background: 'var(--tt-backlog-bg)',  color: 'var(--tt-backlog-text)'  },
}

const STATUS_LABEL = { in_progress: 'Active', done: 'Done', backlog: 'Todo' }

const NEXT_ACTIONS = {
  backlog:     [{ label: '→ Start',    next: 'in_progress', accent: 'var(--tt-progress-text)' }],
  in_progress: [{ label: '✓ Complete', next: 'done',        accent: 'var(--tt-done-text)'     }],
  done:        [],
}

const EmployeeTaskCard = memo(function EmployeeTaskCard({ task, onStatusChange }) {
  const [updating, setUpdating] = useState(false)
  const [dragging, setDragging] = useState(false)

  const handleStatusUpdate = useCallback(async (nextStatus) => {
    try {
      setUpdating(true)
      const token = await getToken()
      const res = await fetch(`${API}/tasks/${task.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: nextStatus }),
      })
      if (!res.ok) throw new Error('Failed to update status')
      onStatusChange?.()
    } catch (err) {
      console.error(err.message)
    } finally {
      setUpdating(false)
    }
  }, [task.id, onStatusChange])

  const actions = NEXT_ACTIONS[task.status] ?? []

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('taskId', task.id)
        setDragging(true)
      }}
      onDragEnd={() => setDragging(false)}
      style={{
        background: 'var(--tt-bg-card)',
        border:     '0.5px solid var(--tt-border)',
        cursor:     'grab',
        opacity:    dragging ? 0.5 : 1,
        transform:  dragging ? 'scale(0.98)' : 'scale(1)',
        transition: 'opacity 0.15s, transform 0.15s',
      }}
      className='rounded-lg p-2.5 mb-1.5 hover:opacity-95'
    >
      {/* Title + status badge */}
      <div className='flex justify-between items-start gap-2 mb-1.5'>
        <div className='flex-1 min-w-0'>
          <h3 style={{ color: 'var(--tt-text)' }} className='text-xs font-medium truncate'>
            {task.title}
          </h3>
          <p style={{ color: 'var(--tt-text-muted)' }} className='text-xs mt-0.5 truncate'>
            {task.description}
          </p>
        </div>
        <span
          style={STATUS_STYLE[task.status] ?? STATUS_STYLE.backlog}
          className='text-xs px-1.5 py-0.5 rounded-md font-medium flex-shrink-0'
        >
          {STATUS_LABEL[task.status] ?? 'Todo'}
        </span>
      </div>

      {/* Footer: assigned label + action buttons */}
      <div
        style={{ borderTop: '0.5px solid var(--tt-border)' }}
        className='flex items-center justify-between pt-1.5 gap-2'
      >
        <p style={{ color: 'var(--tt-text-hint)' }} className='text-xs truncate flex-1'>
          Assigned to me
        </p>

        <div className='flex items-center gap-1 flex-shrink-0'>
          {task.status === 'done' && (
            <span className='text-xs flex items-center gap-1' style={{ color: 'var(--tt-done-text)' }}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M3.5 6l2 2 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Completed
            </span>
          )}

          {actions.map(action => (
            <button
              key={action.next}
              onClick={() => handleStatusUpdate(action.next)}
              disabled={updating}
              className='text-xs px-2 py-1 rounded-md font-medium transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed'
              style={{
                background: 'var(--tt-bg-muted)',
                border:     '0.5px solid var(--tt-border)',
                color:      action.accent,
                cursor:     updating ? 'not-allowed' : 'pointer',
              }}
            >
              {updating ? (
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none"
                  style={{ animation: 'spin 0.8s linear infinite', display: 'block' }}>
                  <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="20 14"/>
                </svg>
              ) : action.label}
            </button>
          ))}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
})

export default EmployeeTaskCard