import { useState, useCallback, memo } from 'react'
import { getToken } from '@/utils/getToken'

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:5000'

const STATUS_CLS = {
  done:        'bg-emerald-50 text-emerald-600',
  in_progress: 'bg-bg-light-blue text-text-blue',
  backlog:     'bg-gray-100 text-text-gray',
}

const STATUS_LABEL = {
  in_progress: 'Active',
  done:        'Done',
  backlog:     'Todo',
}

const NEXT_ACTIONS = {
  backlog:     [{ label: '→ Start',    next: 'in_progress', colorCls: 'text-text-blue'  }],
  in_progress: [{ label: '✓ Complete', next: 'done',        colorCls: 'text-success'    }],
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
        method:  'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body:    JSON.stringify({ status: nextStatus }),
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
      onDragStart={e => { e.dataTransfer.setData('taskId', task.id); setDragging(true) }}
      onDragEnd={() => setDragging(false)}
      className={`bg-bg-primary border border-border-primary rounded-lg p-2.5 mb-1.5 hover:shadow-sm transition-all duration-150 cursor-grab active:cursor-grabbing ${dragging ? 'opacity-50 scale-[0.98]' : 'opacity-100 scale-100'}`}
    >
      {/* Title + status badge */}
      <div className='flex justify-between items-start gap-2 mb-1.5'>
        <div className='flex-1 min-w-0'>
          <h3 className='text-xs font-medium truncate text-text-primary'>
            {task.title}
          </h3>
          {task.description && (
            <p className='text-xs mt-0.5 truncate text-text-gray'>
              {task.description}
            </p>
          )}
        </div>
        <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold flex-shrink-0 ${STATUS_CLS[task.status] ?? STATUS_CLS.backlog}`}>
          {STATUS_LABEL[task.status] ?? 'Todo'}
        </span>
      </div>

      {/* Footer */}
      <div className='flex items-center justify-between pt-1.5 border-t border-border-primary gap-2'>
        <p className='text-xs truncate flex-1 text-text-gray'>
          Assigned to me
        </p>

        <div className='flex items-center gap-1 flex-shrink-0'>
          {task.status === 'done' && (
            <span className='text-xs flex items-center gap-1 text-success'>
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
              className={`text-[10px] px-2 py-1 rounded-md font-semibold bg-bg-page border border-border-primary hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity ${action.colorCls}`}
            >
              {updating ? (
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none" className='animate-spin block'>
                  <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="20 14"/>
                </svg>
              ) : action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
})

export default EmployeeTaskCard